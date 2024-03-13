import { useRef } from "react";
import useRipple from "@/app/lib/hooks/useRipple";
import { Icon } from "@iconify/react";

const RippleButton = ({ label, onClick, disabled, icon }) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={` min-w-100 flex items-center justify-center gap-2 font-medium bg-zinc-800 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer text-zinc-200 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-zinc-800/75 hover:text-white`}
            ref={ref}
        >
            <Icon className='w-5 h-5' icon={icon} />
            {ripples}
            {label}
        </button>
    );
};

export default RippleButton;
