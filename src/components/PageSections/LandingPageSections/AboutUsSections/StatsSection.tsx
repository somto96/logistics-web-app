import React from "react";

const StatsSection: React.FC<any> = ()=>{

    return(
    
        <section 
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="0"
            className="py-4 md:px-28 px-4 aos-init aos-animate"
        >
          
            <div className="grid lg:grid-cols-3 gap-8 border-b-2 py-4">

                <div className="space-y-5">
                    <p className="text-xl font-medium">
                        Our clients
                    </p>
                    <p className="text-sm">
                        We give top-notch to our clients weekly
                    </p>
                    <p className="font-bold text-[60px]">
                        100+
                    </p>
                </div>

                <div className="space-y-5">
                    <p className="text-xl font-medium">
                        Our riders
                    </p>
                    <p className="text-sm">
                        Readily available riders to complete deliveries daily
                    </p>
                    <p className="font-bold text-[60px]">
                        20+ daily
                    </p>
                </div>

                <div className="space-y-5">
                    <p className="text-xl font-medium">
                        Completed delivery
                    </p>
                    <p className="text-sm">
                        We’ve completed and still completing deliveries within Nigeria
                    </p>
                    <p className="font-bold text-[60px]">
                        10,000+
                    </p>
                </div>

            </div>

        </section>

    )
}

export default StatsSection;