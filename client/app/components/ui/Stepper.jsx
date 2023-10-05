import Divider from "./Divider";
import { Fragment } from "react";
const steps = [
    { label: "Profilo", number: 1, component: <Divider /> },
    { label: "Consegna", number: 2, component: <Divider /> },
    { label: "Pagamento", number: 3 },
];

const Stepper = ({ activeStep }) => {
    return (
        <div className='p-4 w-full'>
            <div className='flex flex-row items-center'>
                {steps.map(({ label, number, component }) => (
                    <Fragment key={number}>
                        <div key={label} className='px-2'>
                            <span className='flex items-center'>
                                <span className='shrink-0 flex pr-2'>
                                    {activeStep <= number - 1 ? (
                                        <svg
                                            className={`${
                                                activeStep === number - 1
                                                    ? "text-orange-600"
                                                    : "text-zinc-300"
                                            } select-none w-6 h-6 shrink-0 fill-current text-2xl block`}
                                            focusable='false'
                                            aria-hidden='true'
                                            viewBox='0 0 24 24'
                                        >
                                            <circle
                                                cx='12'
                                                cy='12'
                                                r='12'
                                            ></circle>
                                            <text
                                                className='text-white text-xs'
                                                x='12'
                                                y='12'
                                                textAnchor='middle'
                                                dominantBaseline='central'
                                            >
                                                {number}
                                            </text>
                                        </svg>
                                    ) : (
                                        <svg
                                            className='text-orange-600 select-none w-6 h-6 shrink-0 fill-current text-2xl block'
                                            focusable='false'
                                            aria-hidden='true'
                                            viewBox='0 0 24 24'
                                            data-testid='CheckCircleIcon'
                                        >
                                            <path d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z'></path>
                                        </svg>
                                    )}
                                </span>
                                <span
                                    className={`${
                                        activeStep >= number - 1
                                            ? "text-zinc-600"
                                            : "text-zinc-400"
                                    } w-full text-[15px] font-light`}
                                >
                                    {label}
                                </span>
                            </span>
                        </div>

                        {component}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
