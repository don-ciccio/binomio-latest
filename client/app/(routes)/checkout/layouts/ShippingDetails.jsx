import RippleButton from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { useCart } from "@/app/lib/hooks/useCart";
import { useAddressStore } from "@/app/lib/store";
import api from "@/app/lib/utils/axiosInterceptor";
import { useState } from "react";

const ShippingDetails = ({ setActiveStep }) => {
    const { cartData } = useCart();
    const completed = useAddressStore((state) => state.completed);

    const [verificationResult, setVerificationResult] = useState(null);

    const checkRadiusFn = async () => {
        try {
            let res;

            const shippingInfo = useAddressStore.getState().shippingInfo;
            const checkRadius = {
                orderItems: cartData,
                shippingInfo,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            if (completed) {
                res = await api.post("/api/checkRadius", checkRadius, config);
            }

            setVerificationResult(res.data.success);
            if (res.error) {
                console.log(res.error.errMessage);
            }
        } catch (error) {
            console.log(error.response.data.errMessage);
        }
    };

    const handleSubmit = () => {
        setActiveStep(2);
    };

    return (
        <div className='flex-auto grid items-center lg:px-[50px]'>
            <p className='font-medium text-[20px] mb-6'>Dettagli consegna</p>
            <div className='min-h-[364px]'>
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-[#2D3748] font-medium'>
                        Usa indirizzo salvato
                    </p>
                    <Input placeholder='via Roma 10' width='w-[65%]' />
                </div>

                <div className='py-[11px]'>
                    <p className='text-[#718096] text-[15px] mb-2'>Indirizzo</p>

                    <Input
                        name='address'
                        placeholder='Indirizzo'
                        width='w-full'
                    />
                </div>

                <div className='py-[11px] grid grid-flow-col gap-[40px] mb-5'>
                    <div>
                        <p className='text-[#718096] text-[15px] mb-2'>Città</p>

                        <Input
                            placeholder='Città'
                            name='city'
                            type='text'
                            width='w-[278px]'
                        />
                    </div>
                    <div>
                        <p className='text-[#718096] text-[15px] mb-2'>
                            Codice postale
                        </p>

                        <Input
                            placeholder='Cap'
                            name='postalCode'
                            type='text'
                            width='w-[212px]'
                        />
                    </div>
                </div>
                <div className='inline-flex'>
                    <button
                        disabled={!completed}
                        onClick={() => checkRadiusFn()}
                        className='disabled:opacity-25 disabled:cursor-not-allowed font-semibold items-center px-7 py-2 text-sm text-center text-zinc-200 bg-zinc-800 rounded-full hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
                    >
                        Verifica
                    </button>
                </div>
            </div>
            {verificationResult && <p>Component</p>}
            <div className=' border-b border-[#dfdfdf] pt-[50px]' />

            <div className='grid grid-flow-col gap-[50px]  justify-end items-center py-2'>
                <p
                    onClick={() => {
                        setActiveStep(0);
                    }}
                    className='text-[#2D3748] text-[16px] cursor-pointer font-medium'
                >
                    Annulla ordine
                </p>

                <RippleButton
                    onClick={handleSubmit}
                    label='Pagamento'
                    width='w-[200px]'
                />
            </div>
        </div>
    );
};

export default ShippingDetails;
