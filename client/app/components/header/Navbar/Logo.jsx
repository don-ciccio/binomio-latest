"use client";
import { animated } from "@react-spring/web";
import { forwardRef } from "react";

const Logo = forwardRef((props, ref) => {
    return (
        <animated.div
            ref={ref}
            {...props}
            id={props.id}
            style={props.style}
            className={props.className}
        >
            {props.children}
        </animated.div>
    );
});

export default Logo;
