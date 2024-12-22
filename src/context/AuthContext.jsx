
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider
export const AuthProvider = ({ children }) => {
    
  const [authData, setAuthData] = useState(() => {
    // Get the token from localStorage (or sessionStorage) when app first loads
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Decode the token if needed and set user data here
      return { token: storedToken, isAuthenticated: true };
    }
    return { token: null, isAuthenticated: false };
  });

  // Login function: This will send credentials and store token
  const login = async (email, password) => {
    try {
      // Call the API to get the JWT token (replace this with your API call)
      const response = await fetch("https://your-api-url.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.token) {
        // Save the token to localStorage and update state
        localStorage.setItem("token", data.token);
        setAuthData({ token: data.token, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function: Clear the token from storage and reset state
  const logout = () => {
    localStorage.removeItem("token");
    setAuthData({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
