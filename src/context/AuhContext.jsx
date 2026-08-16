import { createContext, useContext, useState } from "react";

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
  // Load users from storage or fall back to defaults
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("zindua_user_db");
      return savedUsers ? JSON.parse(savedUsers) : DEFAULT_DEMO_USERS;
    } catch {
      return DEFAULT_DEMO_USERS;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("zindua_admin_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (password !== "admin123") {
      return { success: false, message: "Invalid password. (Use admin123)" };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const account = users[normalizedEmail];

    if (account) {
      const userData = { ...account, email: normalizedEmail };
      setUser(userData);
      localStorage.setItem("zindua_admin_user", JSON.stringify(userData));
      return { success: true };
    }

    return { 
      success: false, 
      message: "User not found. Try superadmin@zindua.com, admin@zindua.com, editor@zindua.com, or viewer@zindua.com" 
    };
  };

  // Dynamically add a new Admin / User
  const addAdmin = (newAdmin) => {
    const emailKey = newAdmin.email.trim().toLowerCase();

    if (users[emailKey]) {
      return { success: false, message: "A user with this email already exists." };
    }

    const updatedUsers = {
      ...users,
      [emailKey]: {
        name: newAdmin.name,
        role: newAdmin.role || "Admin",
        avatar: newAdmin.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newAdmin.name}`
      }
    };

    setUsers(updatedUsers);
    localStorage.setItem("zindua_user_db", JSON.stringify(updatedUsers));
    return { success: true, message: `Successfully added ${newAdmin.name} as ${newAdmin.role}` };
  };

  const updateUser = (updatedFields) => {
    if (!user) return;
    const updatedUserData = { ...user, ...updatedFields };
    setUser(updatedUserData);
    localStorage.setItem("zindua_admin_user", JSON.stringify(updatedUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zindua_admin_user");
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
        users,
        login,
        logout,
        addAdmin,
        updateUser,
        hasRole,
        isSuperAdmin,
        isAuthenticated: !!user
      }}
    >
      {children}
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