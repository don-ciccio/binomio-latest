import { useCart } from "@/app/lib/hooks/useCart";
import { useCartStore } from "@/app/lib/store";
import { Icon } from "@iconify/react";
import { IvaTax, formatCurrency } from "@/app/lib/utils/utilFuncs";

const OrderSummary = () => {
    const { removeFromCart, updateQuantity } = useCartStore();
    const { cartData, totalPrice, isLoading } = useCart();

    return (
        <div className='flex-auto pt-[17px] pb-[25px] rounded-md bg-gray-200'>
            <div className='grid lg:justify-start justify-center items-center'>
                <p className='text-left font-medium text-[22px] pl-6 pt-4 pb-6'>
                    Riepilogo ordine
                </p>

                <div className='px-5 relative  mb-4 max-h-[380px] h-[380px] overflow-y-auto'>
                    <div>
                        <ul className='md:w-[100%] lg:w-[89%]'>
                            {cartData.map((item) => (
                                <li key={item.product} className='pb-5'>
                                    <div className='flex flex-row gap-1.5'>
                                        <div className='flex flex-basis-23 md:flex-basis-13 lg:flex-basis-25 xl:flex-basis-23 max-w-1/4 pr-2.5 h-full'>
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
                                        <div className='flex flex-basis-58 md:flex-basis-70 max-w-2/4 font-medium'>
                                            <div className='flex flex-col justify-between'>
                                                <div className='flex justify-start pt-2'>
                                                    {item.name}
                                                </div>
                                                <div className='flex font-light items-baseline'>
                                                    {formatCurrency(item.price)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-basis-16 items-center justify-center'>
                                            <button
                                                title='Elimina'
                                                type='button'
                                                onClick={() =>
                                                    removeFromCart(item.id)
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
                            ))}
                        </ul>
                    </div>
                    <div className=' border-b border-[#dfdfdf] ' />
                </div>

                <div className='pl-6 pr-7 relative mt-2 mb-4 flex items-baseline justify-between w-11/12'>
                    <div className='flex flex-col gap-2 w-full pt-8'>
                        <div className='flex justify-between'>
                            <span className='text-base'>Subtotale:</span>
                            <span className='text-base font-semibold'>
                                {formatCurrency(
                                    Number(
                                        parseFloat(totalPrice) -
                                            IvaTax(parseFloat(totalPrice), 10)
                                    ).toFixed(2)
                                )}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-base'>Tasse:</span>
                            <span className='text-base font-semibold'>
                                {formatCurrency(
                                    IvaTax(parseFloat(totalPrice), 10).toFixed(
                                        2
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='pl-6 pr-7 relative mt-2 mb-4 flex items-baseline justify-between w-11/12'>
                    <span className='text-base'>Totale carrello:</span>
                    <span className='text-base font-semibold'>
                        {formatCurrency(totalPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
