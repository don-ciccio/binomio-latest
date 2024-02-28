const Table = ({ name, seats, empty, id, selectTable }) => {
    const getRow1 = () => {
        let chairs = [];
        for (var i = 0; i < Math.ceil(seats / 2); i++) {
            chairs.push(
                <span
                    key={i}
                    className={
                        empty
                            ? "p-2 shadow-sm bg-zinc-800 border h-2 w-2 border-white  rounded-full"
                            : "p-2 shadow-sm bg-white border h-2 w-2 border-white rounded-full"
                    }
                ></span>
            );
        }
        return chairs;
    };
    const getRow2 = () => {
        let chairs2 = [];
        for (var i = 0; i < Math.ceil(seats / 2); i++) {
            chairs2.push(
                <span
                    key={i}
                    className={
                        empty
                            ? "p-2 shadow-sm bg-zinc-800 border h-2 w-2 border-white rounded-full"
                            : "p-2 shadow-sm bg-white border h-2 w-2 border-white rounded-full"
                    }
                ></span>
            );
        }
        return chairs2;
    };
    return (
        <div
            onClick={(_) => {
                empty
                    ? selectTable(name, id)
                    : console.log("Tried to select a full table");
            }}
            className='max-w-[150px] px-2 py-4 cursor-pointer shadow-sm bg-zinc-800 w-full rounded-lg'
        >
            <div className='flex flex-col gap-2'>
                <p className='text-center text-white'>{name}</p>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='flex gap-1'>{getRow1()}</div>
                    <div className='flex gap-1'>{getRow2()}</div>
                </div>
            </div>
        </div>
    );
};
export default Table;
