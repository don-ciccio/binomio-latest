import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/theme";
import { setToggle } from "../context/reducer";

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] =
        useState(initialIsVisible);
    const { state, dispatch } = useContext(ThemeContext);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if (state.active) {
                setIsComponentVisible(false);
                dispatch(setToggle(true));
            }
        } else {
            setIsComponentVisible(true);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}
