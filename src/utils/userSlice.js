import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user"); // fetch user from localStorage

const userSlice = createSlice({
  name: "user",
  initialState: storedUser ? JSON.parse(storedUser) : null, // set from localStorage if available
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload)); // save user
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem("user"); // clear user on logout
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
