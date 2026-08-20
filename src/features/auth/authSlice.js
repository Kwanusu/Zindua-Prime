import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/firebase/config";


const DEFAULT_DEMO_USERS = {
  "superadmin@zindua.com": {
    name: "Sarah Chen",
    role: "Super Admin",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },

  "admin@zindua.com": {
    name: "Alex Rivera",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
  },

  "editor@zindua.com": {
    name: "David Kiprop",
    role: "Editor",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },

  "viewer@zindua.com": {
    name: "Elena Rostova",
    role: "Viewer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
};


// ========================================
// GET USER PROFILE FROM FIRESTORE
// ========================================

const getUserProfile = async (firebaseUser) => {
  const userDocRef = doc(
    db,
    "users",
    firebaseUser.uid
  );

  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      ...userSnap.data(),
    };
  }

  // Fallback profile
  const normalizedEmail =
    (firebaseUser.email || "").toLowerCase();

  const demoMatch =
    DEFAULT_DEMO_USERS[normalizedEmail];

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name:
      firebaseUser.displayName ||
      demoMatch?.name ||
      "User",
    role: demoMatch?.role || "Viewer",
    avatar:
      firebaseUser.photoURL ||
      demoMatch?.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
  };
};


// ========================================
// INITIALIZE AUTH
// ========================================

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",

  async (_, thunkAPI) => {
    try {
      return await new Promise((resolve, reject) => {

        const unsubscribe = onAuthStateChanged(
          auth,
          async (firebaseUser) => {

            unsubscribe();

            if (!firebaseUser) {
              resolve(null);
              return;
            }

            try {
              const profile =
                await getUserProfile(firebaseUser);

              resolve(profile);
            } catch (error) {
              reject(error);
            }
          }
        );
      });

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ========================================
// LOGIN
// ========================================

export const login = createAsyncThunk(
  "auth/login",

  async ({ email, password }, thunkAPI) => {
    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const profile =
        await getUserProfile(
          userCredential.user
        );

      return profile;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ========================================
// GOOGLE LOGIN
// ========================================

export const loginWithGoogle =
  createAsyncThunk(
    "auth/loginWithGoogle",

    async (_, thunkAPI) => {
      try {

        const provider =
          new GoogleAuthProvider();

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const googleUser = result.user;

        const userDocRef = doc(
          db,
          "users",
          googleUser.uid
        );

        const userSnap =
          await getDoc(userDocRef);

        if (!userSnap.exists()) {

          const normalizedEmail =
            (googleUser.email || "").toLowerCase();

          const demoMatch =
            DEFAULT_DEMO_USERS[
              normalizedEmail
            ];

          const newUserProfile = {
            name:
              googleUser.displayName ||
              "User",

            email:
              googleUser.email,

            role:
              demoMatch?.role ||
              "Viewer",

            avatar:
              googleUser.photoURL ||
              demoMatch?.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${googleUser.email}`,

            createdAt:
              serverTimestamp(),
          };

          await setDoc(
            userDocRef,
            newUserProfile
          );

          return {
            uid: googleUser.uid,
            ...newUserProfile,
            createdAt: undefined,
          };
        }

        return {
          uid: googleUser.uid,
          email: googleUser.email,
          ...userSnap.data(),
        };

      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );


// ========================================
// LOGOUT
// ========================================

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, thunkAPI) => {
    try {
      await signOut(auth);

      return null;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ========================================
// ADD ADMIN
// ========================================

export const addAdmin = createAsyncThunk(
  "auth/addAdmin",

  async (newAdmin, thunkAPI) => {
    try {

      const normalizedEmail =
        newAdmin.email
          .trim()
          .toLowerCase();

      const userDocRef = doc(
        db,
        "pending_users",
        normalizedEmail
      );

      const profile = {
        name: newAdmin.name,

        email: normalizedEmail,

        role:
          newAdmin.role ||
          "Admin",

        avatar:
          newAdmin.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${newAdmin.name}`,

        createdAt:
          serverTimestamp(),
      };

      await setDoc(
        userDocRef,
        profile
      );

      return {
        success: true,
        message:
          `Successfully registered profile for ${newAdmin.name} (${newAdmin.role})`,
      };

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ========================================
// SLICE
// ========================================

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: true,
    error: null,
  },

  reducers: {

    updateUser: (state, action) => {

      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }

    },

  },

  extraReducers: (builder) => {

    // INITIALIZE AUTH
    builder
      .addCase(
        initializeAuth.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        initializeAuth.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )

      .addCase(
        initializeAuth.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


    // LOGIN
    builder
      .addCase(
        login.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )

      .addCase(
        login.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


    // GOOGLE LOGIN
    builder
      .addCase(
        loginWithGoogle.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        loginWithGoogle.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )

      .addCase(
        loginWithGoogle.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );


    // LOGOUT
    builder
      .addCase(
        logout.fulfilled,
        (state) => {
          state.user = null;
          state.loading = false;
        }
      )

      .addCase(
        logout.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      );

  },
});


export const {
  updateUser,
} = authSlice.actions;


export default authSlice.reducer;