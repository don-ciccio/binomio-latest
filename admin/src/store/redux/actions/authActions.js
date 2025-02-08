import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getLoginAction = (loginData) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            crossorigin: true,
        };

        const { data } = await axios.post(
            `${API_URL}/api/login`,
            loginData,
            config
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: error.response.data.message,
        });
    }
};

export const registerAction = (registerData) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_REQUEST" });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            crossorigin: true,
        };

        const { data } = await axios.post(
            `${API_URL}/api/register`,
            registerData,
            config
        );
        dispatch({ type: "REGISTER_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: error.response.data.message,
        });
    }
};

//get user
export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_REQUEST" });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            crossorigin: true,
        };
        const { data } = await axios.get(`${API_URL}/api/me`, config);
        dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "LOAD_FAIL",
            payload: error.response.data.message,
        });
    }
};

//logout
export const userLogout = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQUEST" });
        const { data } = await axios.get(`${API_URL}/api/logout`);
        dispatch({ type: "LOGOUT_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "LOGOUT_FAIL",
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: "CLEAR_ERROR_USER",
    });
};
