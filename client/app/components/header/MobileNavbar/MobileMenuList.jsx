import { animated } from "@react-spring/web";
import { Children } from "react";

const MobileMenuList = ({ children, style, index }) => {
    const items = Children.toArray(children);
    return <animated.div style={style}>{items[index]}</animated.div>;
};

export default MobileMenuList;
