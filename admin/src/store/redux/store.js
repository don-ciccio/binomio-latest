import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { loginReducer } from "@/store/redux/reducers/authReducers";

const rootReducer = combineReducers({
    user: loginReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
