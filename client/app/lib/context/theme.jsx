"use client";

import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};
