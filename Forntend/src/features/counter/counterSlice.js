import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("user")) || null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value = action.payload;
    },
    logOutUser: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, logOutUser } = counterSlice.actions;

export default counterSlice.reducer;
