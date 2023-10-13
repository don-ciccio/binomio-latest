import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "@/app/lib/api";
import { useCartStore } from "@/app/lib/store";

export const useCart = () => {
    // Client Global State
    const { cart } = useCartStore();

    // Server State
    const cartIds = cart.map((item) => item.id);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["cart", { cartIds }],
        queryFn: () => getProductsByIds(cartIds),
        keepPreviousData: true,
    });

    if (cart.length < 1)
        return { cartData: [], totalPrice: "0", totalQuantity: 0 };

    if (isLoading || isError)
        return {
            cartData: [],
            totalPrice: "0",
            totalQuantity: 0,
            isLoading,
            isError,
        };

    // Quantity Mapping
    const qtyMap = new Map();
    cart.forEach((item) => {
        qtyMap.set(item.id, item.quantity);
    });

    // Timestamp Mapping
    const timestampMap = new Map();
    cart.forEach((item) => {
        timestampMap.set(item.id, item.timestamp || 1);
    });

    const cartData = data.data?.products
        .map((item) => {
            return {
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.images[0],
                store: item.store,
                quantity: qtyMap.get(item._id) || 1,
                timestamp: timestampMap.get(item._id) || 1,
            };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

    let totalPrice = "0";
    let totalQuantity = 0;

    if (cartData) {
        totalPrice = cartData
            .reduce(
                (accumulator, currentItem) =>
                    accumulator + currentItem.price * currentItem.quantity,
                0
            )
            .toLocaleString();
    }

    totalQuantity = cart.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
    );

    return { cartData, totalPrice, totalQuantity, isLoading, isError };
};
