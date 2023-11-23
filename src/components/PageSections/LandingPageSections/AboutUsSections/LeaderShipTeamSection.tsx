import Image from "next/image";
import React from "react";


const LeaderShipTeamSection: React.FC<any> = ()=>{

    // Staff
    type TeamMember = {
        name: string;
        role: string;
        imgUrl: string;
    }
    const teamMembers: TeamMember[] = [
        {
            name: "Awe Oluwakayode",
            role: "COO",
            imgUrl: "/images/pngs/profile-1.png",
        },
        {
            name: "Kelechi Ohia",
            role: "Operation Manager",
            imgUrl: "/images/pngs/profile-2.png",
        },
        {
            name: "Emmanuel Akpan",
            role: "Operations Officer",
            imgUrl: "/images/pngs/profile-3.png",
        },
    ]

    return(
        <section className="py-4 md:px-16 px-4">

            <div className="px-12 py-10 bg-[#f9f9f9]">
                <div 
                    data-aos="fade-down"
                    data-aos-duration="2500"
                    data-aos-delay="0"
                    className="pb-5 border-b-2 aos-init aos-animate"
                >
                    <p className="font-bold text-3xl">
                        Meet our wonderful leadership team
                    </p>
                </div>
                <div className="py-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10">
                    {
                        teamMembers.map((item, i)=>(
                            <div 
                                data-aos="up"
                                data-aos-duration="6000"
                                data-aos-delay="0"
                                className="space-y-1 aos-init aos-animate" 
                                key={`${i}tmbrs`}
                            >
                                <Image
                                    src={item.imgUrl}
                                    alt="Kolade Johnson"
                                    width={298}
                                    height={448}
                                />
                                <p className="font-semibold">
                                    { item.name }
                                </p>
                                <p className="text-[#4f4f4f] text-xs"> 
                                    { item.role }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LeaderShipTeamSection;