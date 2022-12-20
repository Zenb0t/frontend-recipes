import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
    userInfo: Object
    userToken: string | null

}

const initialState = {
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT token
} as UserState



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        setUserToken(state, action) {
            state.userToken = action.payload
        }
    },
    extraReducers: {},
})

export const selectUserToken = (state: any) => state.user.userToken;
export const selectUserInfo = (state: any) => state.user.userInfo;

export const { setUserInfo, setUserToken } = userSlice.actions

export default userSlice.reducer