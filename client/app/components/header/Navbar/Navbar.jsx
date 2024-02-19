"use client";

import { useState, forwardRef, useEffect, useCallback } from "react";
import useMeasure from "react-use-measure";
import Links from "./Links";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import ShopMenu from "./ShopMenu";
import { useSpring, config } from "@react-spring/web";
import MobileCart from "../MobileNavbar/MobileCart";
import MobileNav from "../MobileNavbar/MobileNav";
import Link from "next/link";

const animationConfig = {
    frictionLight: 20,
    frictionHeavy: 30,
    tension: 375,
    delay: 25,
    duration: 50,
};

const Navbar = forwardRef((props, ref) => {
    const [show, set] = useState(true);
    const [open, setOpen] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [refWidth, { width }] = useMeasure();

    const [styles, api] = useSpring(() => ({
        transformTop: "translate(-2px, 0px) rotate(0deg)",
        transformMiddle: "translate(-2px, 0px) rotate(0deg)",
        transformBottom: "translate(-2px, 0px) rotate(0deg)",
        widthTop: "18px",
        widthBottom: "18px",
        widthMiddle: "18px",
        scale: "scale(0)",
        config: config.stiff,
    }));

    const setToggle = () => {
        set(!show);
        api.start({
            to: {
                transformTop: show
                    ? "translate(-23px, 19px) rotate(-38deg)"
                    : "translate(26px, 3px) rotate(45deg)",
                transformMiddle: show
                    ? "translate(-32px, 7px) rotate(-38deg)"
                    : "translate(37px, -7px) rotate(45deg)",

                transformBottom: show
                    ? "translate(30px, -6px) rotate(39deg)"
                    : "translate(-35px, 21px) rotate(-45deg)",
                scale: show ? "scale(50)" : "scale(50)",

                widthTop: show ? "17px" : "22px",
                widthBottom: show ? "17px" : "22px",
                widthMiddle: show ? "0px" : "0px",
            },
            config: config.default,
        });
    };

    const setClose = () => {
        setToggle();
        setTimeout(() => {
            api.start({
                to: {
                    scale: "scale(1)",
                    transformTop: "translate(-2px, 0px) rotate(0deg)",
                    transformMiddle: "translate(-2px, 0px) rotate(0deg)",
                    transformBottom: "translate(-2px, 0px) rotate(0deg)",
                    widthTop: "18px",
                    widthBottom: "18px",
                    widthMiddle: "18px",
                },
                config: { tension: 170, friction: 27, duration: 150 },
            });
            setOpen(!open);
        }, 150);
    };

    const listener = useCallback(() => {
        setContentWidth(width);
    }, [width]);

    useEffect(() => {
        setContentWidth(width);
        window.addEventListener("resize", listener);
        return window.removeEventListener("resize", listener);
    }, [listener, width]);

    return (
        <>
            <div>
                <div className='md:px-6 px-3'>
                    <div
                        ref={refWidth}
                        className='
                            flex 
                            relative 
                            pb-2 
                            mx-0 
                            h-25
                        '
                    >
                        <div
                            className={`
                            ${
                                open
                                    ? "sm:flex-basis-11 xxs:flex-basis-20"
                                    : "md:flex-basis-41 md:max-w-5/12 xxs:flex-basis-16"
                            } 
                            flex 
                            justify-start 
                            items-center 
                            relative 
                      
                            h-inherit 
                            px-0
                            `}
                        >
                            <Links categories={props.categories} />
                            <HamburgerMenu
                                open={open}
                                toggle={show ? setOpen : setToggle}
                                styles={styles}
                                api={api}
                                animationConfig={animationConfig}
                                show={show}
                            />
                        </div>

                        <>
                            <div
                                className={`${
                                    open
                                        ? "hidden"
                                        : "flex-basis-66 md:flex-basis-16 flex justify-center relative px-0 items-center md:max-w-2/12"
                                } `}
                            >
                                <Link href='/'>
                                    <Logo
                                        {...props}
                                        id={props.id}
                                        ref={ref}
                                        style={props.style}
                                        className={props.className}
                                    >
                                        {props.children}
                                    </Logo>
                                </Link>
                            </div>
                        </>

                        <div
                            className={`flex ${
                                open
                                    ? "xxs:flex-basis-80 xxs:max-w-4/5 sm:flex-basis-89 sm:max-w-89"
                                    : "md:max-w-5/12 md:flex-basis-41 w-13 xxs:flex-basis-16"
                            }  justify-end items-center static px-0 h-inherit`}
                        >
                            <ShopMenu />
                            <MobileCart
                                toggle={setClose}
                                open={open}
                                contentWidth={contentWidth}
                                show={show}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <MobileNav open={open} show={show} toggle={setToggle} />
        </>
    );
});

export default Navbar;
