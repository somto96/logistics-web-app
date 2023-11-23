import Image from 'next/image';
import React from 'react';

const PackageDeliverySection: React.FC<any> = () =>{

    return(
        <section className='p-8 aos-init aos-animate'>
            <h2
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="0"
                className='text-2xl text-center font-medium mb-8'
            >
                Package Delivery & Tracking
            </h2>
            <div className='flex justify-center'>
                <div className='aos-init aos-animate'
                    data-aos="fade-down"
                    data-aos-duration="1500"
                    data-aos-delay="0"
                >
                    <Image
                        src={'/images/pngs/track-guide.png'}
                        alt='how to imperium logistics'
                        width={866}
                        height={1065}
                    />
                </div>
            </div>
        </section>
    )
}

export default PackageDeliverySection;