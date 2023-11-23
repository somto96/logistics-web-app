"use client"

import TestimonialCard from '@/components/TestimonialCard';
import Carousel, { ControlProps } from 'nuka-carousel';
import React from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TestimonialSection: React.FC<any> = ()=>{

    // State
    const [width, setWidth] = React.useState<number>(0)

    // Handlers
    const handleResize = () => setWidth(window.innerWidth)
    const renderCenterLeftControls = (props: ControlProps)=>{

        return(
            <button className='hidden lg:block ml-[-60px]'
                onClick={props.previousSlide}
            >
                <BsChevronLeft className="text-black" size={30} />
            </button>
        )
    }

    const renderCenterRightControls = (props: ControlProps)=>{

        return(
            <button className='hidden lg:block mr-[-180px]'
                onClick={props.nextSlide}
            >
                <BsChevronRight className="text-black" size={30} />
            </button>
        )
    }

    // Effect
    React.useEffect(()=>{
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])

    React.useEffect(()=>{
        if (width === 0) {
            setWidth(window.innerWidth)
        }
    },[width])

    return(
        <section className='p-9 mt-5 flex flex-col items-center justify-center w-full'>
            <h2
                data-aos="fade-down"
                data-aos-duration="5000"
                data-aos-delay="0"
                className='text-4xl text-center font-medium mb-5 aos-init aos-animate'
            >
                What our happy clients are saying
            </h2>

            <div className={`flex flex-col z-5 mb-[32px] self-center items-center ${width > 1210 ? 'max-w-[1210px]' : width > 769 ? 'max-w-[769px]' : 'max-w-[347px]'}`}>
                <Carousel
                    wrapAround
                    renderCenterLeftControls={renderCenterLeftControls}
                    renderCenterRightControls={renderCenterRightControls}
                    renderBottomCenterControls={()=>  null}
                    // defaultControlsConfig={{
                    //     // pagingDotsContainerClassName: 'bg-red-400',
                    //     pagingDotsClassName: 'mx-2'
                    // }}
                    style={{
                        maxWidth: width > 1210 ? 1140 : width > 769 ? 769 : 347,
                        width: '100%',
                        marginTop: '20px',
                      }}
                    slidesToShow={width > 1210 ? 3 : (width > 769) ? 2 : 1}
                    slidesToScroll={1}
                >
                    <div className='mx-2'>
                        <TestimonialCard/>
                    </div>
                    <div className='mx-2'>
                        <TestimonialCard/>
                    </div>
                    <div className='mx-2'>
                        <TestimonialCard/>
                    </div>
                </Carousel>
            </div>
        </section>
    )
}

export default TestimonialSection;