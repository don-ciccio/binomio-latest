import PropTypes from "prop-types";

const View = ({ data }) => {
    return (
        <div className='flex flex-col gap-10'>
            <div className='mt-8 w-full'>
                <label className='mb-3 block text-black dark:text-white text-lg font-medium'>
                    Nome
                </label>
                {data.name}
            </div>
            <div className='w-full'>
                <label className='mb-3 block text-black dark:text-white text-lg font-medium'>
                    Descrizione
                </label>
                {data.description}
            </div>
            <div className='w-full'>
                <label className='mb-3 block text-black dark:text-white text-lg font-medium'>
                    Prezzo
                </label>
                {data.price}€
            </div>
            <div className='w-full'>
                <label className='mb-3 block text-black dark:text-white text-lg font-medium'>
                    Categoria
                </label>
                {data.category.name}
            </div>
        </div>
    );
};

export default View;

View.propTypes = {
    data: PropTypes.object,
};
