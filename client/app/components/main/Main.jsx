"use client";
import React, { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { a, useSpring } from "@react-spring/web";

/* utils */
import { vectorScaling, clamp } from "@/app/lib/utils/utilFuncs";

/* components */
import Cards from "./Cards/Cards";
import Slider from "./Cards/Slider";

import RippleButton from "../ui/Button";

/* data */
import { useGetContentHero, useGetCategories } from "@/app/lib/api";

const Main = React.forwardRef((props, ref) => {
    const { data } = useGetContentHero();
    const [search, setSearch] = useState("");
    const { data: categories } = useGetCategories({ search });

    const withParent = categories?.filter((p) => p.hasOwnProperty("parent"));
    const divScroll = useRef();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollRange, setScrollRange] = useState(0);

    const onChange = (scrollPosition) => {
        divScroll.current.scrollTo(scrollPosition, 0);
        setScrollPosition(scrollPosition);
    };

    const [{ x, t }, set] = useSpring(() => ({
        t: "translateX(0)",
        x: 0,
    }));

    const bind = useGesture(
        {
            onScroll: (event) => {
                set.start({
                    t: `translateX(${
                        event.scrolling ? clamp(event.delta[0]) : 0
                    }px)`,
                });
            },
            onDrag: ({ down, movement, velocity, direction }) => {
                set.start({
                    x: -movement[0],
                    immediate: down,
                    config: {
                        velocity: vectorScaling(direction, velocity)[0] * -1,
                    },
                });
            },
            onWheelStart: () => {
                // Stop any user-land scroll animation from confcliting with the browser
                set.stop();
            },
        },
        {
            drag: {
                axis: "x",
                bounds: { left: 0, right: scrollRange },
                filterTaps: true,
                from() {
                    return [0, -divScroll.current.scrollLeft];
                },
            },
        }
    );

    useEffect(() => {
        const onScroll = () => {
            const maxScrollLeft =
                divScroll.current.scrollWidth - divScroll.current.clientWidth;
            setScrollPosition(divScroll.current.scrollLeft);
            setScrollRange(maxScrollLeft);
        };
        onScroll();
        const el = divScroll.current;
        if (el) {
            el.addEventListener("scroll", onScroll);
            return () => el.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <>
            <div id='home-top' className='relative h-screen	bg-gray-150'>
                <div className='opacity-100 block fixed overflow-hidden'>
                    <div className='relative block'>
                        <picture>
                            <source
                                media='(min-width: 768px)'
                                srcSet='/images/hero-lg.jpeg'
                            />
                            <source
                                media='(min-width: 325px)'
                                srcSet='/images/hero-sm.jpeg'
                            />
                            <img src='/images/hero-sm.jpeg' alt='bg' />
                        </picture>
                    </div>
                </div>
            </div>
            <div className='relative z-2'>
                <div className='xxs:-mt-84 mx-auto mb-24 relative w-full lg:w-4/6 block'>
                    <span
                        {...props}
                        ref={ref}
                        className='w-32 h-32 left-2/4 -ml-16 p-3 z-10 absolute'
                        id='home-logo-placeholder'
                    ></span>
                    <div className='top-16 relative pt-20 pb-8 px-3 text-center	rounded-2xl	shadow-sm bg-white overflow-hidden '>
                        <h2 className='mb-2.5 tracking-wide uppercase text-2xl max-w-3xl mx-auto font-medium'>
                            {data?.content.heroTitle}
                        </h2>
                        <p className='text-lg px-3 max-w-3xl mx-auto mt-0 mb-1.5'>
                            {data?.content.heroDescription}
                        </p>

                        <div className='mt-8 block'>
                            <RippleButton label={"Prenota un tavolo"} />
                        </div>
                    </div>
                </div>
                <div className='relative block'>
                    <div className='xxs:pt-14 md:pb-0 lg:py-14 relative z-1 text-center bg-gray-150 block'>
                        <div className='mx-auto block'>
                            <div className='w-screen'>
                                <h2 className='tracking-wide uppercase font-medium text-2xl mb-8'>
                                    Il nostro menu
                                </h2>
                                <div className='overflow-hidden'>
                                    <a.div
                                        style={{
                                            touchAction: "pan-x",
                                        }}
                                        ref={divScroll}
                                        scrollLeft={x}
                                        className=' lg:overflow-x-hidden overflow-x-scroll lg:no-scrollbar xxs:pb-8 md:pb-0 lg:pb-8'
                                        {...bind()}
                                    >
                                        <div className='md:h-60 xxs:h-48 -mt-2.5 px-2.5 text-left flex'>
                                            <Cards
                                                items={withParent}
                                                style={{ transform: t }}
                                            />
                                        </div>
                                    </a.div>
                                </div>
                                <Slider
                                    onChange={onChange}
                                    min={0}
                                    max={scrollRange}
                                    value={scrollPosition}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

Main.displayName = "Main";
export default Main;
