import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getPosts = async () => {
  try {
    return await axios.get("http://localhost:3001/posts/");
  } catch (error) {
    console.log(error);
  }
};
export const fetchPosts = createAsyncThunk("posts/fetchPost", getPosts);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    value: [{ id: "", caption: "", image: "", userOwner: "" }],
    isLoaded: false,
  },
  reducers: {
    allPosts: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        console.log(">>>>>>>>>>> pending <<<<<<<<<<<");
        state.isLoaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(">>>>>>>>>>>>>>>>>fulfiled<<<<<<<<<<<<<<");
        state.value = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>rejected<<<<<<<<<<<<<<<<<<<<");
        state.isLoaded = false;
      });
  },
});

const persistConfig = {
  key: "posts",
  storage,
};

const postPersistedReducer = persistReducer(persistConfig, postSlice.reducer);

export const { allPosts } = postSlice.actions;
export default postPersistedReducer;
