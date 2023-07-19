"use client";

import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import ContentAnimated from "../header/Navbar/ShopMenuComponents/ContentAnimated";
import Modal from "../ui/Modal";
import MenuAccordion from "../ui/Accordion";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const Filter = ({ data, show }) => {
    const [refWidth, { width }] = useMeasure();

    const props = useSpring({
        width: show ? width : 0,

        config: { duration: 650, mass: 5, tension: 1500, friction: 100 },
    });

    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = (valueKey) => {
        return searchParams.get(valueKey);
    };

    const onClick = (id, valueKey) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );

        router.push(url);
    };

    return (
        <Modal>
            <div className='flex' ref={refWidth}>
                <animated.div
                    style={props}
                    className='flex justify-end overflow-y-scroll h-screen fixed  shadow-md shadow-zinc-400/25 bg-white top-5 right-0 z-50 max-w-xl w-1/2'
                >
                    <div className='px-6 p-6 flex flex-col gap-6 w-full'>
                        {data?.properties.map((property, i) => (
                            <ContentAnimated key={i} state={show}>
                                <div className='flex flex-col justify-center w-full'>
                                    <MenuAccordion title={property._id}>
                                        <div className='mb-2'>
                                            {property.values &&
                                                property?.values.map(
                                                    (value, i) => (
                                                        <li
                                                            className='inline-block mr-2 mb-4'
                                                            key={i}
                                                            onClick={() =>
                                                                onClick(
                                                                    value,
                                                                    property._id
                                                                )
                                                            }
                                                        >
                                                            <label
                                                                className={`${
                                                                    selectedValue(
                                                                        property._id
                                                                    ) === value
                                                                        ? "bg-black text-white"
                                                                        : ""
                                                                } p-5 inline-flex justify-center items-center align-top h-10 border rounded-3xl cursor-pointer`}
                                                            >
                                                                {value}
                                                            </label>
                                                        </li>
                                                    )
                                                )}
                                        </div>
                                    </MenuAccordion>
                                </div>
                            </ContentAnimated>
                        ))}
                        <ContentAnimated state={show}>
                            <div className='flex flex-col justify-center w-full'>
                                <MenuAccordion title='Produttore'>
                                    <div className='mb-2'>
                                        {data.sellers?.map((property, i) => (
                                            <li
                                                className='inline-block mr-2 mb-4'
                                                key={i}
                                                onClick={() =>
                                                    onClick(property, "seller")
                                                }
                                            >
                                                <label
                                                    className={`${
                                                        selectedValue(
                                                            "seller"
                                                        ) === property
                                                            ? "bg-black text-white"
                                                            : ""
                                                    } p-5 inline-flex justify-center items-center align-top h-10 border rounded-3xl cursor-pointer`}
                                                >
                                                    {property}
                                                </label>
                                            </li>
                                        ))}
                                    </div>
                                </MenuAccordion>
                            </div>
                        </ContentAnimated>
                    </div>
                </animated.div>
            </div>
        </Modal>
    );
};

export default Filter;
