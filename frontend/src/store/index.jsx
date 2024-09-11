import { configureStore } from "@reduxjs/toolkit";
import user from "../store/featuers/userSlice";
import conversation from "../store/featuers/conversationSlice";

const store = configureStore({
  reducer: { user, conversation },
});

export default store;
