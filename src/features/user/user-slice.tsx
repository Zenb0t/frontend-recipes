import { User } from "@auth0/auth0-react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserModel } from "./model";
import { UserApi } from "../../api/userApi";
import { ReduxStatus } from "../../consts";

export interface UserState {
  userInfo: UserModel | null;
  userToken: string | null;
  status: ReduxStatus;
  error: any;
}

const initialState = {
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT token
  status: ReduxStatus.IDLE,
  error: null,
} as UserState;

export const sendUser = createAsyncThunk(
  "user/sendUser",
  async (user: UserModel | User) => {
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
        state.status = ReduxStatus.SUCCESS;
      })
      .addCase(sendUser.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(sendUser.rejected, (state, action) => {
        state.userInfo = null;
        state.status = ReduxStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = ReduxStatus.SUCCESS;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.userInfo = null;
        state.status = ReduxStatus.FAILED;
      })
      .addCase(fetchUserbyEmail.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = ReduxStatus.SUCCESS;
      })
      .addCase(fetchUserbyEmail.pending, (state, action) => {
        state.status = ReduxStatus.LOADING;
      })
      .addCase(fetchUserbyEmail.rejected, (state, action) => {
        state.userInfo = null;
        state.status = ReduxStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export const selectUserToken = (state: RootState) => state.users.userToken;
export const selectUserInfo = (state: RootState) => state.users.userInfo;

export const { setUserInfo, setUserToken } = userSlice.actions;

export default userSlice.reducer;
