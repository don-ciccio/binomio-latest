import { useRef } from "react";
import useRipple from "@/app/lib/hooks/useRipple";

const RippleButton = ({ label, onClick, disabled }) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={` min-w-200 inline-block font-medium bg-zinc-800 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer text-zinc-200 disabled:opacity-25 disabled:cursor-not-allowed`}
            ref={ref}
        >
            {ripples}
            {label}
        </button>
    );
};

export default RippleButton;
