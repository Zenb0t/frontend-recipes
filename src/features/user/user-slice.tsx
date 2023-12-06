import { User } from "@auth0/auth0-react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import apiService from "../../api/api";
import { UserModel } from "./model";
import { UserApi } from "../../api/userApi";

export interface UserState {
  userInfo: UserModel | null;
  userToken: string | null;
  status: string;
  error: any;
}

const initialState = {
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT token
  status: "idle",
  error: null,
} as UserState;

export const sendUser = createAsyncThunk(
  "user/sendUser",
  async (user: UserModel) => {
    const response = await UserApi.sendUser(user);
    console.log("response: ", response.data);
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async (id: string) => {
    const response = await UserApi.getUser(id);
    return response.data;
  }
);

export const fetchUserbyEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email: string) => {
    const response = await UserApi.getUserByEmail(email);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "success";
      })
      .addCase(sendUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendUser.rejected, (state, action) => {
        state.userInfo = null;
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "success";
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.userInfo = null;
        state.status = "error";
      })
      .addCase(fetchUserbyEmail.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "success";
      })
      .addCase(fetchUserbyEmail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserbyEmail.rejected, (state, action) => {
        state.userInfo = null;
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const selectUserToken = (state: RootState) => state.users.userToken;
export const selectUserInfo = (state: RootState) => state.users.userInfo;

export const { setUserInfo, setUserToken } = userSlice.actions;

export default userSlice.reducer;
