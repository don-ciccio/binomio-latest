"use client";
import Stepper from "@/app/components/ui/Stepper";
import { useState } from "react";
import AccountDetails from "./AccountDetails";
import OrderSummary from "./OrderSummary";
import ShippingDetails from "./ShippingDetails";
import useSession from "@/app/lib/hooks/useSession";

const StepperSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const user = useSession();

    return (
        <div className='flex flex-col lg:flex-row md:px-6 xxs:px-4 lg:pb-14 pt-8  gap-4'>
            <div className='flex-basis-66  pt-[35px] px-2 md:px-8 rounded-md bg-gray-200 justify-center items-center'>
                <Stepper activeStep={activeStep} />
                {activeStep === 0 && (
                    <div className='mt-2'>
                        <AccountDetails setActiveStep={setActiveStep} />
                    </div>
                )}
                {activeStep === 1 && (
                    <div className='mt-2'>
                        <ShippingDetails setActiveStep={setActiveStep} />
                    </div>
                )}
            </div>
            <div className='flex-basis-33'>
                <OrderSummary />
            </div>
        </div>
    );
};

export default StepperSection;
