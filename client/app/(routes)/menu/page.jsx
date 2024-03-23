import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent, getMenuBySlug } from "@/app/lib/api";

import Breadcrumb from "@/app/components/ui/Breadcrumb";
import MenuListCard from "@/app/components/main/Cards/MenuListCard";
import PeanutIcon from "../../components/icons/allergens/PeanutIcon";
import WheatIcon from "@/app/components/icons/allergens/WheatIcon";
import SoyIcon from "@/app/components/icons/allergens/SoyIcon";
import EggsIcon from "@/app/components/icons/allergens/EggsIcon";
import MilkIcon from "@/app/components/icons/allergens/MilkIcon";
import WalnutIcon from "@/app/components/icons/allergens/WalnutIcon";
import SulfiteIcon from "@/app/components/icons/allergens/SulfiteIcon";
import FishIcon from "@/app/components/icons/allergens/FishIcon";

function shorten(str, maxLen) {
    if (str.length <= maxLen) return str;
    const trimmed_str = str.replace(/ {1,}/g, " ").trim();
    return trimmed_str.split(" ").splice(0, maxLen).join(" ");
}

export default async function Home() {
    const initialCategories = await getCategories("");
    const withParent = initialCategories.filter((p) =>
        p.hasOwnProperty("parent")
    );
    let result = [];
    withParent.forEach((arr) => result.push(arr._id));

    const initialContent = await getContent();
    const initialProducts = await getMenuBySlug(result);

    return (
        <div className='pb-24'>
            <Header
                categories={initialCategories}
                message={initialContent.data?.content.topbar}
                className={`origin-[center_center_0px] align-middle w-20 h-20 block rounded-full`}
            >
                <SVGLogo className='overflow-hidden align-middle h-full w-full' />
            </Header>
            <div id='maincontent' className='mt-36 flex-basis-1 relative z-2'>
                <div className='px-6 sm:px-14 relative z-1'>
                    <Breadcrumb />
                </div>

                <div className='xs:px-5 px-3'>
                    {initialProducts.products.map((product, index) => (
                        <div
                            key={index}
                            className='md:px-6 xxs:px-4 lg:pb-14 pt-8 relative z-1 text-center bg-gray-150 block'
                        >
                            <div className='flex flex-col mb-6 gap-2'>
                                <div className='flex flex-row gap-3 '>
                                    <div className='flex flex-wrap font-[500] text-xs leading-5 px-3 py-1  items-center m-1 gap-1'>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <PeanutIcon />
                                            <span className='font-light'>
                                                Arachidi
                                            </span>
                                        </div>

                                        <span className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <WheatIcon />
                                            <span className='font-light'>
                                                Cereali
                                            </span>
                                        </span>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <SoyIcon />
                                            <span className='font-light'>
                                                Soia
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <EggsIcon />
                                            <span className='font-light'>
                                                Uova
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <MilkIcon />
                                            <span className='font-light'>
                                                Latte
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <WalnutIcon />
                                            <span className='font-light'>
                                                Frutta a guscio
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <SulfiteIcon />
                                            <span className='font-light'>
                                                Solfiti
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap px-3 gap-1 py-2 m-1 justify-between items-center text-xs font-medium rounded-3xl cursor-pointer bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100'>
                                            <FishIcon />
                                            <span className='font-light'>
                                                Pesce
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid-cols-1'>
                                    <div className='flex'>
                                        <MenuListCard
                                            id={product._id}
                                            name={product.name}
                                            price={product.price}
                                            images={product.images}
                                            description={
                                                shorten(
                                                    product.description,
                                                    25
                                                ) + "..."
                                            }
                                            properties={product.properties}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
