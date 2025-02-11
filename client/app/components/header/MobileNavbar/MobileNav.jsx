"use client";

import {
    useTransition,
    animated,
    useTrail,
    useChain,
    useSpringRef,
} from "@react-spring/web";
import { useGetCategories } from "@/app/lib/api";
import Link from "next/link";
import MobileMenuList from "./MobileMenuList";
import MobileSubmenu from "./MobileSubmenu";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AccountIcon from "../../icons/AccountIcon";
import HeartIcon from "../../icons/HeartIcon";
import CartIcon from "../../icons/CartIcon";

const MobileNav = ({ open, show, toggle }) => {
    const [search, setSearch] = useState("");
    const { data } = useGetCategories({ search });

    const headings = [
        "Woman",
        "Man",
        "Junior",
        "Sustainability",
        "Our World",
        "Language",
        "Account",
    ];

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
            return;
        }
        document.body.style.overflowY = "auto";
    }, [open]);

    const transitions = useTransition(show, {
        keys: null,
        from: {
            opacity: 0,
            transformSlide: show
                ? "translate3d(-100%,0,0)"
                : "translate3d(100%,0,0)",
        },
        enter: { opacity: 1, transformSlide: "translate3d(0%,0,0)" },
        leave: {
            opacity: 0,
            transformSlide: show
                ? "translate3d(50%,0,0)"
                : "translate3d(-50%,0,0)",
        },
        config: { tension: 170, friction: 27, duration: 250 },
    });

    const springRef = useSpringRef();
    const trail = useTrail(headings.length, {
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0px)" : "translateY(-200px)",
        config: { tension: 170, friction: 27, duration: 90 },
        ref: springRef,
    });

    const transitionRef = useSpringRef();
    const transition = useTransition(open, {
        from: {
            opacity: 0,
            transformHeader: "translateX(800px)",
        },
        enter: {
            opacity: 1,
            transformHeader: "translateX(0px)",
        },
        leave: {
            opacity: 0,
            transformHeader: "translateX(800px)",
        },
        config: { duration: 250 },
        ref: transitionRef,
    });

    useChain(open ? [springRef, transitionRef] : [transitionRef, springRef], [
        0,
        open ? 0.1 : 0.2,
    ]);

    return transition(({ opacity, transformHeader }, visible) => {
        return visible ? (
            <animated.div className='flex min-h-screen flex-col relative  -z-1'>
                <div
                    id='page-header'
                    className=' relative -top-28 left-0 block'
                >
                    <animated.div
                        style={{ opacity, transform: transformHeader }}
                        className=' bg-gray-200 px-5'
                    >
                        <div className='py-2.5 h-30 relative mx-0 flex flex-wrap bg-gray-200'></div>
                    </animated.div>

                    {transitions(({ opacity, transformSlide }, show) => {
                        return show ? (
                            <animated.div
                                style={{ transform: transformSlide, opacity }}
                                className='block top-32 w-full fixed left-0 bottom-0 overflow-y-auto'
                            >
                                {open &&
                                    data?.menu.length &&
                                    trail.map((props, index) => {
                                        return (
                                            <MobileMenuList
                                                key={index}
                                                index={index}
                                                style={{ ...props }}
                                            >
                                                {data?.menu.map(
                                                    (category, index) =>
                                                        category.slug !==
                                                            "menu" && (
                                                            <Link
                                                                href={`/categorie/${category.slug}`}
                                                                key={index}
                                                            >
                                                                <li className='border-gray-300 border-b list-none'>
                                                                    <div className='h-16 flex flex-wrap justify-between  text-lg leading-5 tracking-wide '>
                                                                        <p className='flex items-center pl-5 m-0 leading-5'>
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </p>
                                                                        <span className='h-16 w-16 flex justify-center items-center'>
                                                                            <Icon
                                                                                className='w-6 h-6 cursor-pointer'
                                                                                icon='oui:arrow-right'
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </Link>
                                                        )
                                                )}
                                                {data?.menu.map(
                                                    (category, index) =>
                                                        category.slug ===
                                                            "menu" && (
                                                            <li
                                                                onClick={toggle}
                                                                key={index}
                                                                className='border-gray-300 border-b list-none  last-of-type:text-orange-600'
                                                            >
                                                                <div className='h-16 flex flex-wrap justify-between  font-medium text-lg leading-5 tracking-wide '>
                                                                    <p className='flex items-center pl-5 m-0 leading-5'>
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </p>
                                                                    <span className='h-16 w-16 flex justify-center items-center'>
                                                                        <Icon
                                                                            className='w-6 h-6 cursor-pointer'
                                                                            icon='oui:arrow-right'
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        )
                                                )}
                                                <li className='border-gray-300 border-b border-t list-none'>
                                                    <div className='h-16 flex flex-wrap justify-between text-xl leading-5 tracking-wide '>
                                                        <h5 className='flex items-center m-0 pl-5 font-semibold text-base'>
                                                            Cambia Lingua
                                                        </h5>
                                                        <a
                                                            href='/#'
                                                            className='h-16 w-16 no-underline bg-transparent cursor-pointer flex justify-center items-center'
                                                        >
                                                            <span className='align-middle h-5 inline-block leading-5 text-xs mr-2'>
                                                                IT
                                                            </span>
                                                            <Icon
                                                                className='w-6 h-6 cursor-pointer'
                                                                icon='oui:arrow-down'
                                                            />
                                                        </a>
                                                    </div>
                                                </li>
                                                <div className='h-24 text-center text-sm uppercase items-center justify-around flex '>
                                                    <div className='block'>
                                                        <a
                                                            href='/#'
                                                            className='no-underline bg-transparent cursor-pointer text-center'
                                                        >
                                                            <AccountIcon />
                                                            <p className='leading-5 mb-2.5 block mt-0'>
                                                                Account
                                                            </p>
                                                        </a>
                                                    </div>
                                                    <div className='block'>
                                                        <a
                                                            href='/#'
                                                            className='no-underline bg-transparent cursor-pointer text-center'
                                                        >
                                                            <HeartIcon className='w-7 h-7' />
                                                            <p className='leading-5 mb-2.5 block mt-0'>
                                                                Wishlist
                                                            </p>
                                                        </a>
                                                    </div>
                                                    <div className='block'>
                                                        <a
                                                            href='/#'
                                                            className='no-underline bg-transparent cursor-pointer text-center'
                                                        >
                                                            <CartIcon />
                                                            <p className='leading-5 mb-2.5 block mt-0'>
                                                                Stores
                                                            </p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </MobileMenuList>
                                        );
                                    })}
                            </animated.div>
                        ) : (
                            <MobileSubmenu
                                style={{ transform: transformSlide, opacity }}
                                onClick={toggle}
                            />
                        );
                    })}
                </div>
            </animated.div>
        ) : null;
    });
};

export default MobileNav;
