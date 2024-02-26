"use client";
import React, { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { a, useSpring } from "@react-spring/web";
import CustomDatePicker from "@/app/components/ui/CustomDatePicker";

/* utils */
import { vectorScaling, clamp } from "@/app/lib/utils/utilFuncs";

/* components */
import Cards from "./Cards/Cards";
import Slider from "./Cards/Slider";

/* data */
import { useGetContentHero, useGetCategories } from "@/app/lib/api";
import {
    useReservationStore,
    useReservationDaysStore,
} from "@/app/lib/store/reservationStore";
import { CustomTimePicker } from "../ui/CustomTimePicker";

const Main = React.forwardRef((props, ref) => {
    const id = "64787b91837e138ddfed4ed0";
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState();

    const { data } = useGetContentHero();
    const [search, setSearch] = useState("");
    const { data: categories } = useGetCategories({ search });

    const fetchDays = useReservationStore((state) => state.fetch);
    const fetchWeekDays = useReservationDaysStore((state) => state.fetch);

    const blackoutDays = useReservationStore((state) => state.data);
    const weekDays = useReservationDaysStore((state) => state.data);

    const blackDays = blackoutDays?.map(
        (day) =>
            new Date(
                new Date(day).getTime() -
                    new Date(day).getTimezoneOffset() * -6000
            )
    );
    const offDay = weekDays
        ?.filter((weekday) => {
            return weekday.reservationAvailable !== false;
        })
        .map((weekday) => weekday.weekday);

    const isWeekday = (date) => {
        const day = new Date(
            new Date(date).getTime() -
                new Date(date).getTimezoneOffset() * -6000
        ).getDay();

        return offDay.includes(day);
    };

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
        fetchDays(id);
        fetchWeekDays(id);
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
                    <div className='top-16 flex flex-col relative pt-20 pb-8 px-3 text-center gap-3	rounded-2xl	shadow-sm bg-white h-full'>
                        <div className='flex'>
                            <h2 className='mb-2.5 tracking-wide uppercase text-2xl max-w-3xl mx-auto font-medium'>
                                {data?.content.heroTitle}
                            </h2>
                        </div>
                        <div className='flex'>
                            <p className='text-lg px-3 max-w-3xl mx-auto mt-0 mb-4'>
                                {data?.content.heroDescription}
                            </p>
                        </div>
                        <div className='flex flex-row flex-wrap gap-4 px-3 items-center justify-center'>
                            <CustomDatePicker
                                filterDate={isWeekday}
                                excludeDates={blackDays}
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setTime("");
                                }}
                            />
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                {weekDays?.map((day, id) => {
                                    return (
                                        day.weekday === startDate.getDay() && (
                                            <div key={id}>
                                                <CustomTimePicker
                                                    onChange={(date) =>
                                                        setTime(date.getTime())
                                                    }
                                                    selected={
                                                        day.startBookingHour
                                                    }
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={30}
                                                    timeCaption='Orario'
                                                    dateFormat='HH:mm'
                                                    timeFormat='HH:mm'
                                                    minTime={82800000}
                                                    maxTime={day.endBookingHour}
                                                />
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                            <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                <select className='w-32 cursor-pointer appearance-none outline-none  bg-gray-50 border pl-5 p-3 rounded-3xl border-gray-300 text-gray-900 sm:text-sm  focus:ring-slate-500 focus:border-slate-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500'>
                                    <option disabled value=''>
                                        Ospiti
                                    </option>
                                </select>
                                <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2'>
                                    <svg
                                        className='fill-current'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g opacity='0.8'>
                                            <path
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                                fill=''
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <button
                                type='button'
                                className={`h-11 max-w-max text-base font-medium items-center justify-center flex bg-zinc-800 hover:bg-zinc-800/75 relative overflow-hidden text-center rounded-full px-7 py-4 cursor-pointer  text-zinc-200 hover:text-white`}
                            >
                                Prenota un tavolo
                            </button>
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
                                                items={categories?.food}
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
