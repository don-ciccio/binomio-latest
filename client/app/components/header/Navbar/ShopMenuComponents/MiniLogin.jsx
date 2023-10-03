"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuthStore } from "@/app/lib/store";
import { useEffect } from "react";
const MiniLogin = () => {
    const { setAuthUser, authUser, setAuthentication, authenticated } =
        useAuthStore();

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
            setAuthentication(true);
        },
        flow: "auth-code",
    });

    const fetchAuth = async () => {
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google/refresh`
        );
        setAuthUser(data.user);
        setAuthentication(true);
    };

    useEffect(() => {
        if (!authenticated) {
            fetchAuth();
        }
    }, []);

    return (
        <div className='px-5'>
            {!authUser ? (
                <button
                    onClick={() => googleLogin()}
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                >
                    <div className=' p-2 rounded-full '>
                        <Icon icon='fa:google' />
                    </div>
                    <span className='ml-4'>Sign In with Google</span>
                </button>
            ) : (
                <div className='flex flex-col items-center'>
                    <img
                        className='w-20 h-20 mb-3 rounded-full shadow-lg'
                        src={authUser.image}
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
                            className='inline-flex font-semibold items-center px-5 py-2 text-sm text-center text-white bg-zinc-700 rounded-full hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800'
                        >
                            Ordini
                        </a>
                        <a
                            href='#'
                            className='inline-flex items-center px-5 py-2 text-sm font-semibold text-center text-gray-900 bg-white border border-gray-300 rounded-full hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
                        >
                            Profilo
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiniLogin;
