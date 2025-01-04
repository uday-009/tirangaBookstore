
import { createContext, useContext, useState, useEffect } from "react";
import authServices from "../api/auth";
import userServices from "../api/user";
import { setCart } from '../redux/features/cart/cartSlice';
import { useDispatch } from "react-redux";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
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

  const fetchCart = async () => {
    if (authData.isAuthenticated) {
      try {
        const response = await userServices.getCart(); // API call to fetch cart
        dispatch(setCart(response.data)); 
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  const syncCartWithBackend = async () => {
    if (authData.isAuthenticated && localStorage.getItem("cart")) {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      try {
        await userServices.syncCart(localCart); // Sync cart with backend
        localStorage.removeItem("cart"); // Clear local cart once synced
        fetchCart(); // Fetch updated cart from backend
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    }
  };


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
            await syncCartWithBackend();
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

  useEffect(() => {
    if (authData.isAuthenticated) {
      fetchCart();
    } else if (localStorage.getItem("cart")) {
      syncCartWithBackend();
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
