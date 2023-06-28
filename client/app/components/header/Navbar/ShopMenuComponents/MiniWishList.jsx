import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "@/app/lib/api";
import { useCartStore, useToastStore, useWishlistStore } from "@/app/lib/store";
import { Icon } from "@iconify/react";
import { useMounted } from "@/app/lib/hooks/useMounted";

const fetchProducts = async (wishlistIds, wishlist) => {
    const response = await getProductsByIds(wishlistIds);
    const data = response.data;

    // Timestamp Mapping
    const timestampMap = new Map();
    wishlist.forEach((item) => {
        timestampMap.set(item.id, item.timestamp || 1);
    });

    const withlist = data?.products
        .map((item) => {
            return {
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.images[0],
                timestamp: timestampMap.get(item._id) || 1,
            };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

    return withlist;
};

const MiniWishList = () => {
    const { wishlist, toggleWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();
    const { setToast } = useToastStore();
    const wishlistIds = wishlist.map((item) => item.id);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["wishlist", { wishlistIds }],
        queryFn: () => fetchProducts(wishlistIds, wishlist),
        keepPreviousData: true,
    });

    const mounted = useMounted();

    if (isError) return null;

    const handleAddToCart = (id) => {
        addToCart({ id, quantity: 1 });
        setToast({
            status: "successo",
            message: "Il prodotto è stato aggiunto al carrello",
        });
        toggleWishlist(id);
    };

    const removeFromWishlist = (id) => {
        toggleWishlist(id);
        setToast({
            status: "successo",
            message: "Il prodotto è stato rimosso dalla wishlist",
        });
    };

    return (
        <div className='block'>
            <div className='px-5'>
                <h4 className='uppercase mb-4'>WishList</h4>
            </div>
            <div className='relative'>
                {!mounted || wishlist.length < 1 ? (
                    <div className='px-5 relative overflow-hidden'>
                        <div className='h-full'>
                            {mounted ? "La lista è vuota." : "Loading..."}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='pr-5 pl-3 relative  mb-4 max-h-84 overflow-y-auto'>
                            <ul>
                                {!isLoading &&
                                    data.map((item) => (
                                        <li key={item.id} className='pb-5'>
                                            <div className='flex flex-row gap-1.5'>
                                                <div className='flex flex-basis-25 max-w-1/4 px-2.5 justify-center items-center'>
                                                    <img
                                                        src={item.image}
                                                        className='rounded-full w-full p-1.5 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200'
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div className='flex flex-basis-50  font-medium'>
                                                    <div className='flex flex-col justify-between'>
                                                        <div className='flex justify-start pt-2'>
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-basis-16 items-center justify-center gap-2'>
                                                    <div className='flex'>
                                                        <button
                                                            title='Elimina'
                                                            type='button'
                                                            onClick={() =>
                                                                removeFromWishlist(
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

                                                    <div className='flex relative mt-0.5'>
                                                        <button
                                                            title='Aggiungi al carrello'
                                                            type='button'
                                                            onClick={() =>
                                                                handleAddToCart(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <Icon
                                                                className='w-5 h-5 cursor-pointer'
                                                                icon='el:shopping-cart'
                                                            />
                                                            <span className='absolute -right-3 -top-2 w-4 h-4'>
                                                                <Icon
                                                                    className='w-2 h-2 cursor-pointer'
                                                                    icon='el:plus'
                                                                />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MiniWishList;
