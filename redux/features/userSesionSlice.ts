"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
export interface User {
  userId: string;
  type: string;
  token: string;
}

const initialState: User = {
  userId: "",
  type: "",
  token: "",
};

export const userSesionSlice = createSlice({
  name: "userSesion",
  initialState,
  reducers: {
    setUserSesion: (state, action: PayloadAction<User>) => {
      const user: User = action.payload;
      state = user;
      localStorage.setItem("token", user.token);

    },
  },
});

export const { setUserSesion } = userSesionSlice.actions;

export default userSesionSlice.reducer;
