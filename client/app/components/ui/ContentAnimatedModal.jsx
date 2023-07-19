import { useToggle } from "@/app/lib/store";
import { useTrail, animated } from "@react-spring/web";
import { Children } from "react";

const ContentAnimatedModal = ({ children, hidden }) => {
    const open = useToggle((state) => state.open);

    const items = Children.toArray(children);
    const trail = useTrail(items.length, {
        config: { duration: 180, mass: 5, tension: 1500, friction: 100 },
        opacity: open ? 1 : 0,
        x: open ? 0 : 40,
        height: open ? "auto" : "auto",
        from: { opacity: 0, x: -50, height: 0 },
        delay: open ? 300 : 0,
    });
    return (
        <div>
            {trail.map(({ height, ...style }, index) => (
                <animated.div key={index} style={style} hidden={hidden}>
                    <animated.div style={{ height }}>
                        {items[index]}
                    </animated.div>
                </animated.div>
            ))}
        </div>
    );
};

export default ContentAnimatedModal;
