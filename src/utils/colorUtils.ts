import { PackageStatus } from "@/types/responses/PackageAdminListData"

export const getStatusColorClass = (status?: PackageStatus) =>{
    switch (status) {
        case PackageStatus.IN_DELIVERY:
            return {
                text: "text-[#2d9bdb]",
                border: "border-[#2d9bdb]",
                background: "bg-[#2d9bdb]"
            }

        case PackageStatus.UNDELIVERED:
            return {
                text: "text-[#EB5757]",
                border: "border-[#EB5757]",
                background: "bg-[#EB5757]"
            }
        case PackageStatus.WAREHOUSE:
            return {
                text: "text-[#F2994A]",
                border: "border-[#F2994A]",
                background: "bg-[#F2994A]"
            }
        case PackageStatus.DELIVERED:
            return {
                text: "text-[#219653]",
                border: "border-[#219653]",
                background: "bg-[#219653]"
            }
        case PackageStatus.SLA_BREACH:
            return {
                text: "text-[#F2C94C]",
                border: "border-[#F2C94C]",
                background: "bg-[#F2C94C]"
            }
        default:
            return {
                text: "text-black",
                border: "border-black",
                background: "bg-black"
            };
    }
}