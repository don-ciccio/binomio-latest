import { create } from "zustand";
import { persist } from "zustand/middleware";

const validateInfos = (shippingInfo) => {
    if (
        shippingInfo.address.length === 0 ||
        shippingInfo.city.length === 0 ||
        shippingInfo.postalCode.length === 0
    )
        return false;
    return true;
};

export const useAddressStore = create(
    persist(
        (set) => ({
            shippingInfo: {
                address: "",
                city: "",
                postalCode: "",
            },
            completed: false,
            setShippingInfo: (field, value) =>
                set((state) => {
                    let newInfos = {
                        ...state.shippingInfo,
                        [field]: value,
                    };
                    return {
                        ...state,
                        completed: validateInfos(newInfos),
                        shippingInfo: newInfos,
                    };
                }),
        }),
        {
            name: "shipping-storage",
        }
    )
);
