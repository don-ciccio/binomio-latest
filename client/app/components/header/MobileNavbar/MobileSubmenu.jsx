import { animated } from "@react-spring/web";

const MobileSubmenu = ({ style, onClick }) => {
    return (
        <>
            <animated.div style={style}>
                <p>Submenu</p>
                <button onClick={onClick}>Back</button>
            </animated.div>
        </>
    );
};

export default MobileSubmenu;
