import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const DEFAULT_DEMO_USERS = {
  "superadmin@zindua.com": {
    name: "Sarah Chen",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  "admin@zindua.com": {
    name: "Alex Rivera",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
  },
  "editor@zindua.com": {
    name: "David Kiprop",
    role: "Editor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  "viewer@zindua.com": {
    name: "Elena Rostova",
    role: "Viewer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize state with Firebase Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional profile and role data from Firestore (/users/{uid})
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userSnap.data()
            });
          } else {
            // Fallback profile if user document doesn't exist yet in Firestore
            const normalizedEmail = (firebaseUser.email || "").toLowerCase();
            const demoMatch = DEFAULT_DEMO_USERS[normalizedEmail];

            const fallbackProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || demoMatch?.name || "User",
              role: demoMatch?.role || "Viewer",
              avatar: firebaseUser.photoURL || demoMatch?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
            };

            setUser(fallbackProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile from Firestore:", err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || "User",
            role: "Viewer"
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email & Password Sign-In
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (err) {
      console.error("Firebase Login Error:", err);
      return { 
        success: false, 
        message: err.message || "Invalid credentials. Please try again." 
      };
    }
  };

  // Google Sign-In Action
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // Check if user already exists in Firestore; if not, initialize profile
      const userDocRef = doc(db, "users", googleUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        const normalizedEmail = (googleUser.email || "").toLowerCase();
        const demoMatch = DEFAULT_DEMO_USERS[normalizedEmail];

        const newUserProfile = {
          name: googleUser.displayName || "User",
          email: googleUser.email,
          role: demoMatch?.role || "Viewer",
          avatar: googleUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${googleUser.email}`,
          createdAt: serverTimestamp()
        };

        await setDoc(userDocRef, newUserProfile);
      }

      return { success: true, user: googleUser };
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      return { 
        success: false, 
        message: err.message || "Google Sign-In failed. Please try again." 
      };
    }
  };

  // Dynamically add new user profile metadata
  const addAdmin = async (newAdmin) => {
    try {
      const normalizedEmail = newAdmin.email.trim().toLowerCase();
      
      const userDocRef = doc(db, "pending_users", normalizedEmail);
      await setDoc(userDocRef, {
        name: newAdmin.name,
        email: normalizedEmail,
        role: newAdmin.role || "Admin",
        avatar: newAdmin.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newAdmin.name}`,
        createdAt: serverTimestamp()
      });

      return { 
        success: true, 
        message: `Successfully registered profile for ${newAdmin.name} (${newAdmin.role})` 
      };
    } catch (err) {
      console.error("Error adding admin:", err);
      return { success: false, message: err.message || "Failed to add user." };
    }
  };

  // Firebase Sign-Out
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const updateUser = (updatedFields) => {
    if (!user) return;
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const hasRole = (roles = []) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isSuperAdmin = user?.role === "Super Admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        logout,
        addAdmin,
        updateUser,
        hasRole,
        isSuperAdmin,
        isAuthenticated: !!user,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};