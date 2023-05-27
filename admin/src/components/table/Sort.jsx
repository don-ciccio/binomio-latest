import PropTypes from "prop-types";

const Sort = ({ status, setStatus }) => {
    return (
        <div className='flex gap-2 md:flex-row flex-col p-2 md:p-0 font-medium'>
            <div className='flex flex-row gap-2'>
                <input
                    type={"radio"}
                    label={`All`}
                    name='status'
                    value={"All"}
                    checked={status === "All"}
                    onChange={({ currentTarget: input }) =>
                        setStatus(input.value)
                    }
                />
                <label>Tutti</label>
            </div>
            <div className='flex flex-row gap-2'>
                <input
                    type={"radio"}
                    label={`Attivo`}
                    name='status'
                    checked={status === "Attivo"}
                    value={"Attivo"}
                    onChange={({ currentTarget: input }) =>
                        setStatus(input.value)
                    }
                />
                <label>Attivo</label>
            </div>
            <div className='flex flex-row gap-2'>
                <input
                    type={"radio"}
                    label={`Bozza`}
                    name='status'
                    checked={status === "Bozza"}
                    value={"Bozza"}
                    onChange={({ currentTarget: input }) =>
                        setStatus(input.value)
                    }
                />
                <label>Bozza</label>
            </div>
        </div>
    );
};

export default Sort;

Sort.propTypes = {
    status: PropTypes.string,
    setStatus: PropTypes.func,
};
