import { animated, config } from "@react-spring/web";

const HamburgerMenu = ({
    api,
    open,
    toggle,
    styles,
    animationConfig,
    show,
}) => {
    const handleClick = (e) => {
        e.preventDefault();
        api.start({
            config: config.wobbly,
            to:
                open && show
                    ? [
                          {
                              scale: show ? "scale(1)" : "scale(50)",
                              transformTop:
                                  "translate(-6px, 18.5px) rotate(0deg)",
                              transformMiddle:
                                  "translate(-6px, 0px) rotate(0deg)",
                              transformBottom:
                                  "translate(-6px, -18.5px) rotate(0deg)",
                              widthTop: "18px",
                              widthBottom: "18px",
                              widthMiddle: "18px",
                              config: { clamp: true },
                          },
                          {
                              scale: show ? "scale(1)" : "scale(50)",
                              transformTop: "translate(-2px, 0px) rotate(0deg)",
                              transformMiddle:
                                  "translate(-2px, 0px) rotate(0deg)",
                              transformBottom:
                                  "translate(-2px, 0px) rotate(0deg)",
                              widthTop: "18px",
                              widthBottom: "18px",
                              widthMiddle: "18px",
                              config: {
                                  clamp: false,
                                  friction: animationConfig.frictionLight,
                                  tension: animationConfig.tension,
                              },
                              delay: animationConfig.delay,
                          },
                      ]
                    : [
                          {
                              scale: show ? "scale(50)" : "scale(50)",
                              transformTop:
                                  "translate(-6px, 18.5px) rotate(0deg)",
                              transformMiddle:
                                  "translate(-6px, 0px) rotate(0deg)",
                              transformBottom:
                                  "translate(-6px, -18.5px) rotate(0deg)",
                              widthTop: "18px",
                              widthBottom: "18px",
                              widthMiddle: "0px",
                              config: { clamp: true },
                          },
                          {
                              scale: show ? "scale(50)" : "scale(50)",
                              transformTop:
                                  "translate(26px, 3px) rotate(45deg)",
                              transformMiddle:
                                  "translate(38px, -6px) rotate(45deg)",
                              transformBottom:
                                  "translate(-35px, 21px) rotate(-45deg)",

                              widthTop: "22px",
                              widthBottom: "22px",
                              widthMiddle: "0px",
                              config: {
                                  clamp: false,
                                  friction: animationConfig.frictionLight,
                                  tension: animationConfig.tension,
                              },
                              delay: animationConfig.delay,
                          },
                      ],
        });
        toggle((prev) => !prev);
    };
    return (
        <button className='md:block lg:hidden' onClick={(e) => handleClick(e)}>
            <div className='bg-white shadow-md rounded-full block relative'>
                <animated.div
                    style={{ transform: styles.scale }}
                    className='bg-white shadow-md rounded-full fixed h-12 w-12 -z-1 transform ease-linear duration-300 origin-center'
                ></animated.div>
                <a
                    className='p-1.5 block items-center justify-center'
                    href='/#'
                >
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
                                transform: styles.transformTop,
                            }}
                        />
                        <animated.rect
                            y='40'
                            width='55'
                            height='6'
                            rx='5'
                            style={{
                                transform: styles.transformMiddle,
                            }}
                        />
                        <animated.rect
                            y='55'
                            width='55'
                            height='6'
                            rx='5'
                            style={{
                                transform: styles.transformBottom,
                            }}
                        />
                    </svg>
                </a>
            </div>
        </button>
    );
};

export default HamburgerMenu;
