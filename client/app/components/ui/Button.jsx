import { useRef } from "react";
import useRipple from "@/app/lib/hooks/useRipple";

const RippleButton = ({ label, onClick }) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            onClick={onClick}
            className={` min-w-200 inline-block font-semibold bg-zinc-800 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer text-sm text-zinc-200`}
            ref={ref}
        >
            {ripples}
            {label}
        </button>
    );
};

export default RippleButton;
