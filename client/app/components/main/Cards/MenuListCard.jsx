"use client";

import { formatCurrency, slugify } from "@/app/lib/utils/utilFuncs";
import { useRouter } from "next/navigation";
import PeanutIcon from "@/app/components/icons/allergens/PeanutIcon";
import WheatIcon from "@/app/components/icons/allergens/WheatIcon";
import SoyIcon from "@/app/components/icons/allergens/SoyIcon";
import EggsIcon from "@/app/components/icons/allergens/EggsIcon";
import MilkIcon from "@/app/components/icons/allergens/MilkIcon";
import WalnutIcon from "@/app/components/icons/allergens/WalnutIcon";
import SulfiteIcon from "@/app/components/icons/allergens/SulfiteIcon";
import FishIcon from "@/app/components/icons/allergens/FishIcon";

const MenuListCard = ({ name, price, images, id, description, properties }) => {
    const router = useRouter();
    const { Allergeni } = properties;

    const availableIcons = {
        uova: EggsIcon,
        "frutta a guscio": WalnutIcon,
        solfiti: SulfiteIcon,
        pesce: FishIcon,
        latte: MilkIcon,
        soia: SoyIcon,
        cereali: WheatIcon,
        arachidi: PeanutIcon,
    };

    const handleClickRoute = () => {
        router.push(`/prodotti/${slugify(name)}`);
    };
    return (
        <div
            onClick={handleClickRoute}
            className={
                "cursor-pointer w-full p-2 bg-white-200 from-gray-200 to-white/30 rounded-3xl flex flex-col md:flex-row mx-auto min-h-[10rem]"
            }
        >
            <div
                className={
                    "group flex w-full md:w-auto md:flex-basis-140 h-full"
                }
            >
                <div className='relative overflow-hidden w-full md:w-auto'>
                    <img
                        src={images[0]}
                        alt={name}
                        className={`block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200 shadow-sm w-full md:h-36 object-cover`}
                    />
                </div>
            </div>

            <div className={"flex flex-auto h-full items-start p-2 md:p-0"}>
                <div className='grow w-full'>
                    <div className='flex mb-4 flex-wrap'>
                        <div className='inline-block text-left text-xl font-semibold mr-1.5'>
                            {name}
                        </div>
                        <span
                            className={
                                "border-b-2 grow border-dashed border-zinc-400 inline-block mb-1.5"
                            }
                        ></span>
                        <div className='inline-block ml-1.5 text-xl font-semibold justify-center mr-3'>
                            {formatCurrency(price)}
                        </div>
                    </div>
                    <p className='text-left font-light'>{description}</p>
                    <div className='flex flex-row gap-1 mt-4'>
                        {Allergeni &&
                            Allergeni.length > 0 &&
                            Allergeni.map((p, i) => {
                                const Tagname = availableIcons[p];
                                return (
                                    <div
                                        key={i}
                                        className='group relative bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center'
                                    >
                                        <Tagname />
                                        <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 whitespace-nowrap'>
                                            {p}
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuListCard;

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
