"use client";

import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import ContentAnimated from "../header/Navbar/ShopMenuComponents/ContentAnimated";
import Modal from "../ui/Modal";

const Filter = ({ data, show }) => {
    const [refWidth, { width }] = useMeasure();

    const props = useSpring({
        width: show ? width : 0,

        config: { duration: 650, mass: 5, tension: 1500, friction: 100 },
    });

    return (
        <Modal>
            <div className='flex' ref={refWidth}>
                <animated.div
                    style={props}
                    className='flex justify-end fixed rounded-3xl shadow-md shadow-zinc-400/25 bg-white top-5 right-0 z-50 max-w-xl w-1/2'
                >
                    <div className='px-6 p-6 flex flex-col gap-6 w-full'>
                        {data?.properties.map((property, i) => (
                            <ContentAnimated key={i} state={show}>
                                <div className='flex flex-col justify-center'>
                                    <div className='flex w-full text-lg font-semibold justify-center'>
                                        {property.name}
                                    </div>
                                    <hr class='my-3'></hr>
                                    <div className='grid grid-cols-1 gap-4 min-w-200'>
                                        {property.values &&
                                            property?.values.map((value, i) => (
                                                <button
                                                    className='disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-75 transition rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 w-auto'
                                                    key={i}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </ContentAnimated>
                        ))}
                    </div>
                </animated.div>
            </div>
        </Modal>
    );
};

export default Filter;
