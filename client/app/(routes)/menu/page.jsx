import Header from "@/app/components/header/Header";
import SVGLogo from "@/app/components/icons/SVGLogo";
import { getCategories, getContent, getMenuBySlug } from "@/app/lib/api";
import Link from "next/link";

import Breadcrumb from "@/app/components/ui/Breadcrumb";
import MenuListCard from "@/app/components/main/Cards/MenuListCard";

function shorten(str, maxLen) {
    if (str.length <= maxLen) return str;
    const trimmed_str = str.replace(/ {1,}/g, " ").trim();
    return trimmed_str.split(" ").splice(0, maxLen).join(" ");
}

export default async function Home() {
    const initialCategories = await getCategories("");

    const withParent = initialCategories.admin
        .filter((p) => p.hasOwnProperty("parent"))
        .sort((a, b) => a.idx - b.idx);

    const menuCategories = initialCategories.admin.filter(
        (cat) => cat.name.toLowerCase() === "menu"
    );

    let result = [];
    if (menuCategories.length > 0) {
        result.push(menuCategories[0]._id);
        withParent.forEach((cat) => {
            if (cat.parent?._id === menuCategories[0]._id) {
                result.push(cat._id);
            }
        });
    }

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

                <section className='px-4 py-10 sm:px-6 lg:px-8'>
                    {withParent
                        .filter((cat) => result.includes(cat._id))
                        .map((category) => (
                            <div key={category._id}>
                                <div className='h-fit flex flex-col mb-6 gap-2'>
                                    <ul className='sticky top-[144px] z-30 mb-8 flex flex-wrap justify-start gap-2 py-2'>
                                        <li className='flex gap-2'>
                                            <Link
                                                href={`/categorie/${category.slug}`}
                                                className='inline-flex items-center gap-2 rounded-2xl px-4 py-1 text-sm uppercase transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700'
                                            >
                                                <span className='font-bold'>
                                                    {category.name}
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>

                                    {category.description && (
                                        <div className='mb-12'>
                                            <p className='text-lg text-gray-600 max-w-2xl'>
                                                {category.description}
                                            </p>
                                        </div>
                                    )}
                                    <div className='grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-6'>
                                        {initialProducts.products
                                            .filter(
                                                (product) =>
                                                    product.category._id ===
                                                    category._id
                                            )
                                            .map((product, index) => (
                                                <div
                                                    key={index}
                                                    className='flex'
                                                >
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
                                                        properties={
                                                            product.properties
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                </section>
            </div>
        </div>
    );
}
