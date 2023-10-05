"use client";
import Stepper from "@/app/components/ui/Stepper";
import { useState } from "react";
import AccountDetails from "./AccountDetails";
import OrderSummary from "./OrderSummary";

const StepperSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div className='grid lg:grid-flow-col grid-flow-row gap-[40px] p-5 justify-center'>
            <div className='lg:w-[694px]  px-[35px] pt-[35px] p-10 rounded-md bg-gray-200 grid justify-center items-center'>
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
