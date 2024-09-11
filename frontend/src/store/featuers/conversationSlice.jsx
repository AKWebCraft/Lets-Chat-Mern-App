import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// GET CONVERSATIONS
export const getConversations = createAsyncThunk(
  "conversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.allConversations();
      return response.data.filteredUsers;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET CONVERSATIONS
export const sendMessages = createAsyncThunk(
  "messages",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.sendMessage(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET CHAT
export const getChat = createAsyncThunk(
  "chat",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getChat(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  selectedConversation: null,
  messages: [],
  chat: [],
  conversations: [],
  loading: false,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,

  reducers: {
    setConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getConversations.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      }),
      builder.addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(sendMessages.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(sendMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      }),
      builder.addCase(sendMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(getChat.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
      }),
      builder.addCase(getChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
