import RippleButton from "@/app/components/ui/Button";

function AccountDetails({ setActiveStep }) {
    return (
        <div className='lg:w-[694px] grid justify-start items-center lg:px-[50px]'>
            <p className='font-medium text-[20px]'>Profilo</p>

            <div className='py-[11px]'>
                <p className='text-zinc-500 text-[15px] mb-2'>
                    Indirizzo email
                </p>

                <div className='relative flex flex-wrap items-stretch w-full'>
                    <input
                        placeholder='INDIRIZZO EMAIL'
                        type='text'
                        width='w-[534px]'
                        className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% !bg-white border-white'
                    />
                    <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'></div>
                </div>
            </div>
            <div className='py-[11px]'>
                <p className='text-zinc-500 text-[15px] mb-2'>Password</p>
                <div className='relative flex flex-wrap items-stretch w-full'>
                    <input
                        placeholder='PASSWORD'
                        type='password'
                        width='w-[534px]'
                        className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1%   border-white'
                    />
                    <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'></div>
                </div>
            </div>

            <div className='grid grid-flow-col gap-[50px] w-[534px] justify-end items-center mt-3'>
                <p className='text-[#2D3748] text-[16px] cursor-pointer font-medium'>
                    Registrati
                </p>

                <RippleButton label='Login' width='w-[150px]' />
            </div>

            <div className=' border-b border-zinc-300 pt-[100px]' />

            <div className='grid grid-flow-col gap-[50px] w-[534px] justify-end items-center py-2'>
                <p className='text-[#2D3748] text-[16px] cursor-pointer font-medium'>
                    Annulla ordine
                </p>

                <RippleButton
                    onClick={() => {
                        setActiveStep(1);
                    }}
                    label='Dettagli consegna'
                    width='w-[200px]'
                />
            </div>
        </div>
    );
}

export default AccountDetails;
