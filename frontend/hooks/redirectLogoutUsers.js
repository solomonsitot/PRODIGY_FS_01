import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../src/redux/features/counter/counterSlice";
import axios from "axios";

const useRedirectLogoutUsers = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/get-log-status`,
          { withCredentials: true }
        );
        const isLoggedIn = response.data.message;
        dispatch(SET_LOGIN(isLoggedIn));
        
        if (!isLoggedIn) {
          window.alert("Session expired, please login again");
          setTimeout(() => navigate(path), 300);  // Delay navigation slightly
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        window.alert("An error occurred while checking login status");
      }
    };

    redirect();
  }, [dispatch, navigate, path]);
};

export default useRedirectLogoutUsers;
