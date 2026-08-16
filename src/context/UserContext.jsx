import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = (userData) => {
    setLoading(true);
    setUser(userData);
    setLoading(false);

  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === "admin",
    login,
    logout,

  };

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
};

// Custom hook for consumption in child components

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context;
}