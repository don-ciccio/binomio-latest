import RippleButton from "@/app/components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/app/lib/store";
import useSession from "@/app/lib/hooks/useSession";

function AccountDetails({ setActiveStep }) {
    const { setAuthUser, authUser } = useAuthStore();
    const user = useSession();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const onLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginData((preData) => ({
            ...preData,
            [name]: value,
        }));
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "same-origin",
        };
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
            loginData,
            config
        );

        setAuthUser(data.user);
    };

    return (
        <div className='flex-auto lg:px-[50px]'>
            <p className='font-medium text-[20px] mb-6'>Profilo</p>
            {!user ? (
                <form onSubmit={loginSubmit}>
                    <div className='py-[11px]'>
                        <p className='text-zinc-500 text-[15px] mb-2'>
                            Indirizzo email
                        </p>

                        <div className='relative flex flex-wrap items-stretch w-full'>
                            <input
                                placeholder='INDIRIZZO EMAIL'
                                type='text'
                                name='email'
                                value={loginData.email}
                                onChange={(e) => onLoginChange(e)}
                                className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% !bg-white border-white'
                            />
                            <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'></div>
                        </div>
                    </div>
                    <div className='py-[11px]'>
                        <p className='text-[#718096] text-[15px] mb-2'>
                            Password
                        </p>
                        <div className='relative flex flex-wrap items-stretch w-full'>
                            <input
                                placeholder='PASSWORD'
                                type='password'
                                name='password'
                                value={loginData.password}
                                onChange={(e) => onLoginChange(e)}
                                className='border rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1%   border-white'
                            />
                            <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border-0 whitespace-nowrap'></div>
                        </div>
                    </div>
                    <div className='grid grid-flow-col gap-[50px] justify-end items-center mt-3'>
                        <p className='text-[#2D3748] text-[16px] cursor-pointer font-medium'>
                            Registrati
                        </p>

                        <RippleButton type='submit' label='Login' />
                    </div>
                </form>
            ) : (
                setActiveStep(1)
            )}

            <div className=' border-b border-zinc-300 pt-[100px]' />

            <div className='grid grid-flow-col gap-[50px]  justify-end items-center py-2'>
                <p className='text-[#2D3748] text-[16px] cursor-pointer font-medium'>
                    Annulla ordine
                </p>

                <RippleButton
                    onClick={() => {
                        setActiveStep(1);
                    }}
                    disabled={!user}
                    label='Dettagli consegna'
                    width='w-[200px]'
                />
            </div>
        </div>
    );
}

export default AccountDetails;
