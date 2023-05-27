import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useSelector, useDispatch } from "react-redux";

import { LoadUser, clearErrors } from "@/store/redux/actions/authActions";
import { enqueueSnackbar } from "notistack";

import { useEffect } from "react";
import Loader from "./components/common/Loader";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error, message } = useSelector(
        (state) => state.user
    );
    const routing = useRoutes(routes(isAuthenticated));

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {
                variant: "error",
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
            dispatch(clearErrors());
        }

        if (message) {
            enqueueSnackbar(message, {
                variant: "success",
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
            dispatch(clearErrors());
        }
    }, [dispatch, error, message]);

    useEffect(() => {
        dispatch(LoadUser());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className='h-screen flex justify-center items-center'>
                    <Loader />
                </div>
            ) : (
                routing
            )}
        </>
    );
}

export default App;
