import { useGetContent } from "@/app/lib/api";
import { ThemeContext } from "@/app/lib/context/theme";
import { useTransition, animated } from "@react-spring/web";
import { useContext } from "react";

const TopMenu = ({ message }) => {
    const { state } = useContext(ThemeContext);
    const { data } = useGetContent({ message });
    const transitions = useTransition(!state.active, {
        from: {
            opacity: state.active ? 1 : 0,
            transform: state.active ? "translateY(0px)" : "translateY(-100%)",
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
                            <span>{data.data?.content.topbar}</span>
                        </animated.div>
                    )
            )}
        </>
    );
};

export default TopMenu;
