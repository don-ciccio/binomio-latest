import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Icon } from "@iconify/react";

const MenuAccordion = ({ title, children, icon }) => {
    const [open, setOpen] = useState();
    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const calcContentMaxHeight = () => {
            ref.current && setContentMaxHeight(ref.current.scrollHeight);
        };

        calcContentMaxHeight();

        window.addEventListener("resize", () => calcContentMaxHeight());

        return () =>
            window.removeEventListener("resize", calcContentMaxHeight());
    }, [ref, contentMaxHeight]);

    const { scY, y, ...props } = useSpring({
        scY: open ? "-180deg" : "0deg",
        // y: open ? 0 : -contentMaxHeight,
        opacity: open ? 1 : 0,
        maxHeight: open ? `${contentMaxHeight}px` : "0px",
        config: { duration: 300 },
    });

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className={`${
                    open
                        ? "focus:text-orange-600 active:text-orange-600 focus:bg-orange-100/25 active:bg-orange-100/25"
                        : "text-zinc-600"
                } block px-4 py-2 text-sm mb-3 cursor-pointer focus:text-orange-600 active:text-orange-600 focus:bg-orange-100/25 active:bg-orange-100/25 w-full`}
            >
                <Icon
                    className='focus:text-orange-600 active:text-orange-600 w-5 h-5 text-lg inline-block mb-0.5 mr-3 float-left'
                    icon={icon}
                />
                <span className='pr-5 align-middle float-left font-semibold text-base active:text-orange-600 focus:text-orange-600'>
                    {title}
                </span>
                {children && (
                    <animated.span
                        style={{
                            transform: scY.to((scY) => `rotate(${scY})`),
                        }}
                        className='mt-0.5 block float-right'
                    >
                        <Icon
                            icon='mdi:chevron-down'
                            className='align-middle text-2xl font-semibold'
                        />
                    </animated.span>
                )}
            </button>
            <animated.ul
                style={{
                    overflow: "hidden",
                    ...props,
                }}
                ref={ref}
                className='p-0 block'
            >
                {children}
            </animated.ul>
        </>
    );
};

export default MenuAccordion;
