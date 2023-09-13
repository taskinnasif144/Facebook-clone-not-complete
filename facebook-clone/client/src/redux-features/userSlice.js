import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "",
      email: "",
      dp: "",
      date: "",
      gender: "",
      cover: "",
      ownPosts: [],
      friends: [],
      friendRequests: [],
      savedPosts: [],
      bio: "",
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { login } = userSlice.actions;

export default userPersistedReducer;
