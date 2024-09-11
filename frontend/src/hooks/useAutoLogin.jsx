import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/featuers/userSlice";
import axios from "axios";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // IIFE
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/refresh",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            fullName: response.data.user.fullName,
            username: response.data.user.username,
            auth: response.data.auth,
            profilePic: response.data.user.profilePic,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;
