import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: JSON.parse(localStorage.getItem("mode")) || null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeSwitch: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { themeSwitch } = themeSlice.actions;

export default themeSlice.reducer;
