"use client";

import { useRef } from "react";
import { animated, useSpring, to } from "@react-spring/web";

/* components */
import Header from "@/app/components/header/Header";
import Main from "@/app/components/main/Main";

/* hooks */
import useAnimationFrame from "@/app/lib/hooks/useAnimationFrame";
import useIntersectionObserver from "@/app/lib/hooks/useIntersectionObserver";
import SVGLogo from "@/app/components/icons/SVGLogo";

const HeroSection = ({ categories, message, herotitle, herodescription }) => {
    const triggerRef = useRef();
    const targetElement = useRef();

    /* Trigger & Animation */
    const dataRef = useIntersectionObserver(targetElement, {
        freezeOnceVisible: false,
    });

    const [{ y, s }, api] = useSpring(() => ({
        y: 0,
        s: 0,
    }));

    /* Scroll */
    useAnimationFrame(() => {
        api.start({
            from: {
                s: 80,
                y: triggerRef?.current?.getBoundingClientRect().top,
            },
            to: {
                s: 117,
                y: triggerRef?.current?.getBoundingClientRect().top,
            },
        });
    });

    /* Interpolation */

    const calcY = (o) => {
        const parallax = 20;
        let delta =
            o / parallax +
            triggerRef?.current?.getBoundingClientRect().top * 0.935;

        if (!!dataRef?.isIntersecting > o) {
            return 0;
        } else {
            return delta;
        }
    };

    const dim = (s, y) => {
        let resize = s + 80;
        let padding = s / 8;
        let opacity = s / 20;
        if (calcY(y) <= 35) {
            while (resize >= 80) {
                return [
                    `${resize}px`,
                    `rgba(255, 255, 255, ${opacity}px)`,
                    `${padding}px`,
                ];
            }
            return [`${80}px`, `rgba(255, 255, 255, ${opacity}px)`, `${0}px`];
        } else if (calcY(y) !== 0) {
            return [`${117}px`, "rgba(255, 255, 255, 1)", `${5}px`];
        } else {
            return [`${117}px`, "rgba(255, 255, 255, 1)", `${5}px`];
        }
    };

    const interpLogoSize = to([y, s], (y, s) => dim(y, s)[0]);
    const interpLogoBackground = to([y, s], (y, s) => dim(y, s)[1]);
    const interpLogoPadding = to([y, s], (y, s) => dim(y, s)[2]);

    return (
        <>
            <animated.div>
                <Header
                    message={message}
                    categories={categories}
                    className={`origin-[center_center_0px] align-middle w-full h-full block rounded-full`}
                    style={{
                        transform: to([y], (y) => {
                            return `translate3d(0px, ${calcY(y)}px, 0px)`;
                        }),
                        width: interpLogoSize,
                        height: interpLogoSize,
                        background: interpLogoBackground,
                        padding: interpLogoPadding,
                    }}
                    ref={targetElement}
                >
                    <SVGLogo className='overflow-hidden align-middle h-full w-full' />
                </Header>
            </animated.div>
            <Main
                herotitle={herotitle}
                herodescription={herodescription}
                ref={triggerRef}
            />
        </>
    );
};

export default HeroSection;
