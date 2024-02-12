import { Flex, Icon, Card, TextInput } from "@tremor/react";
import {
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { useState } from "react";

import { useGetCategories } from "@/store/react-query/hooks/useQueries";
import CategoryTable from "@/components/categoryTable/CategoryTable";

import { Link } from "react-router-dom";

const Categories = () => {
    const [search, setSearch] = useState("");
    const { data: categories, isLoading } = useGetCategories({ search });

    return (
        <div className='h-full w-full bg-gray-50 px-3 xl:px-20 py-12'>
            <Flex
                className='w-full justify-between'
                justifyContent='start'
                alignItems='center'
            >
                <div className='flex items-center'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                        Categorie
                    </h3>
                    <Icon
                        icon={InformationCircleIcon}
                        variant='simple'
                        tooltip='Mostra categorie'
                    />
                </div>

                <div>
                    <Link
                        className='hidden p-2 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white sm:block'
                        to={"add"}
                    >
                        Aggiungi categoria
                    </Link>
                </div>
            </Flex>
            <Card shadow={"false"} className='mt-6'>
                <div className='flex flex-col md:flex-row md:space-x-2 gap-2'>
                    <TextInput
                        className='max-w-xs'
                        onValueChange={(search) => setSearch(search)}
                        icon={MagnifyingGlassIcon}
                        placeholder='Cerca...'
                    />
                </div>

                <div>
                    <CategoryTable
                        isLoading={isLoading}
                        categories={categories}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Categories;
