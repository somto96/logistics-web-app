import Link from "next/link";
import React from "react";

const AboutUsContactUsSection: React.FC<any> = ()=>{

    return(
        <section 
            data-aos="fade-up"
            data-aos-duration="9000"
            data-aos-delay="0"
            className="p-5 flex flex-col items-center justify-center aos-init aos-animate"
        >
            <p className="text-xl mb-5 font-bold">
                Need help to get started?
            </p>
            <Link
                href={'#'}
                className='min-w-10 inline-flex items-center px-4 h-10 text-sm font-medium text-center text-white bg-black rounded-full'>
                Contact Us
            </Link>
        </section>
    )
}

export default AboutUsContactUsSection