import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent, getMenuBySlug } from "@/app/lib/api";

import Breadcrumb from "@/app/components/ui/Breadcrumb";
import MenuListCard from "@/app/components/main/Cards/MenuListCard";
import { formatCurrency } from "@/app/lib/utils/utilFuncs";

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
                            <div className='grid-cols-1'>
                                <div className='flex'>
                                    <MenuListCard
                                        id={product._id}
                                        name={product.name}
                                        price={product.price}
                                        images={product.images}
                                        description={
                                            shorten(product.description, 25) +
                                            "..."
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
