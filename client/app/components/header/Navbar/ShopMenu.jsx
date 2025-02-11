"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import useMeasure from "react-use-measure";
import { useSpring, config, animated } from "@react-spring/web";

import dynamic from "next/dynamic";

/* components */
const MiniCart = dynamic(() => import("./ShopMenuComponents/MiniCart"), {
    ssr: false,
});

import MiniLogin from "./ShopMenuComponents/MiniLogin";
import MiniWishList from "./ShopMenuComponents/MiniWishList";
import MiniSearch from "./ShopMenuComponents/MiniSearch";

import ContentAnimated from "./ShopMenuComponents/ContentAnimated";
import MiniSearchInput from "./ShopMenuComponents/MiniSearchInput";

/* hooks */
import useComponentVisible from "@/app/lib/hooks/useComponentVisible";
import { ThemeContext } from "@/app/lib/context/theme";
import { setToggle } from "@/app/lib/context/reducer";

import { useCart } from "@/app/lib/hooks/useCart";
import AccountIcon from "../../icons/AccountIcon";
import HeartIcon from "../../icons/HeartIcon";
import CartIcon from "../../icons/CartIcon";

const array = [
    { id: 0, component: <MiniLogin />, isVisible: true },
    { id: 1, component: <MiniCart />, isVisible: true },
    { id: 2, component: <MiniWishList />, isVisible: true },
    { id: 3, component: <MiniSearch />, isVisible: true },
];

const ShopMenu = () => {
    const { totalQuantity } = useCart();

    const defaultHeight = 48;
    const [contentHeight, setContentHeight] = useState(defaultHeight);
    const [items, setItems] = useState(array);
    const [show, setShow] = useState(true);

    const { state, dispatch } = useContext(ThemeContext);
    const { ref, isComponentVisible } = useComponentVisible(true);
    const [refHeight, { height }] = useMeasure();

    const handleClick = (number) => {
        const triggeredItems = items.map((item) => {
            if (item.id !== number) {
                item.isVisible = false;
            } else {
                item.isVisible = true;
            }
            return item;
        });

        dispatch(setToggle(false));
        setItems(triggeredItems);
        setShow(true);
    };

    const handleClickLink = (e, number) => {
        e.preventDefault();
        handleClick(number);
        setShow(false);
    };

    const rightMenuAnimation = useSpring({
        opacity: state.active && show ? 0 : 1,
        transform: state.active && show ? `translateX(100%)` : `translateX(0)`,
        delay: state.active && show ? 0 : 200,
    });

    const expand = useSpring({
        config: config.stiff,
        height: state.active ? `${contentHeight}px` : `${defaultHeight}px`,
    });

    const listener = useCallback(() => {
        setContentHeight(height);
    }, [height]);

    useEffect(() => {
        setContentHeight(height);
        window.addEventListener("resize", listener);
        return window.removeEventListener("resize", listener);
    }, [height, listener]);

    return (
        <div
            ref={ref}
            className='lg:block hidden relative transition ease-in-out duration-300'
        >
            {isComponentVisible && (
                <animated.div
                    style={expand}
                    className='rounded-3xl shadow-md shadow-zinc-400/25 bg-white -z-1 absolute left-0 top-0 w-full transition ease-in-out duration-300'
                >
                    <div ref={refHeight} className='pt-16 pb-5'>
                        {items.map(({ id, component, isVisible }) => (
                            <ContentAnimated
                                key={id}
                                hidden={!isVisible}
                                state={state.active}
                            >
                                <div
                                    className={`${
                                        state.active ? "block" : "hidden"
                                    }`}
                                >
                                    {component}
                                </div>
                            </ContentAnimated>
                        ))}
                    </div>
                </animated.div>
            )}
            {!isComponentVisible && (
                <animated.div
                    style={expand}
                    className='rounded-3xl shadow bg-white -z-1 absolute left-0 top-0 w-full transition ease-in-out duration-300'
                ></animated.div>
            )}

            <ul className='flex tracking-wider text-sm	items-center h-3 py-6 px-2	relative justify-end'>
                <li className='pr-2.5	pl-0 relative'>
                    <div className='md:w-40 relative'>
                        <MiniSearchInput
                            onClick={() => handleClick(3)}
                            state={state.active}
                            show={show}
                        />
                    </div>
                </li>

                <animated.li
                    style={rightMenuAnimation}
                    onClick={(e) => handleClickLink(e, 0)}
                    className='px-2.5 md:inline'
                >
                    <a
                        href='/#'
                        className='p-2.5 block hover:bg-gray-150 hover:rounded-full'
                    >
                        <AccountIcon />
                        <span className='hidden'>Sign In</span>
                    </a>
                </animated.li>

                <animated.li
                    style={rightMenuAnimation}
                    onClick={(e) => handleClickLink(e, 2)}
                    className='px-2.5 md:inline'
                >
                    <a
                        href='/#'
                        className='p-2 block hover:bg-gray-150 hover:rounded-full'
                    >
                        <HeartIcon className='w-7 h-7' />
                    </a>
                </animated.li>

                <animated.li
                    style={rightMenuAnimation}
                    onClick={(e) => handleClickLink(e, 1)}
                    className='pl-2.5 pr-0 md:inline'
                >
                    <button
                        type='button'
                        className='p-2.5 block bg-gray-100 rounded-full hover:bg-gray-150'
                    >
                        <CartIcon />
                    </button>
                    {totalQuantity > 0 && (
                        <span className='absolute -top-3 -right-2 w-5	h-5 object-contain	bg-zinc-800 shadow-sm shadow-zinc-400 rounded-xl justify-center items-center flex'>
                            <span className='text-xs text-zinc-200'>
                                {totalQuantity}
                            </span>
                        </span>
                    )}
                </animated.li>
            </ul>
        </div>
    );
};

export default ShopMenu;
