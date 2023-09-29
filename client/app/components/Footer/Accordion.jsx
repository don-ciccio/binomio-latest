"use client";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

const Accordion = ({ data }) => {
    const [open, setOpen] = useState();
    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const calcContentMaxHeight = () => {
            ref && setContentMaxHeight(ref.current.scrollHeight);
        };

        calcContentMaxHeight();

        window.addEventListener("resize", () => calcContentMaxHeight());

        return () =>
            window.removeEventListener("resize", calcContentMaxHeight());
    }, [ref, contentMaxHeight]);

    const { scY, y, ...props } = useSpring({
        scY: open ? "-90deg" : "0deg",
        // y: open ? 0 : -contentMaxHeight,
        opacity: open ? 1 : 0,
        maxHeight: open ? `${contentMaxHeight}px` : "0px",
        config: { duration: 300 },
    });

    return (
        <Fragment>
            <div
                onClick={() => setOpen(!open)}
                className='lg:flex-basis-33 lg:max-w-1/3 relative w-full px-2.5 block'
            >
                <h5 className='lg:pb-2.5 pb-8 m-0 font-bold text-sm lg:tracking-tight cursor-pointer lg:cursor-default'>
                    {data.name}
                    <animated.span
                        style={{
                            transform: scY.to((scY) => `rotate(${scY})`),
                        }}
                        className='float-right lg:hidden block'
                    >
                        <Image
                            src='./images/plus.svg'
                            alt='plus'
                            className='align-middle h-4 w-4'
                            width={5}
                            height={5}
                        />
                    </animated.span>
                </h5>
                <animated.ul
                    ref={ref}
                    style={{
                        overflow: "hidden",
                        ...props,
                    }}
                    className='lg:hidden xxs:block m-0 list-none p-0'
                >
                    {data.list.map((item, id) => (
                        <li
                            key={id}
                            className='pb-2.5 list-item list-none text-xs'
                        >
                            {item}
                        </li>
                    ))}
                </animated.ul>
                <ul className='hidden lg:block m-0 list-none p-0'>
                    {data.list.map((item, id) => (
                        <li
                            key={id}
                            className='pb-2.5 list-item list-none text-xs'
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
};

export default Accordion;
