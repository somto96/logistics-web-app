import Image from 'next/image';
import React from 'react';

const TestimonialCard: React.FC<any> = ()=>{

    return(
        <div 
            data-aos='fade-up'
            data-aos-duration='6000'
            data-aos-delay='0'
            className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-3 md:p-5 min-w-[304px] minh-[277px] aos-init aos-animate"
        >
           <div className='flex gap-3 items-start border-b p-2'>
                <Image
                    src={'/images/svgs/quotes-icon.svg'}
                    alt='imperium logistics testimonials'
                    width={34}
                    height={26}
                />
                <p className='font-light text-[15px]'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a 
                    type specimen book.
                </p>
           </div>
           <div className='py-3'>
                <div className='flex gap-3 items-center'>
                    <Image 
                        className="inline-block rounded-full" 
                        src="/images/pngs/avatar-testimonial.png" 
                        alt="Image Description"
                        width={62}
                        height={62}
                    />
                    <div className='space-y-1'>
                        <p className='font-bold text-sm'>
                            John Doe
                        </p>
                        <p className='text-[10px]'>
                            CEO/Managing Director
                        </p>
                        <p className='text-xs'>
                            Mosdee Technology
                        </p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default TestimonialCard;