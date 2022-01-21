import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginAction } from "../store/auth.i";

const initialState: AuthState = {
  uid: null,
  name: null,
  email: null,
  following: [],
  followers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginAction>) => {
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    logout: () => {
      return {
        uid: null,
        name: null,
        email: null,
        followers: [],
        following: [],
      };
    },
    updateUser: (state: AuthState, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
