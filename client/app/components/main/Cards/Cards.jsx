import { a } from "@react-spring/web";
import SVGLogo from "@/app/components/icons/SVGLogo";

const Cards = ({ style, items }) => {
    return (
        <>
            {items.map(({ images, name, description }, i) => (
                <a.div
                    style={style}
                    key={i}
                    className='md:flex-basis-525 xxs:flex-basis-89 lg:h-60 xxs:h-52'
                >
                    <div className='h-full p-2.5'>
                        <div className='h-full rounded-2xl shadow-sm hover:shadow-md bg-white overflow-hidden'>
                            <div className='block h-full rounded-2xl'>
                                <div className='flex h-full'>
                                    <div className='xxs:flex-basis-100 lg:flex-basis-140'>
                                        <img
                                            src={images[0]}
                                            alt='logo'
                                            className='w-36 h-full object-cover align-middle'
                                        />
                                    </div>
                                    <div className='py-2.5 px-5 w-full h-full block'>
                                        <div className='text-right'>
                                            <span className='inline-block'>
                                                <SVGLogo className='block h-10 w-10' />
                                            </span>
                                        </div>
                                        <h4 className='xxs:text-sm lg:text-base font-bold leading-none mb-2.5'>
                                            {name}
                                        </h4>
                                        <p className='text-xs mb-1'>
                                            {description}
                                        </p>
                                        <a
                                            href='/#'
                                            className='xxs:hidden mt-5 lg:inline-block font-semibold border-b-2	border-black border-solid text-sm tracking-tight pb-0'
                                        >
                                            Scopri
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a.div>
            ))}
        </>
    );
};

export default Cards;
