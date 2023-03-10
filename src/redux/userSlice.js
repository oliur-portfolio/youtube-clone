import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
    },
});

export const { loginStart, loginSuccess, loginError, loginOut, subscription } =
    userSlice.actions;

export const userLoadingState = (state) => state.user.loading;
export const userDataState = (state) => state.user.currentUser;
export const userErrorState = (state) => state.user.error;

export default userSlice.reducer;
