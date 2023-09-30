import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const MiniLogin = () => {
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const tokens = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`,

                {
                    // http://localhost:3001/auth/google backend that will exchange the code
                    code,
                }
            );

            console.log(tokens);
        },
        flow: "auth-code",
    });
    return (
        <div className='px-5'>
            <button
                onClick={() => googleLogin()}
                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
            >
                <div className=' p-2 rounded-full '>
                    <i className='fab fa-google ' />
                </div>
                <span className='ml-4'>Sign In with Google</span>
            </button>
        </div>
    );
};

export default MiniLogin;
