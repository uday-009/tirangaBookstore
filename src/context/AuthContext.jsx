
import { createContext, useContext, useState, useEffect } from "react";
import authServices from "../api/auth";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider
export const AuthProvider = ({ children }) => {
    
  const [authData, setAuthData] = useState(() => {
    // Get the token from localStorage (or sessionStorage) when app first loads
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedToken) {
      // Decode the token if needed and set user data here
      return { user: storedUser, token: storedToken, isAuthenticated: true };
    }
    return {user:null, token: null, isAuthenticated: false };
  });



  const login = async (phoneNumber,otp) => {
    console.log('otp login successful', otp)
    // Make an API call to verify the OTP
    try {
        const {data, status, message} = await authServices.verifyOtp({ username: phoneNumber, otp });

        if (status) {
            // OTP verified successfully
            console.log("OTP verified successfully!");
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            setAuthData({user: data.user, token: data.token, isAuthenticated: true });
            // You can update the auth state or navigate the user to the next page
        } else {
            // OTP verification failed
            console.error("OTP verification failed:", message);
            alert("Invalid OTP. Please try again.");
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Something went wrong. Please try again.");
    } 
}

  // Logout function: Clear the token from storage and reset state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthData({user: null, token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
