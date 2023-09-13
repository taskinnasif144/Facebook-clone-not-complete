import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "image",
  initialState: {
    value: {
      isOpen: true,
      imageUrl: "",
    },
  },
  reducers: {
    openImage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { openImage } = userSlice.actions;

export default userSlice.reducer;
