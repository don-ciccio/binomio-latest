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
        <div className='flex lg:flex-row flex-col md:px-6 xxs:px-4 lg:pb-14 pt-8 relative z-1 text-left gap-4'>
            <div className='flex-basis-66 px-[35px] pt-[35px] p-10 rounded-md bg-gray-200 justify-center items-center'>
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
            <OrderSummary />
        </div>
    );
};

export default StepperSection;
