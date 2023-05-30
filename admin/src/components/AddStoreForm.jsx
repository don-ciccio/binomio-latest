import { useState } from "react";

const AddStoreForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [shopAddress, setShopAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
    });
    const [deliveryRadius, setDeliveryRadius] = useState("");

    const createStore = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={createStore}>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-col gap-5'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Dettagli della Sede
                            </h3>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Nome
                                </label>
                                <input
                                    type='text'
                                    placeholder='Nome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            <div>
                                <label className='mb-3 block text-black dark:text-white'>
                                    Indirizzo
                                </label>
                                <input
                                    type='text'
                                    placeholder='Indirizzo'
                                    value={shopAddress.address}
                                    onChange={(e) =>
                                        setShopAddress({
                                            ...shopAddress,
                                            address: e.target.value,
                                        })
                                    }
                                    className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                />
                            </div>
                            <div>
                                <div className='flex flex-row gap-4'>
                                    <input
                                        type='text'
                                        placeholder='Città'
                                        value={shopAddress.city}
                                        onChange={(e) =>
                                            setShopAddress({
                                                ...shopAddress,
                                                city: e.target.value,
                                            })
                                        }
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Codice Postale'
                                        value={shopAddress.postalCode}
                                        onChange={(e) =>
                                            setShopAddress({
                                                ...shopAddress,
                                                postalCode: e.target.value,
                                            })
                                        }
                                        className='w-1/2 rounded-lg border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddStoreForm;
