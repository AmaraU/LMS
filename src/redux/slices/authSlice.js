import { createSlice } from "@reduxjs/toolkit";

// type AuthState = {
//   userInfo: any;
//   signUpData: any;
// };

const initialState = {
    userInfo: null,
    student: null,
    authToken: null,
    //   signUpData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload.User;
            state.authToken = action.payload.Token;
        },
        setStudent: (state, action) => {
            state.student = action.payload;
        },
        logOut: (state) => {
            state.userInfo = null;
            state.student = null;
            state.authToken = null;
        },
    },
});

export const { setCredentials, setStudent, logOut } = authSlice.actions;

export default authSlice.reducer;