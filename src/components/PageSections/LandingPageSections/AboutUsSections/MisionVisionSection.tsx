import Image from "next/image";
import React from "react";

const MissionVisionSection: React.FC<any> = ()=>{

    return(
        <section className="py-4 md:px-28 px-4">

            {/** Our Mission */}
            <div className="grid md:grid-cols-2 gap-10 py-8 border-t-2">
                <div 
                    data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="0"
                    className='flex flex-col items-end aos-init aos-animate space-y-2'
                >
                    <h1 className='text-3xl font-bold self-start'>
                        Our Mission
                    </h1>
                    <p className="text-sm">
                        Our mission is to empower financial institutions by providing seamless and 
                        data-driven logistics services that drive efficiency and boost competitiveness.
                    </p>
                   
                </div> 
                <div>
                    
                    <Image
                        data-aos="zoom-in"
                        data-aos-duration="1200"
                        data-aos-delay="0"
                        className='aos-init aos-animate'
                        src={'/images/pngs/mission-img.png'}
                        alt="Imperium Logistics mission"
                        loading="lazy"
                        width={421}
                        height={500}
                    />
                   
                </div> 
            </div>

            {/** Our Vission */}
            <div className="grid md:grid-cols-2 gap-10 py-8">
                <div 
                    data-aos="fade-left"
                    data-aos-duration="1200"
                    data-aos-delay="0"
                    className='flex flex-col aos-init aos-animate space-y-2'
                >
                    <Image
                        data-aos="fade-up"
                        data-aos-duration="2000"
                        data-aos-delay="0"
                        className='aos-init aos-animate'
                        src={'/images/pngs/vision-img.png'}
                        alt="Imperium Logistics mission"
                        loading="lazy"
                        width={421}
                        height={500}
                    />
                    
                </div> 
                <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    data-aos-delay="0"
                    className='flex flex-col items-end aos-init aos-animate space-y-2'
                >
                    
                    <h1 className='text-3xl font-bold self-start'>
                        Our Vission
                    </h1>
                    <p className="text-sm">
                        Become the market leader in providing delivery services to financial 
                        institutions and ecommerce companies across Nigeria.
                    </p>
                   
                </div> 
            </div>
        </section>
    )
}

export default MissionVisionSection;