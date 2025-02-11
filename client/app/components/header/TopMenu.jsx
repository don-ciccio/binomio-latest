import { useGetContentHero } from "@/app/lib/api";
import { ThemeContext } from "@/app/lib/context/theme";
import { useTransition, animated } from "@react-spring/web";
import { useContext } from "react";

const TopMenu = () => {
    const { state } = useContext(ThemeContext);
    const { data } = useGetContentHero();

    const transitions = useTransition(!state.active, {
        from: {
            opacity: state.active ? 0 : 1,
            transform: state.active ? "translateY(-100px)" : "translateY(0px)",
        },
        enter: {
            opacity: 1,
            transform: state.active ? "translateY(-100%)" : "translateY(0px)",
        },
        leave: {
            opacity: 1,
            transform: state.active ? "translateY(-100%)" : "translateY(0px)",
        },
        config: {
            duration: 450,
        },
        expires: false,
    });

    return (
        <>
            {transitions(
                (style, item) =>
                    item && (
                        <animated.div
                            style={style}
                            className={`${
                                state.active
                                    ? "shadow-transparent"
                                    : "shadow-black/25"
                            } shadow-sm bg-zinc-800 h-5 pt-0.5 text-xs items-center text-center uppercase text-zinc-200 tracking-tight`}
                        >
                            <span>{data?.content.topbar}</span>
                        </animated.div>
                    )
            )}
        </>
    );
};

export default TopMenu;
