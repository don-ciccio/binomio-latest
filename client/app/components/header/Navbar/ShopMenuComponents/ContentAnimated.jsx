import { useTrail, animated } from "@react-spring/web";
import { Children } from "react";

const ContentAnimated = ({ state, children, hidden }) => {
    const items = Children.toArray(children);
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 1500, friction: 100 },
        opacity: state ? 1 : 0,
        y: state ? 0 : -40,
        height: state ? "auto" : 0,
        from: { opacity: 0, y: 20, height: 0 },
        delay: state ? 300 : 0,
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

export default ContentAnimated;
