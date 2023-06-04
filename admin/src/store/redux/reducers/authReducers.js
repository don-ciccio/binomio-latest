import { createReducer } from "@reduxjs/toolkit";

//login
export const loginReducer = createReducer(
    { user: [], isAuthenticated: false, message: "" },
    (builder) => {
        builder.addCase("LOGIN_REQUEST", (state) => {
            state.loading = true;
        });
        builder.addCase("REGISTER_REQUEST", (state) => {
            state.loading = true;
        });
        builder.addCase("LOGOUT_REQUEST", (state) => {
            state.loading = true;
        });
        builder.addCase("LOAD_REQUEST", (state) => {
            state.loading = true;
        });
        builder.addCase("LOGIN_SUCCESS", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = true),
                (state.user = action.payload),
                (state.message = action.payload.message);
        });
        builder.addCase("REGISTER_SUCCESS", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = true),
                (state.user = action.payload),
                (state.message = action.payload.message);
        });
        builder.addCase("LOAD_SUCCESS", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = true),
                (state.user = action.payload),
                (state.message = action.payload.message);
        });
        builder.addCase("LOGOUT_SUCCESS", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = false),
                (state.message = action.payload.message),
                (state.user = action.payload);
        });
        builder.addCase("LOGIN_FAIL", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = false),
                (state.error = action.payload);
        });
        builder.addCase("REGISTER_FAIL", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = false),
                (state.error = action.payload);
        });
        builder.addCase("LOAD_FAIL", (state, action) => {
            (state.loading = false),
                (state.isAuthenticated = false),
                (state.error = action.payload),
                (state.user = null);
        });
        builder.addCase("LOGOUT_FAIL", (state, action) => {
            (state.loading = false), (state.error = action.payload);
        });
        builder.addCase("CLEAR_ERROR_USER", (state) => {
            state;
            state.error = null;
            state.message = "";
        });
    }
);
