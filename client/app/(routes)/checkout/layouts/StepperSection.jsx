"use client";
import Stepper from "@/app/components/ui/Stepper";
import { useState } from "react";
import AccountDetails from "./AccountDetails";
import OrderSummary from "./OrderSummary";

const StepperSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div className='flex flex-row md:px-6 xxs:px-4 lg:pb-14 pt-8 relative z-1 text-left gap-4'>
            <div className='flex-basis-66 px-[35px] pt-[35px] p-10 rounded-md bg-gray-200 justify-center items-center'>
                <Stepper activeStep={activeStep} />
                {activeStep === 0 && (
                    <div className='mt-2'>
                        <AccountDetails setActiveStep={setActiveStep} />
                    </div>
                )}
            </div>
            <OrderSummary />
        </div>
    );
};

export default StepperSection;
