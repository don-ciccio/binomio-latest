"use client";

import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import dynamic from "next/dynamic";

const Modal = dynamic(
    () => {
        return import("../ui/Modal");
    },
    { ssr: false }
);

import MenuAccordion from "../ui/Accordion";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useToggle } from "@/app/lib/store";
import ContentAnimatedModal from "../ui/ContentAnimatedModal";

const Filter = ({ data }) => {
    const [refWidth, { width }] = useMeasure();

    const open = useToggle((state) => state.open);
    const setOpen = useToggle((state) => state.setOpen);

    const props = useSpring({
        width: open ? width : 0,

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
                    <div className='px-6 p-6 flex flex-col gap-4 w-full'>
                        <div className='flex  justify-end  px-4'>
                            <button onClick={() => setOpen(!open)}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='28'
                                    height='28'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        fill='currentColor'
                                        d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z'
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className='flex flex-col justify-center w-full px-4 pb-2'>
                            <h2 className='font-semibold text-xl'>
                                Filtra per:
                            </h2>
                        </div>
                        {data?.properties.map((property, i) => (
                            <ContentAnimatedModal key={i}>
                                <div className='flex flex-col justify-center w-full border-b-[1px] border-zinc-300'>
                                    <MenuAccordion title={property._id}>
                                        <div className='mb-2'>
                                            {property?.values &&
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
                            </ContentAnimatedModal>
                        ))}
                        <ContentAnimatedModal>
                            <div className='flex flex-col justify-center w-full'>
                                <MenuAccordion title='Produttore'>
                                    <div className='mb-2'>
                                        {data?.sellers.map((property, i) => (
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
                        </ContentAnimatedModal>
                    </div>
                </animated.div>
            </div>
        </Modal>
    );
};

export default Filter;
