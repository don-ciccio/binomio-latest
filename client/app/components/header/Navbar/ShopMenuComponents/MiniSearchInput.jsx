import React, { Fragment } from "react";
import { animated, useSpring } from "@react-spring/web";

import SearchIcon from "@/app/components/icons/SearchIcon";

const MiniSearchInput = ({ onClick, state, show }) => {
    const defaultWidth = "160px";

    const expand = useSpring({
        width: state && show ? `340px` : defaultWidth,
        config: { duration: 80 },
    });

    return (
        <Fragment>
            <animated.div
                onClick={onClick}
                style={expand}
                className='w-full relative z-1 transition-width ease-in-out duration-300 focus:opacity-90'
            >
                <form>
                    <label htmlFor='search' className='hidden'>
                        <span>Search</span>
                    </label>
                    <div>
                        <input
                            name='Cerca'
                            autoComplete='off'
                            id='search'
                            type='text'
                            placeholder='Cerca'
                            className='pr-2.5 h-10 pl-4 text-sm leading-5 rounded-3xl bg-gray-200 bg-clip-padding block w-full border-0 placeholder-black focus:placeholder-transparent::placeholder focus:outline-none'
                        />
                        <button
                            className='w-8 h-10 absolute top-0 right-1 opacity-20'
                            disabled
                        >
                            <SearchIcon />
                        </button>
                    </div>
                </form>
            </animated.div>
        </Fragment>
    );
};

export default MiniSearchInput;
