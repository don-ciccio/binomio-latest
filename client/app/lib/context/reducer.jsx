"use client";
export const initialState = {
    active: false,
};

export const setToggle = (active) => ({
    type: "toggle_button",
    state: {
        active,
    },
});

export const reducer = (state, action) => {
    switch (action.type) {
        case "toggle_button":
            return {
                ...state,
                active: !state.active,
            };

        default:
            return state;
    }
};
