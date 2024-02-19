import {
    useSpring,
    useChain,
    animated,
    useSpringRef,
    useTransition,
    config,
} from "@react-spring/web";
import Image from "next/image";
import CartIcon from "../../icons/CartIcon";

const MobileCart = ({ open, contentWidth, show, toggle }) => {
    const springRef = useSpringRef();
    const scale = useSpring({
        transform: open ? "scale(0)" : "scale(1)",
        ref: springRef,
    });

    const transitionRef = useSpringRef();
    const width = useSpring({
        width: open ? `${contentWidth}px` : "52px",
        ref: transitionRef,
        config: config.default,
    });

    const slideUpRef = useSpringRef();
    const slideUp = useSpring({
        to: {
            transform: show ? "translateY(80px)" : "translateY(0)",
            opacity: show ? 0 : 1,
        },
        config: { tension: 170, friction: 26, duration: 150 },
        ref: slideUpRef,
    });

    const transitions = useTransition(show, {
        keys: null,
        from: {
            opacity: 1,
            transformSlide: !show ? "translateY(-35%)" : "translateY(0px)",
        },
        enter: {
            opacity: 1,
            transformSlide: !show ? "translateY(-35%)" : "translateY(0px)",
        },
        leave: {
            opacity: 0,
            transformSlide: !show ? "translateY(-35%)" : "translateY(0px)",
        },

        config: { tension: 170, friction: 27, duration: 200 },
    });

    useChain(
        open
            ? [springRef, transitionRef, slideUpRef]
            : [slideUpRef, transitionRef, springRef],
        [0, open ? 0.1 : 0.2]
    );
    return (
        <animated.div style={width} className='lg:hidden'>
            {!show && (
                <animated.div
                    style={slideUp}
                    className='flex absolute top-6 h-inherit xxs:w-4/5 sm:w-full xxs:flex-basis-80 xxs:max-w-80 sm:flex-basis-89 sm:max-w-89'
                >
                    <h3 className='text-xl font-base leading-5 tracking-wide items-center justify-center flex  my-0 mx-auto'>
                        Woman
                    </h3>

                    <animated.div
                        onClick={toggle}
                        style={slideUp}
                        className='bg-white shadow-md rounded-full flex w-13 h-13 -z-1 justify-center items-center'
                    >
                        <div className='flex flex-col items-center w-10 h-10 p-0  border-none overflow-hidden justify-center'>
                            <svg
                                viewBox='-24 0 100 80'
                                width='40'
                                height='40'
                                fill='#000000'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <animated.rect
                                    y='25'
                                    width='55'
                                    height='6'
                                    rx='5'
                                    style={{
                                        transform:
                                            "translate(26px, 3px) rotate(45deg)",
                                    }}
                                />
                                <animated.rect
                                    y='40'
                                    width='55'
                                    height='6'
                                    rx='5'
                                    style={{
                                        transform:
                                            "translate(38px, -6px) rotate(45deg)",
                                    }}
                                />
                                <animated.rect
                                    y='55'
                                    width='55'
                                    height='6'
                                    rx='5'
                                    style={{
                                        transform:
                                            "translate(-35px, 21px) rotate(-45deg)",
                                    }}
                                />
                            </svg>
                        </div>
                    </animated.div>
                </animated.div>
            )}
            {transitions(
                ({ transformSlide, opacity }, item) =>
                    item && (
                        <animated.div
                            style={{ transform: transformSlide, opacity }}
                            className='bg-white shadow-md rounded-full flex items-center justify-center h-[52px]'
                        >
                            <animated.a
                                style={scale}
                                className='py-2.5 px-2.5 flex relative items-center justify-center'
                                href='/#'
                            >
                                <CartIcon className='w-6 h-6' />
                            </animated.a>
                            {open && (
                                <li className='w-full p-0 absolute top-0 list-none'>
                                    <div className='px-2'>
                                        <form
                                            name='search'
                                            className='block mt-0'
                                            autoComplete='off'
                                        >
                                            <div className='relative block'>
                                                <label
                                                    htmlFor='search'
                                                    className='hidden'
                                                >
                                                    <span>Search</span>
                                                </label>

                                                <input
                                                    id='search'
                                                    type='text'
                                                    placeholder='Cerca'
                                                    className='h-12 rounded-3xl pr-0 bg-white block w-full bg-clip-padding focus:placeholder-transparent::placeholder focus:outline-none placeholder-black leading-5 text-sm pl-4'
                                                />
                                                <button
                                                    className='absolute top-0 -right-4 opacity-20 w-14 h-14 inline-block cursor-pointer -m-0.5'
                                                    disabled
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                        }}
                                                        src='./images/search.svg'
                                                        alt='search'
                                                    />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                            )}
                        </animated.div>
                    )
            )}
            <animated.span
                style={scale}
                className='absolute top-5 -right-1.5 w-5 h-5 object-contain	bg-zinc-800 rounded-xl justify-center items-center flex'
            >
                <span className='text-xs text-zinc-200'>0</span>
            </animated.span>
        </animated.div>
    );
};

export default MobileCart;
