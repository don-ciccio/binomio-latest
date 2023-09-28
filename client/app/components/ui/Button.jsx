import { useRef } from "react";
import useRipple from "@/app/lib/hooks/useRipple";

const RippleButton = ({ label }) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            className={` md:min-w-225 inline-block font-semibold bg-zinc-800 relative overflow-hidden text-center rounded-full md:px-5 py-4 px-3 cursor-pointer text-xs md:text-sm text-zinc-200`}
            ref={ref}
        >
            {ripples}
            {label}
        </button>
    );
};

export default RippleButton;
