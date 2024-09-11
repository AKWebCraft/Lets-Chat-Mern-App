import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as api from "../api";

// SIGNUP
export const signup = async (inputs) => {
  if (
    !inputs.fullName ||
    !inputs.username ||
    !inputs.password ||
    !inputs.confirmPassword ||
    !inputs.gender
  ) {
    return toast.error("Please fill in all fields");
  }

  if (inputs.password !== inputs.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  if (inputs.password.length < 6) {
    return toast.error("Password must be at least 6 characters");
  }
  let response;

  try {
    response = await api.signUp(inputs);
  } catch (error) {
    return error;
  }

  return response;
};

// LOGIN
export const login = async (inputs) => {
  if (!inputs.username || !inputs.password) {
    return toast.error("Please fill in all fields");
  }

  let response;

  try {
    response = await api.signIn(inputs);
  } catch (error) {
    return error;
  }
  return response;
};

// LOGOUT
export const logout = async () => {
  let response;

  try {
    response = await api.signOut();
  } catch (error) {
    return error;
  }
  return response;
};

const initialState = {
  _id: "",
  fullName: "",
  username: "",
  profilePic: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, fullName, username, auth, profilePic } = action.payload;

      (state._id = _id),
        (state.fullName = fullName),
        (state.username = username),
        (state.auth = auth);
      state.profilePic = profilePic;
    },
    resetUser: (state, action) => {
      state._id = "";
      state.fullName = "";
      state.username = "";
      state.auth = false;
      state.profilePic = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
