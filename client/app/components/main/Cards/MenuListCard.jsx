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
                "cursor-pointer w-full p-2 bg-white-200 hover:shadow-md hover:shadow-zinc-400/25 hover:bg-white from-gray-200 to-white/30 rounded-3xl flex flex-row mx-auto h-40"
            }
        >
            <div className={"group flex flex-basis-140 h-full"}>
                <div className='relative overflow-hidden'>
                    <img
                        src={images[0]}
                        alt={name}
                        className={`block rounded-3xl relative overflow-hidden py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-300 to-zinc-200  shadow-sm h-36`}
                    />
                </div>
            </div>

            <div className={"flex flex-auto h-full items-start"}>
                <div className='grow lg:mt-2'>
                    <div className='flex mb-4'>
                        <div className='inline-block text-left  text-xl font-semibold mr-1.5'>
                            {name}
                        </div>
                        <span
                            className={
                                "border-b-2 grow border-dashed border-zinc-400 inline-block mb-1.5 "
                            }
                        ></span>
                        <div className='inline-block ml-1.5 text-xl font-semibold justify-center mr-3'>
                            {formatCurrency(price)}
                        </div>
                    </div>
                    <p className='text-left font-light'>{description}</p>
                    <div className='flex flex-row gap-1 mt-4'>
                        {Allergeni.map((p, i) => {
                            let Tagname = availableIcons[p];
                            return (
                                <div
                                    key={i}
                                    className='bg-zinc-800 rounded-full w-8 h-8 pt-0.5'
                                >
                                    <Tagname />
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
