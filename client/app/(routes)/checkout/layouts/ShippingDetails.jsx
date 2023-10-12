import RippleButton from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import api from "@/app/lib/utils/axiosInterceptor";

const ShippingDetails = ({ setActiveStep }) => {
    const checkRadiusFn = async () => {
        try {
            let res;

            const shippingInfo = JSON.parse(
                localStorage.getItem("shipping-storage")
            );

            const checkRadius = {
                orderItems: cartItems,
                shippingInfo,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            res = await api.post("/api/checkRadius", checkRadius, config);

            if (res.error) {
                console.log(res.error.errMessage);
            }
        } catch (error) {
            console.log(error.response.data.errMessage);
        }
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
                    <p className='text-[#718096] text-[16px] mb-2'>Indirizzo</p>

                    <Input
                        name='address'
                        placeholder='Indirizzo'
                        width='w-full'
                    />
                </div>

                <div className='py-[11px] grid grid-flow-col gap-[40px]'>
                    <div>
                        <p className='text-[#718096] text-[16px] mb-2'>Città</p>

                        <Input
                            placeholder='Città'
                            name='city'
                            type='text'
                            width='w-[278px]'
                        />
                    </div>
                    <div>
                        <p className='text-[#718096] text-[16px] mb-2'>
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
            </div>

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
                    onClick={() => {
                        setActiveStep(2);
                    }}
                    label='Pagamento'
                    width='w-[200px]'
                />
            </div>
        </div>
    );
};

export default ShippingDetails;
