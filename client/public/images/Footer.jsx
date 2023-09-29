import React from "react";

import Pin from "../../assets/pinLoc.svg";
import RightArrow from "../../assets/right-long-arrow.svg";
import ArrowDown from "../../assets/down-chevron.svg";
import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Youtube from "../../assets/youtube.svg";
import Accordion from "./Accordion";

export const data = [
    {
        name: "Shop online",
        list: ["Junior", "Man", "Woman"],
    },
    {
        name: "Customer Care",
        list: [
            "FAQs",
            "Shipping & Return",
            "Care & Repair",
            "Authenticity",
            "Payment methods",
            "Terms and conditions",
            "Contacts",
            "My Orders",
        ],
    },
    {
        name: "Our World",
        list: [
            "Save The Duck DNA",
            "Sustainability",
            "Stories",
            "Ethical Code",
            "Organisational model",
        ],
    },
];

const Footer = () => {
    return (
        <footer className='bg-white relative z-10 overflow-hidden block'>
            <div className='block'>
                <div className='mx-0 flex flex-wrap'>
                    <div className='pt-8 border-t border-solid px-0 border-gray-300 lg:flex-basis-58 lg:max-w-58% relative w-full'>
                        <div className='sm:px-5 px-3'>
                            <div className='xxs:mb-10 block lg:hidden'>
                                <ul className='flex pb-0 m-0 list-none p-0'>
                                    <li className='pb-2.5 mr-10 mb-0 list-item'>
                                        <a
                                            href='/#'
                                            className='block bg-transparent cursor-pointer w-10'
                                        >
                                            <img
                                                src={Facebook}
                                                alt='facebook'
                                                className='w-full h-full align-middle'
                                            />
                                        </a>
                                    </li>
                                    <li className='pb-2.5 mr-10 mb-0 list-item'>
                                        <a
                                            href='/#'
                                            className='block bg-transparent cursor-pointer w-10'
                                        >
                                            <img
                                                src={Instagram}
                                                alt='instagram'
                                                className='w-full h-full align-middle'
                                            />
                                        </a>
                                    </li>
                                    <li className='pb-2.5 mr-10 mb-0 list-item'>
                                        <a
                                            href='/#'
                                            className='block bg-transparent cursor-pointer w-10'
                                        >
                                            <img
                                                src={Youtube}
                                                alt='youtube'
                                                className='w-full h-full align-middle'
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='flex flex-wrap -mx-2.5'>
                                {data &&
                                    data.map((item, id) => (
                                        <Accordion key={id} data={item} />
                                    ))}

                                <div className='lg:flex-basis-33 lg:max-w-1/3 lg:mt-5 relative w-full px-2.5 block'>
                                    <h5 className='lg:pb-2.5 pb-8 m-0 font-bold text-lg lg:text-sm lg:tracking-tight cursor-pointer lg:cursor-default'>
                                        Country and Language
                                        <span className='float-right lg:hidden'>
                                            <a
                                                href='/#'
                                                className='no-underline bg-transparent cursor-pointer justify-center items-center lg:block'
                                            >
                                                <span className='align-middle h-5 inline-block leading-5 text-xs mr-2 font-semibold'>
                                                    IT
                                                </span>
                                                <img
                                                    className='overflow-hidden align-middle inline-block h-5 w-5'
                                                    src={ArrowDown}
                                                    alt='arrow down'
                                                />
                                            </a>
                                        </span>
                                    </h5>
                                    <a
                                        href='/#'
                                        className='no-underline bg-transparent cursor-pointer justify-center items-center lg:block hidden'
                                    >
                                        <span className='align-middle h-5 inline-block leading-5 text-xs mr-2 font-semibold'>
                                            IT
                                        </span>
                                        <img
                                            className='overflow-hidden align-middle inline-block h-5 w-5'
                                            src={ArrowDown}
                                            alt='arrow down'
                                        />
                                    </a>
                                </div>
                                <div className='lg:flex-basis-66 lg:max-w-7/12 hidden lg:block lg:mt-5 relative w-full px-2.5'>
                                    <h5 className='pb-2.5 m-0 font-bold text-sm tracking-tight'>
                                        Follow us on
                                    </h5>
                                    <ul className='block overflow-hidden m-0 list-none p-0'>
                                        <li className='pb-2.5 float-left mr-5 list-item list-none'>
                                            <a
                                                href='/#'
                                                className='block bg-transparent cursor-pointer w-6'
                                            >
                                                <img
                                                    src={Facebook}
                                                    alt='facebook'
                                                    className='w-full h-full align-middle'
                                                />
                                            </a>
                                        </li>
                                        <li className='pb-2.5 float-left mr-5 list-item list-none'>
                                            <a
                                                href='/#'
                                                className='block bg-transparent cursor-pointer w-6'
                                            >
                                                <img
                                                    src={Instagram}
                                                    alt='instagram'
                                                    className='w-full h-full align-middle'
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='hidden lg:flex-basis-100% lg:block mt-8 max-w-full relative w-full px-2.5'>
                                    <div className='inline-block text-left'>
                                        <div className='block mb-4'>
                                            <p className='text-xs text-zinc-200'>
                                                Mern - Fullstack example |
                                                Ecommerce management by
                                                <span className='relative inline-block ml-2'>
                                                    <a href='/#'>Me</a>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-0 overflow-hidden bg-zinc-800 lg:max-w-5/12 lg:flex-basis-41 relative w-full'>
                        <div className='h-full flex flex-wrap -mx-2.5'>
                            <div className='lg:max-w-full lg:flex-basis-100% md:flex-basis-50 md:max-w-1/2 relative w-full px-2.5'>
                                <div className='h-full flex items-center border-solid  xxs:border-r-0 md:border-r lg:border-r-0 xxs:border-b md:border-b-0 lg:border-b border-neutral-200 lg:py-8 lg:px-16 p-5 border-opacity-50'>
                                    <div className='w-full'>
                                        <h3 className='text-lg font-semibold mb-2.5 mt-0 tracking-tight text-zinc-200'>
                                            Find a store
                                        </h3>
                                        <form action='#' autoComplete='off'>
                                            <div className='mb-0 relative'>
                                                <div className='relative flex flex-wrap items-stretch w-full'>
                                                    <input
                                                        type='text'
                                                        className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-xs placeholder-gray-700 focus:outline-none leading-5 block px-5 py-4 w-1% bg-none border-white'
                                                        placeholder='Address'
                                                    />
                                                    <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'>
                                                        <div className='flex items-center leading-5'>
                                                            <button className='cursor-pointer relative z-2 h-auto inline-block m-0 p-0'>
                                                                <img
                                                                    src={Pin}
                                                                    alt='location'
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:max-w-full lg:flex-basis-100% md:flex-basis-50 md:max-w-1/2 relative w-full px-2.5'>
                                <div className='h-full flex items-center lg:py-8 lg:px-16 p-5'>
                                    <div className='w-full'>
                                        <h3 className='text-lg font-semibold mb-2.5 mt-0 tracking-tight text-zinc-200'>
                                            Don't miss our Newsletter
                                        </h3>
                                        <form action='#' autoComplete='off'>
                                            <div className='mb-0 relative'>
                                                <div className='relative flex flex-wrap items-stretch w-full'>
                                                    <input
                                                        type='text'
                                                        className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-xs placeholder-gray-700 focus:outline-none leading-5 block px-5 py-4 w-1% bg-none border-white'
                                                        placeholder='Email'
                                                    />
                                                    <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'>
                                                        <div className='flex items-center leading-5'>
                                                            <button className='cursor-pointer relative z-2 h-auto inline-block m-0 p-0'>
                                                                <img
                                                                    src={
                                                                        RightArrow
                                                                    }
                                                                    alt='newsletter'
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='xxs:max-w-full flex-basis-100% lg:hidden border-solid border-t border-neutral-200 border-opacity-50 relative w-full'>
                                <div className='py-5 px-6 block m-0 p-0'>
                                    <p className='text-xs text-zinc-200'>
                                        Mern - Fullstack example
                                    </p>

                                    <p className='text-xs text-zinc-200'>
                                        Ecommerce management by
                                        <span className='relative inline-block ml-2'>
                                            <a href='/#'>Me</a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
