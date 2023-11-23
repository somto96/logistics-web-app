import Image from "next/image";
import React from "react";

const AboutUsFirstSection: React.FC<any> = ()=>{

    return(
        <section className="md:px-20 px-4 py-8">
            <div className='grid md:grid-cols-2 py-3 lg:px-10 md:px-3 mb-12'>
                <div 
                    data-aos="fade-left"
                    data-aos-duration="500"
                    data-aos-delay="0"
                    className='space-y-2 p-3 flex justify-end aos-init aos-animate'
                >
                    <p className='text-3xl font-medium'>
                        We enhance smooth operation of your businesses by bringing delivery 
                        system closer to you
                    </p>
                   
                </div> 
                <div 
                    data-aos="fade-right"
                    data-aos-duration="500"
                    data-aos-delay="0"
                    className='space-y-2 p-3 aos-init aos-animate'
                >

                    <p className='text-sm'>
                        We are your trusted partner in logistics services and known to have been delivering excellence in supply chain 
                        management.
                        At Imperium, our dedicated team of professionals works tirelessly to provide seamless transportation, 
                        and distribution services tailored to meet the unique needs of our clients and we understand that 
                        in today's fast-paced business environment, efficient logistics are more critical than ever.
                        Our commitment to reliability, timeliness, and cost-effectiveness sets us apart in the industry and 
                        we take pride in building lasting relationships with our clients.
                        Explore our comprehensive range of logistics services and experience the difference of working with a 
                        company that values your business as much as you do. 
                        Thank you for considering Imperium as your logistics partner. 
                        We look forward to exceeding your expectations.
                    </p>
                    
                </div>
            </div>

            {/** Feature Image */}
            <div
                data-aos="fade-down"
                data-aos-duration="900"
                data-aos-delay="0"
                className="flex justify-center aos-init aos-animate"
            >
                <Image
                    src='/images/pngs/summary-img.png'
                    alt="Imperium Logistics"
                    loading="lazy"
                    width={1240}
                    height={450}
                />
            </div>
        </section>
    )
}

export default AboutUsFirstSection;