import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAuthState, logout } from "./slices/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(setAuthState({ user: res.data.user, token }));
      } catch {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [token, dispatch]);
};

export default useAuthCheck;
