import { PackageStatus } from "@/types/responses/PackageAdminListData";

export const statusOptions = [
    {
        value: 0,
        label: "Available For Pickup",
    },
    {
        value: 6,
        label: "Delivered",
    },
    {
        value: 3,
        label: "In Delivery",
    },
    {
        value: 1,
        label: "Pickup",
    },
    {
        value: 5,
        label: "SLA Breach",
    },
    {
        value: 4,
        label: "Undelivered",
    },
    {
        value: 2,
        label: "Warehouse",
    },

]

export const packageStatusList = [
    PackageStatus.AVAILABLE_FOR_PICKUP,
    PackageStatus.PICKUP,
    PackageStatus.WAREHOUSE,
    PackageStatus.IN_DELIVERY,
    PackageStatus.UNDELIVERED,
    PackageStatus.SLA_BREACH,
]