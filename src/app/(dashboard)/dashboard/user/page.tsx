"use client"

import FormCheckbox from "@/components/FormElements/FormCheckbox";
import moment from "moment";
import { FiEye } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { GoArrowRight } from "react-icons/go";
import React from "react";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { PackageStatus } from "@/types/responses/PackageAdminListData";
import CustomSkeleton from "@/components/CustomSkeleton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import Carousel from "nuka-carousel";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import AssignDelivery from "../back-office/views/AssignDelivery";
import { usePackagaCompanyList } from "@/hooks/usePackageCompanyList";

export default function BackOfficeHome() {

    // Hooks
    const router = useRouter()
    const session = useSession();

    type RowHash = {
        [key: string]: any;
    }

    // State
    const [views, setViews] = React.useState<'main'|'assign'>('main')
    const [rowHash, setRowHash] = React.useState<RowHash>({});
    const [seletectedAll, setSelectedAll] = React.useState<boolean>(false);
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 10,
        }
    });

    // Fetched data
    const { data, isLoading, error } = usePackagaCompanyList(query);

    // Effect
    React.useEffect(()=>{
        if (error) {
            if (error?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: error?.response?.data?.message || error?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    },[error])

    // Columns
    const columns = [
        "TRACKING ID", "PICK UP ADDRESS",
        "", "DELIVERY ADDRESS", "CUSTOMER NAME",
        "STATUS", "ACTION",
    ]

    // Handlers
    const handleAssignBtnLabelText = (status: PackageStatus) => {
        switch (status) {
            case PackageStatus.AVAILABLE_FOR_PICKUP:
                return {
                    text: 'Assign',
                    disabled: false
                };
            case PackageStatus.UNDELIVERED:
                return {
                    text: 'Reassign',
                    disabled: false
                };
            default:
                return {
                    text: 'Assigned',
                    disabled: true
                };
        }
    };
    const handleSelect = (code: string)=>{
        let cloneHash = {...rowHash}
        let values = data?.items || []
        if (cloneHash[code]) {
            delete cloneHash[code]
            setRowHash(cloneHash);
        }
        else{
            cloneHash[code] = values.find((item)=> item.trackingNumber === code);
            setRowHash(cloneHash);
        }
    }
    const handleSelectAll = ()=>{
        let cloneHash = {...rowHash}
        let values = data?.items || []

        if (seletectedAll) {
            setRowHash({})
        }
        else{
            for (let i = 0; i < values.length; i++) {
                let item = values[i];

                if (!handleAssignBtnLabelText(item.status).disabled) {
                    cloneHash[item.trackingNumber] = item;
                }
            } 
            setRowHash(cloneHash);
        }
        setSelectedAll(!seletectedAll)
    }

    const handleAssign = ()=>{
        setViews('assign')
    }
    const handleGoBack = ()=> setViews('main');

    // Helpers
    const getStatusColorClass = (status: PackageStatus) =>{
        switch (status) {
            case PackageStatus.IN_DELIVERY:
                return {
                    text: "text-[#2d9bdb]",
                    border: "border-[#2d9bdb]"
                }

            case PackageStatus.UNDELIVERED:
                return {
                    text: "text-[#EB5757]",
                    border: "border-[#EB5757]"
                }
            case PackageStatus.WAREHOUSE:
                return {
                    text: "text-[#F2994A]",
                    border: "border-[#F2994A]"
                }
            case PackageStatus.DELIVERED:
                return {
                    text: "text-[#219653]",
                    border: "border-[#219653]"
                }
            case PackageStatus.SLA_BREACH:
                return {
                    text: "text-[#F2C94C]",
                    border: "border-[#F2C94C]"
                }
            default:
                return {
                    text: "text-black",
                    border: "border-black"
                };
        }
    }
    const renderRows = ()=>{
        let rows = [];

        if (data?.items && data.items.length > 0) {
            
            for (let i = 0; i < data?.items?.length; i++) {

                let packageData = data.items[i];

                let element = (
                    <tr className="border-b text-sm"
                        key={`${i}rtpkg`}
                        // onClick={()=> handleRowClick(user.id)}
                    >
                        <td scope="row" className="px-3.5 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                <FormCheckbox
                                    checked={!!rowHash[packageData.trackingNumber]}
                                    onChecked={()=> handleSelect(packageData.trackingNumber)} 
                                    disabled={handleAssignBtnLabelText(packageData.status).disabled}
                                />
                                <p className="font-bold">
                                    { packageData.trackingNumber }
                                </p>
                            </div>
                        </td>
                            <td scope="row" className="px-3.5 py-5">
                                <div className="space-y-2 text-center">
                                    <p className="font-bold">
                                        { `${packageData.pickUpCity}, ${packageData.pickUpState}` }
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">
                                        { moment(packageData.pickupDate).format('ddd DD/MM/YYYY') }
                                    </p>
                                </div>
                            </td>
                            <td scope="col" className="px-3.5 py-5">
                                <GoArrowRight size={20} />
                            </td>
                            <td scope="row" className="px-3.5 py-5">
                                <div className="space-y-2 text-center">
                                    <p className="font-bold">
                                        { `${packageData.deliveryCity}, ${packageData.deliveryState}` }
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">
                                        { moment(packageData.expectedDeliveryDate).format('ddd DD/MM/YYYY') }
                                    </p>
                                </div>
                            </td>
                            <td scope="col" className="px-3.5 py-5 text-left">
                                <p className="font-bold">
                                    { `${packageData.customerFirstName} ${packageData.customerLastName}` }
                                </p>
                            </td>
                            <td scope="col" className="px-3.5 py-5 text-center">
                                <div className={`rounded-lg border p-2 ${getStatusColorClass(packageData.status).border}`}>
                                    <p className={`text-sm text-center font-normal whitespace-nowrap ${getStatusColorClass(packageData.status).text}`}>
                                        { packageData.status }
                                    </p>
                                </div>
                            </td>
                            <td scope="row" className="px-3.5 py-5">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={
                                            ()=>{
                                                if (!handleAssignBtnLabelText(packageData.status).disabled) {
                                                    if (!rowHash[packageData.trackingNumber]) {
                                                        handleSelect(packageData.trackingNumber);
                                                    }
                                                    handleAssign();
                                                }
                                            }
                                        }
                                        disabled={handleAssignBtnLabelText(packageData.status).disabled}
                                        className='min-w-[95px] inline-flex items-center justify-center px-4 h-10 text-sm text-center text-white bg-black disabled:text-black disabled:bg-[#f2f2f2] rounded-lg font-normal'
                                    >
                                        { handleAssignBtnLabelText(packageData.status).text }
                                    </button>

                                    <button
                                        className="bg-[#2F80ED]/10 p-2 text-[#2F80ED] rounded-lg"
                                    >
                                        <FiEye size={20}/>
                                    </button>

                                    <button
                                        className="bg-[#F2994A]/10 p-2 text-[#F2994A] rounded-lg"
                                    >
                                        <GrLocation size={20} />
                                    </button>
                                </div>
                            </td>
                    </tr>
                )

                rows.push(element);
            }
        }

        return rows
    }


    // Displays
    const mainDisplay = (
        <div className="h-full flex flex-col">
            
            {/** Header */}
            <div className="p-5 border-gray-300">
                <p className="font-bold text-lg ">
                    Dashboard
                </p>
            </div>

            <div className="grid grid-cols-4 p-5 gap-4">
                <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                    <p className="text-[#4F4F4F]"> 
                        Total Packages
                    </p>
                    <div className="flex-1"></div>
                    <p className="font-bold text-[22px]">
                        10,593,093
                    </p>
                </div>
                <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                    <p className="text-[#4F4F4F]"> 
                        Total Packages
                    </p>
                    <div className="flex-1"></div>
                    <p className="font-bold text-[22px]">
                        10,593,093
                    </p>
                </div>
                <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                    <p className="text-[#4F4F4F]"> 
                        Total Packages
                    </p>
                    <div className="flex-1"></div>
                    <p className="font-bold text-[22px]">
                        10,593,093
                    </p>
                </div>
                <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                    <p className="text-[#4F4F4F]"> 
                        Total Packages
                    </p>
                    <div className="flex-1"></div>
                    <p className="font-bold text-[22px]">
                        10,593,093
                    </p>
                </div>
            </div>

            <div className="bg-white flex-1">
                
                <table className="relative w-full h-full">
                    <thead className="text-gray-500 uppercase bg-white text-left border-b sticky top-0">
                        <tr>
                            {
                                columns.map((column, i)=>{

                                    if (i === 0) {
                                        return(
                                            <th scope="row" className="p-3.5  min-w-[180px] relative" key={`${i}col`}>
                                                <div className="flex items-center gap-3">
                                                    <FormCheckbox
                                                        checked={seletectedAll}
                                                        onChecked={handleSelectAll}
                                                    />
                                                    <p>
                                                        { column }
                                                    </p>
                                                </div>
                                            </th>
                                        )
                                    }

                                    if (column.toLowerCase() === 'status') {
                                        return(
                                            <th scope="col" className="p-3.5 text-sm text-center min-w-[180px]" key={`${i}col`}>
                                                { column }
                                            </th>
                                        )
                                    }

                                    if (column.toLowerCase() === 'pick up address' || column.toLowerCase() === 'delivery address') {
                                        return(
                                            <th scope="col" className="p-3.5  text-sm text-center min-w-[180px]" key={`${i}col`}>
                                                <p>
                                                    { column }
                                                </p>
                                            </th>
                                        )
                                    }

                                    if (column.toLowerCase() === '') {
                                        return(
                                            <th scope="col" className="p-3.5 text-sm text-center" key={`${i}col`}>
                                                { column }
                                            </th>
                                        )
                                    }

                                    return(
                                        <th scope="col" className="p-3.5 text-sm min-w-[180px]" key={`${i}col`}>
                                            { column }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading &&
                            <tr>
                                <td colSpan={columns.length}>
                                    <CustomSkeleton isLoading></CustomSkeleton>
                                </td>   
                            </tr>
                        }
                        { !isLoading && renderRows() }
                    </tbody>
                </table>
            </div>
        </div>
    )

    return(
        <>
            {  views === 'main' && mainDisplay }
            { 
                views === 'assign' && 
                <AssignDelivery
                    packageListData={Object.values(rowHash)}
                    onGoBack={handleGoBack}
                    onAddDelivery={handleGoBack}
                />
            }
        </>
    )
}