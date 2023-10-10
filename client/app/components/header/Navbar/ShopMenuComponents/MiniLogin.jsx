"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuthStore } from "@/app/lib/store";
import useSession from "@/app/lib/hooks/useSession";
import { logOut } from "@/app/lib/api";
import RippleButton from "@/app/components/ui/Button";
import { useState } from "react";

const MiniLogin = () => {
    const { setAuthUser, authUser } = useAuthStore();
    const user = useSession();
    const store = useAuthStore();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const logoutHandler = () => {
        logOut();
        store.reset();
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const resp = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`,

                {
                    // http://localhost:3001/auth/google backend that will exchange the code
                    code,
                }
            );
            console.log(resp.data);
            setAuthUser(resp.data.user);
        },
        flow: "auth-code",
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
        <div className='px-5'>
            {!user ? (
                <div>
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
                                    width='w-[534px]'
                                    className='border border-r-0 rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% '
                                />
                                <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border border-l-0 whitespace-nowrap'></div>
                            </div>
                        </div>
                        <div className='py-[11px]'>
                            <p className='text-zinc-500 text-[15px] mb-2'>
                                Password
                            </p>
                            <div className='relative flex flex-wrap items-stretch w-full'>
                                <input
                                    placeholder='PASSWORD'
                                    type='password'
                                    name='password'
                                    value={loginData.password}
                                    onChange={(e) => onLoginChange(e)}
                                    width='w-[534px]'
                                    className='border border-r-0 rounded-r-none relative flex-auto mb-0 rounded-3xl h-12 text-sm focus:outline-none leading-5 block px-5 py-4 w-1% '
                                />
                                <div className='ml-0 flex bg-white rounded-l-none items-center px-5 rounded-3xl border border-l-0 whitespace-nowrap'></div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center my-3 gap-6'>
                            <p className='text-[#2D3748] text-[15px] cursor-pointer font-medium'>
                                Registrati
                            </p>

                            <button
                                type='submit'
                                label='Login'
                                className='h-11  text-[15px] items-center justify-center flex w-1/2 hover:bg-zinc-800/75 hover:text-white bg-zinc-800 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer  text-zinc-200'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={() => googleLogin()}
                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                        <div className=' p-2 rounded-full '>
                            <Icon icon='fa:google' />
                        </div>
                        <span className='ml-4'>Sign In with Google</span>
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-center'>
                    <img
                        className='w-20 h-20 mb-3 rounded-full shadow-lg'
                        src={authUser.avatar}
                        alt={authUser.name}
                    />
                    <h5 className='mb-1 text-xl font-semibold text-gray-900 dark:text-white'>
                        {authUser.name}
                    </h5>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {authUser.email}
                    </span>
                    <div className='flex mt-4 space-x-3 md:mt-6'>
                        <a
                            href='#'
                            className='inline-flex font-semibold items-center px-7 py-2 text-sm text-center text-zinc-200 bg-zinc-800 rounded-full hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
                        >
                            Profilo
                        </a>
                        <button
                            onClick={logoutHandler}
                            className='inline-flex items-center px-7 py-2 text-sm font-semibold text-center text-gray-900 bg-white border border-gray-300 rounded-full hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiniLogin;
