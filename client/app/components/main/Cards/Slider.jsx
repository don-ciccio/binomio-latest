import ReactSlider from "react-slider";

const Slider = ({ onChange, value, max, min }) => {
    return (
        <ReactSlider
            className='xxs:hidden lg:block w-full relative max-w-md mx-auto'
            thumbClassName='cursor-pointer relative -top-2.5 h-5 w-10 rounded-2xl shadow-md border border-solid border-white border-t-9 border-b-9 border-l-15 border-r-15 bg-black hover:bg-zinc-800 focus:outline-none'
            trackClassName='h-px bg-gray-300 relative'
            onChange={onChange}
            value={value}
            max={max}
            min={min}
        />
    );
};
export default Slider;
