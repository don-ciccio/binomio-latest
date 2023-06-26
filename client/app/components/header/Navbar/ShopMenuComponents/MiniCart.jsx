import RippleButton from "@/app/components/ui/Button";
import { useCart } from "@/app/lib/hooks/useCart";
import { useCartStore } from "@/app/lib/store";
import { Icon } from "@iconify/react";

const MiniCart = () => {
    const { cart, removeFromCart, updateQuantity } = useCartStore();
    const { cartData, totalPrice, isLoading } = useCart();

    return (
        <>
            <div className='px-5'>
                <h4 className='uppercase mb-5'>Carrello</h4>
            </div>
            <div className='relative'>
                {cart.length < 1 ? (
                    <div className='px-5 relative overflow-hidden'>
                        <div className='h-full'>
                            <p>Il carrello è vuoto.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='pr-5 pl-3 relative  mb-4 max-h-80 overflow-y-auto'>
                            <ul>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    cartData.map((item) => (
                                        <li key={item.id} className='pb-5'>
                                            <div className='flex flex-row gap-1.5'>
                                                <div className='flex flex-basis-25 max-w-1/4 px-2.5 h-full'>
                                                    <div className='flex flex-col gap-1'>
                                                        <div className='flex'>
                                                            <img
                                                                src={item.image}
                                                                className='rounded-full w-full p-1.5 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200'
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div className='flex flex-grow w-full bg-zinc-300 rounded-xl'>
                                                            <div className='flex justify-center items-center w-1/3'>
                                                                <button
                                                                    type='button'
                                                                    title='Reduce Quantity'
                                                                    onClick={() =>
                                                                        updateQuantity(
                                                                            item.id,
                                                                            "decrease"
                                                                        )
                                                                    }
                                                                    className={` rounded-l-xl leading-none ${
                                                                        item.quantity <
                                                                        2
                                                                            ? "cursor-not-allowed  opacity-75"
                                                                            : ""
                                                                    }`}
                                                                    tabIndex={
                                                                        item.quantity <
                                                                        2
                                                                            ? -1
                                                                            : 0
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                            </div>

                                                            <span className=' inline-block w-1/3 text-center'>
                                                                {item.quantity}
                                                            </span>
                                                            <div className='flex justify-center items-center w-1/3'>
                                                                <button
                                                                    type='button'
                                                                    title='Reduce Quantity'
                                                                    onClick={() =>
                                                                        updateQuantity(
                                                                            item.id,
                                                                            "increase"
                                                                        )
                                                                    }
                                                                    className='rounded-r-xl  leading-none'
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-basis-58 max-w-2/4 font-medium'>
                                                    <div className='flex flex-col justify-between'>
                                                        <div className='flex justify-start pt-2'>
                                                            {item.name}
                                                        </div>
                                                        <div className='flex font-light items-baseline'>
                                                            €{item.price}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-basis-16 items-center justify-center'>
                                                    <button
                                                        title='Elimina'
                                                        type='button'
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            className='w-6 h-6 cursor-pointer'
                                                            icon='ion:trash-sharp'
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className='pl-5 pr-6 relative mt-2 mb-4 flex items-baseline justify-between'>
                            <span className='text-base'>Totale carrello:</span>
                            <span className='text-base font-semibold'>
                                €{totalPrice}
                            </span>
                        </div>
                        <div className='flex justify-between gap-x-2 text-base px-5'>
                            <button
                                className={`h-11 items-center justify-center flex w-full font-light bg-zinc-800 relative overflow-hidden text-center rounded-full px-5 py-4 cursor-pointer  text-zinc-200`}
                            >
                                Checkout
                            </button>
                            <button
                                className={`h-11 items-center justify-center flex w-full font-light  bg-zinc-800 relative overflow-hidden text-center rounded-full px-4 py-2 cursor-pointer  text-zinc-200`}
                            >
                                Carrello
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default MiniCart;
