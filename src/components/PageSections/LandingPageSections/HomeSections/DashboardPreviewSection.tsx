import React from 'react';
import Image from 'next/image';

const DashboardPreviewSection: React.FC<any> = ()=>{

    return(
        <section className='grid sm:grid-cols-2 py-4 px-5 items-center gap-3'>
            <div
                data-aos="zoom-in"
                data-aos-duration="5000"
                data-aos-delay="0"
                className='aos-init aos-animate'
            >
                <Image
                    src={'/images/pngs/dashboard-view.png'}
                    alt='how to imperium logistics'
                    width={799}
                    height={520}
                />
            </div>
            <p
                data-aos="fade-right"
                data-aos-duration="5000"
                data-aos-delay="0"
                className='aos-init aos-animate sm:text-[45px] text-3xl sm:text-start text-center font-semibold tracking-wide leading-[55px]'
            >
                Easy to use Dashboard, register packages and create tracking IDs
            </p>
        </section>
    )
}

export default DashboardPreviewSection;