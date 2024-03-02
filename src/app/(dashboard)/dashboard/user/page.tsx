"use client"

import React from "react";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { PackageAdminListData, PackageStatus } from "@/types/responses/PackageAdminListData";
import CustomSkeleton from "@/components/CustomSkeleton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import { useRouter } from "next/navigation";
import DashboardFilter, { DashboardFilterState } from "@/components/Filters/DashboardFilter";
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from "@/utils/sessionUtils";
import TablePagination from "@/components/TablePagination";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { UpdatePackagePayload } from "@/types/requests/PackagePayload";
import AssignDelivery from "../back-office/views/AssignDelivery";
import PackageDetails from "../back-office/views/PackageDetails";
import TrackingInfo from "../back-office/views/TrackingInfo";
import moment from "moment";
import { GoArrowRight } from "react-icons/go";
import { useCompanyAnalytics } from "@/hooks/useCompanyAnalytics";
import { useAuth } from "@/providers/AuthProvider";
import { AiOutlineClose } from "react-icons/ai";
import { packageDetailsTitleAndDescription } from "@/utils";
import { LuCopy } from "react-icons/lu";
import { useSingleRider } from "@/hooks/useSingleRider";
import Image from 'next/image';
import { FaCircle, FaRegCircle } from "react-icons/fa6";


backendClient.setToken(getSessionToken() || '');

type DashboardViewType = 'main'|'assign'|'package'|'tracking'

export default function BackOfficeHome() {

    // Refs
    const tableRowRef = React.createRef<HTMLTableRowElement>()
    const modalRef = React.createRef<HTMLDivElement>()

    // Hooks
    const router = useRouter()
    const { session, user } = useAuth()

    type RowHash = {
        [key: string]: any;
    }   

    // State
    const [views, setViews] = React.useState<DashboardViewType>('main')
    const [rowHash, setRowHash] = React.useState<RowHash>({});
    const [loading, setLoading] = React.useState<boolean>(false);
    const [seletectedAll, setSelectedAll] = React.useState<boolean>(false);
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 20,
        }
    });
    const [data, setData] = React.useState<PaginatedResponse<PackageAdminListData>>()
    const [selectedPackage, setSelectedPackage] = React.useState<PackageAdminListData>()

    // Fetched Data
    const { 
        data: analytics,
        isLoading
    } = useCompanyAnalytics(session?.id);

    const {
        data: pickupRiderData,
        isLoading: pickupLoading
    } = useSingleRider(selectedPackage?.pickUpRider)

    const {
        data: deliveryRiderData,
        isLoading: deliveryLoading
    } = useSingleRider(selectedPackage?.deliveryRider)
    


    // Fetched data
    // const { data, isLoading, error } = usePackagaAdminList(query);
    const fetchCustomerPackageList = async(params: PaginatedQuery)=>{
        backendClient.setToken(getSessionToken() || '');
        setLoading(true)
        
        try {
            let response = await backendClient.getCustomerPackageList(params)

            backendClient.setLoading('admin', false);
            setLoading(false)
            if (response.responseObject) {
                setData(response.responseObject);
                return response.responseObject
            }
            
        } catch (err: any) {
            backendClient.setLoading('admin', false);
            setLoading(false)
            if (err?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    }

    // Effect
    // React.useEffect(()=>{
    //     if (error) {
    //         if (error?.response?.status === 401 && !session) {
    //             router.replace('/sign-in')
    //         }
    //         else{
    //             ToastNotify({
    //                 type: 'error',
    //                 message: error?.response?.data?.message || error?.response?.data?.title,
    //                 position: 'top-right',
    //             });
    //         }
    //     }
    // },[error])
    React.useEffect(()=>{
        fetchCustomerPackageList(query)
    },[query])

    // Columns
    const columns = [
        "TRACKING ID", 
        "PICK UP ADDRESS",
        "", 
        "DELIVERY ADDRESS", 
        "CUSTOMER NAME",
        "STATUS", 
        // "ACTION",
    ]

    // Handlers
    const handlePageChange = (p: number)=>{
        setQuery((prevState)=>({
            ...prevState,
            pagedQuery:{
                pageNumber: p,
                pageSize: prevState.pagedQuery.pageSize
            }
        }));
    }
    const handlePageOptionChange = (opt: number)=>{
        setQuery((prevState)=>({
            ...prevState,
            pagedQuery:{
                pageNumber: prevState.pagedQuery.pageNumber,
                pageSize: opt
            }
        }));
    }
    const handleFilterApply = (state: DashboardFilterState)=>{
        console.log({
            ...query,
            ...state
        })
        setQuery((prevState)=>({
            ...prevState,
            ...state
        }))

    }
    const handleAssignBtnLabelText = (pckage: PackageAdminListData) => {
        switch (pckage.status) {
            case PackageStatus.AVAILABLE_FOR_PICKUP:
                if (pckage.pickUpRider.includes("00000000")) {
                    return {
                        text: 'Assign',
                        disabled: false
                    };
                }
                return {
                    text: 'Assigned',
                    disabled: true
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

                if (!handleAssignBtnLabelText(item).disabled) {
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

    const handleUpdateTrackingStatus = async (payload: UpdatePackagePayload)=>{
        backendClient.setToken(getSessionToken() || '');
        setLoading(true)
        
        try {
            let response = await backendClient.updatePackageStatus(payload)

            setLoading(false)
            if (response.responseObject) {
                ToastNotify({
                    type: 'success',
                    message: response.responseObject,
                    position: 'top-right',
                });
                fetchCustomerPackageList(query)
                .then((value)=>{
                    let updatedPackage = value?.items.find((p)=> p.id === selectedPackage?.id)
                    if (updatedPackage) {
                        setSelectedPackage(updatedPackage);
                        console.log("UPDATE", updatedPackage)
                    }
                })
            }
            
        } catch (err: any) {
            setLoading(false)
            if (err?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    }

    const handleUpdateTracking = (packageData?: PackageAdminListData)=>{
        if (packageData) {
            setSelectedPackage(packageData)
            setViews('tracking')
        }
    }

    const handleAssignPackage = (packageData?: PackageAdminListData)=>{
        if (packageData) {
            if (!handleAssignBtnLabelText(packageData).disabled) {
                if (!rowHash[packageData.trackingNumber]) {
                    handleSelect(packageData.trackingNumber);
                }
                handleAssign();
            }
        }
    }

    const handleOverlayClose = ()=>{
        tableRowRef.current?.click();
        setSelectedPackage(undefined);
    }

    const handlePackageSelect = (pckage: PackageAdminListData)=>{
        setSelectedPackage(pckage);
    }

    const toggleTrackingModal = ()=>{
        document.body.classList.toggle('overflow-hidden')
        modalRef.current?.classList.toggle('hidden');
    }

    const handleTrackPackage = (e: React.MouseEvent)=>{
        let clone: any = selectedPackage ? { ...selectedPackage } : undefined
        e.stopPropagation()
        tableRowRef.current?.click();
        setSelectedPackage(clone)
        toggleTrackingModal();
    }

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

        if (data && data.items.length > 0) {
            
            for (let i = 0; i < data?.items.length; i++) {

                let packageData = data.items[i];

                let element = (
                    <tr className="border-b text-sm h-fit hover:bg-gray-200"
                        key={`${i}rtpkg`}
                        ref={tableRowRef}
                        data-hs-overlay="#hs-overlay-package"
                        onClick={()=> handlePackageSelect(packageData)}
                    >
                        <td scope="row" className="px-3.5 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                {/* <FormCheckbox
                                    checked={!!rowHash[packageData.trackingNumber]}
                                    onChecked={()=> handleSelect(packageData.trackingNumber)} 
                                    disabled={handleAssignBtnLabelText(packageData.status).disabled}
                                /> */}
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
                        {/* <td scope="row" className="px-3.5 py-5">
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
                                    onClick={()=>{
                                        setSelectedPackage(data.items.find((p)=> p.id === packageData.id))
                                        setViews('package')
                                    }}
                                >
                                    <FiEye size={20}/>
                                </button>

                                <button
                                    className="bg-[#F2994A]/10 p-2 text-[#F2994A] rounded-lg"
                                    onClick={()=>{
                                        setSelectedPackage(data.items.find((p)=> p.id === packageData.id))
                                        setViews('tracking')
                                    }}
                                >
                                    <GrLocation size={20} />
                                </button>
                            </div>
                        </td> */}
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
            <div className="p-5 border-gray-300 flex items-center h-[68px] border-b">
                <p className="font-bold text-lg ">
                    Dashboard
                </p>
                <div className="flex-1"></div>
                <div>
                    {
                        Object.keys(rowHash).length > 0 &&
                        <button
                            onClick={handleAssign}
                            className={`min-w-10 inline-flex items-center px-4 h-10 text-sm text-center rounded-full text-white bg-black`}
                        >
                            Assign {`(${Object.keys(rowHash).length})`}
                        </button>
                    }
                </div>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-2 p-5 gap-4">
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                        <p className="text-[#4F4F4F]"> 
                            Total package available for pick up
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold text-[22px]">
                            { analytics?.packageAvailableForPickUp || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                        <p className="text-[#4F4F4F]"> 
                            Total package at warehouse
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold text-[22px]">
                            { analytics?.packageAtWareHouse || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                        <p className="text-[#4F4F4F]"> 
                            Total package Delivered
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold text-[22px]">
                            { analytics?.packageDelivered || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-[#F9F9F9] p-3 flex flex-col h-[150px]">
                        <p className="text-[#4F4F4F]"> 
                            Total package Undelivered
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold text-[22px]">
                            { analytics?.packageUnDelivered || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
            </div>

            {/** Filter Area */}
            <div className="border-y">
                <DashboardFilter
                    allDeliveries={data?.items.length}
                    onApply={handleFilterApply}
                />
            </div>

            <div className="bg-white overflow-x-scroll h-[40vh] overflow-y-scroll grow">
                
                <table className={`relative w-full ${backendClient.adminListLoading ? 'h-full' : ''}`}>
                    <thead className="text-gray-500 uppercase bg-white text-left border-b sticky top-0 text-sm">
                        <tr>
                            {
                                columns.map((column, i)=>{

                                    if (i === 0) {
                                        return(
                                            <th scope="row" className="p-3.5  min-w-[180px] relative" key={`${i}col`}>
                                                <div className="flex items-center gap-3">
                                                    {/* <FormCheckbox
                                                        checked={seletectedAll}
                                                        onChecked={handleSelectAll}
                                                    /> */}
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
                            backendClient.adminListLoading &&
                            <tr>
                                <td colSpan={columns.length}>
                                    <CustomSkeleton isLoading></CustomSkeleton> 
                                </td>  
                            </tr>
                        }
                        { !backendClient.adminListLoading && renderRows() }
                    </tbody>
                </table>
            </div>
            <TablePagination
                page={query.pagedQuery.pageNumber}
                limit={query.pagedQuery.pageSize < (data?.totalItemCount || 0) ? query.pagedQuery.pageSize : data?.totalItemCount}
                total={data?.totalItemCount}
                onPageChange={handlePageChange}
                isEnd={!data?.hasNext}
                onNumberOfPageChange={handlePageOptionChange}
                pageOptions={[20, 50]}
            />
        </div>
    )

    const overlayContent = (
        <div className="overflow-y-scroll h-full">
            <div className="flex justify-end p-2">
                <button
                    onClick={handleOverlayClose}
                    className="hover:bg-gray-100 p-2 rounded-md"
                >
                    <AiOutlineClose size={20}/>
                </button>
            </div>
            <div className="pb-3 px-5 text-black space-y-2">
                <p>
                   { selectedPackage?.status ? packageDetailsTitleAndDescription(selectedPackage.status).title : '' }
                </p>
                <p className="text-xs">
                   { selectedPackage?.status ? packageDetailsTitleAndDescription(selectedPackage.status).sub : '' }
                </p>
            </div>
            <div className="bg-site-gray-F2 py-3 px-5 flex items-center mt-5">
                <p className="text-sm font-bold">
                   { selectedPackage?.trackingNumber }
                </p>
                <div className="flex-1"></div>
                <LuCopy 
                    className='text-site-gray-text cursor-pointer' 
                    size={18} 
                    onClick={()=>{
                        navigator.clipboard.writeText(selectedPackage?.trackingNumber || "")
                    }}
                />
            </div>
            <div className="p-5 border-b border-site-gray-82">
                <p className="text-sm mb-3">
                    Delivery Details
                </p>
                <p className="text-xs mb-2">
                    { selectedPackage?.deliveryAddress }
                </p>
                <p className="text-site-gray-82 text-[10px] mb-1">
                    { selectedPackage?.customerFirstName.toUpperCase() } { selectedPackage?.customerLastName.toUpperCase() }
                </p>
                <p className="text-site-gray-82 text-[10px] font-semibold">
                    { selectedPackage?.customerPhoneNumber }
                </p>
            </div>
            <div className="p-5 border-b border-site-gray-82">
                <p className="text-sm mb-3">
                    Pickup Details
                </p>
                <p className="text-xs mb-2">
                    { selectedPackage?.pickUpAddress }
                </p>
                <p className="text-site-gray-82 text-[10px] mb-1">
                    { user?.company?.name.toUpperCase() }
                </p>
                <p className="text-site-gray-82 text-[10px] font-semibold">
                    { user?.company?.phoneNumber }
                </p>
            </div>
            <div className="p-4 flex justify-center border-b border-site-gray-82">
                <button
                    onClick={handleTrackPackage}
                    className={`min-w-[136px] inline-flex items-center justify-center px-2 h-10 text-sm text-center rounded-full text-white bg-black`}
                >
                    Track package
                </button>
            </div>

            {/** Package Details */}
            <div className="p-5 border-b border-site-gray-82 space-y-3">
                <p className="text-sm mb-3">
                    Package Details
                </p>
                <div className="flex">
                    <div className="flex-1">
                        <p className="text-xs text-site-gray-82">
                            Date created
                        </p>
                        <p className="text-sm text-black">
                            { moment(selectedPackage?.pickupDate).format('DD/MM/YYYY') }
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-site-gray-82">
                            Expected devlivery
                        </p>
                        <p className="text-sm text-black">
                            { moment(selectedPackage?.expectedDeliveryDate).format('DD/MM/YYYY') }
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex-1">
                        <p className="text-xs text-site-gray-82">
                            Package description
                        </p>
                        <p className="text-sm text-black">
                            { selectedPackage?.packageDescription }
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex-1">
                        <p className="text-xs text-site-gray-82">
                            Note
                        </p>
                        <p className="text-sm text-black">
                            --
                        </p>
                    </div>
                </div>
            </div>

            {/** Rider Details */}
            <div className="p-5 border-b border-site-gray-82">
                <p className="text-sm mb-3">
                    Pickup Rider Details
                </p>
                <CustomSkeleton isLoading={pickupLoading}>
                    <div className="text-black space-y-2">
                        <p className="text-sm">
                            { pickupRiderData?.fullName }
                        </p>
                        <p className="text-[10px] text-site-gray-82">
                            { pickupRiderData?.phoneNumber }
                        </p>
                        <p className="text-[10px] text-site-gray-82">
                            { pickupRiderData?.bikeRegistrationNumber }
                        </p>
                    
                    </div>
                </CustomSkeleton>
            </div>

            {/** Delivery Details */}
            <div className="p-5 border-b border-site-gray-82">
                <p className="text-sm mb-3">
                    Delivery Rider Details
                </p>
                <CustomSkeleton isLoading={deliveryLoading}>
                    <div className="text-black space-y-2">
                        <p className="text-sm">
                            { deliveryRiderData?.fullName }
                        </p>
                        <p className="text-[10px] text-site-gray-82">
                            { deliveryRiderData?.phoneNumber }
                        </p>
                        <p className="text-[10px] text-site-gray-82">
                            { deliveryRiderData?.bikeRegistrationNumber }
                        </p>
                    
                    </div>
                </CustomSkeleton>
            </div>

            <div className="p-3 flex justify-center">
                <button
                    // onClick={handleUpdateTracking}
                    className={`min-w-[136px] inline-flex items-center justify-center px-2 h-10 text-sm text-center rounded-full text-black bg-white border border-black`}
                >
                    Cancel Delivery
                </button>
            </div>
           
        </div>
    )

    // Variables
    type DeliveryStep = {
        title: string;
        description: {
            message: string;
            date: string;
        },
        done: boolean;
        active?: boolean;
    }
    const getLastStep = ()=>{
        if (selectedPackage?.status === 'UnDelivered') {
            return {
                title: 'Undelivered',
                description: {
                    message: `We were unable to complete delivery to you. We’ll schedule another delivery to you. 
                    Please note that we may be forced to cancel this delivery if we are unable to deliver to you in the next 2 attempts.`,
                    date: `${moment(selectedPackage?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
                },
                done: false,
                active: true
            }
        }

        if (selectedPackage?.status === 'SLABreach') {
            return {
                title: 'In breach of SLA ',
                description: {
                    message: `For some reasons beyond our control, we cannot deliver at the stipulated time. 
                    We’ll schedule another delivery date and communicate with you. Please bear with us.`,
                    date: `${moment(selectedPackage?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
                },
                done: false,
                active: true
            }
        }

        return {
            title: 'Delivered',
            description: {
                message: 'Package was successfully delivered',
                date: `${moment(selectedPackage?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: false,
            active: selectedPackage?.status === 'Delivered',
        }
    }
    const steps: DeliveryStep[] = [
        {
            title: 'Order Picked up',
            description: {
                message: 'Your package has been left at the pickup location',
                date: `${moment(selectedPackage?.pickupDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['WareHouse', 'InDelivery',  'UnDelivered', 'SLABreach', 'Delivered'].includes(selectedPackage?.status || ''),
            active: selectedPackage?.status === 'PickedUp' 
        },
        {
            title: 'Order in Warehouse',
            description: {
                message: 'Package sorted and ready to be sent out to customer location',
                date: `${moment(selectedPackage?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['InDelivery',  'UnDelivered', 'SLABreach', 'Delivered'].includes(selectedPackage?.status || ''),
            active: selectedPackage?.status === 'WareHouse'
        },
        {
            title: 'Order in Delivery ',
            description: {
                message: 'Package is on it’s way to customer location',
                date: `${moment(selectedPackage?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['UnDelivered', 'SLABreach', 'Delivered'].includes(selectedPackage?.status || ''),
            active: selectedPackage?.status === 'InDelivery'
        },
        getLastStep()
    ];

    const separator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-black bg-gray-400'
        />
    )
    const inactiveSeparator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-gray-400'
        />
    )
    const endSeparator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-gray-400 opacity-0'
        />
    )


    const trackingDetailPage1 = (
        <div className='col-span-3 bg-white opacity-90 z-10 rounded-b-lg flex flex-col'>
                            
            {/** Addresses */}
            <div className='flex py-3 px-5 border-b'>
                <div className='flex-1 space-y-2 p-3 border-r'>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        PICKUP ADDRESS
                    </p>
                    <p className='text-sm text-black'>
                        { selectedPackage?.pickUpAddress }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { selectedPackage?.customerFirstName.toUpperCase() } { selectedPackage?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { selectedPackage?.customerPhoneNumber }
                    </p>
                </div> 
                <div className='flex-1 space-y-2 p-3'>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        DELIVERY ADDRESS
                    </p>
                    <p className='text-sm text-black'>
                        { selectedPackage?.deliveryAddress }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { selectedPackage?.customerFirstName.toUpperCase() } { selectedPackage?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { selectedPackage?.customerPhoneNumber }
                    </p>
                </div>
            </div>

            {/** Tracking details */}
            <div className='flex-1 rounded-b-lg py-2 px-5'>
                <p className='text-sm font-medium text-gray-500 mb-3'>
                    TRACKING DETAILS
                </p>
                <div className='space-y-3 overflow-y-scroll'>
                    {
                        selectedPackage && 
                        steps.map((item, index)=>(
                            <div className='flex'>
                                <div className='flex flex-col items-center space-y-1'>
                                    { 
                                        item.done ? 
                                            <FaCircle size={50}/> : 
                                        item.active ?  
                                        <FaRegCircle size={50} /> : <FaRegCircle size={50} className="text-gray-300"/>
                                    }
                                    { 
                                        index === steps.length - 1 ?
                                        endSeparator :
                                        item.done ? separator : inactiveSeparator
                                    }
                                </div>
                                <div>
                                    <h3 className='text-gray-500 font-medium'>
                                        { item.title }
                                    </h3>
                                    <div className='space-y-3'>
                                        <p className='text-gray-500 text-xs'>
                                            { item.description.message }
                                        </p>
                                        <p className='text-gray-500 text-[10px]'>
                                            { item.description.date }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <div className='mt-5'>
                    <button 
                        type="button" 
                        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-black"
                        // onClick={()=> setNextPage(true)}
                    >
                        View more details
                        <GoArrowRight size={20} />
                    </button>
                </div> */}
            </div>

        </div>
    )

    // Tracking Modal Content
    const trackingModalContent = (
        <div className='h-full w-full items-center justify-center flex'>
            <div className='sm:w-[70%] bg-white rounded-lg h-[90%] flex flex-col text-black'>

                {/** Header */}
                <div className='flex py-4 px-6 items-center relative border-b border-gray-300'>
                    <Image 
                        src={'/images/svgs/logo-color.svg'} 
                        alt={'imperium logistics'} 
                        width={97}
                        height={68}
                    />
                    <div className='flex-1 px-4'>
                        <div className='space-x-1'>
                            <p className='text-xl font-medium text-black'>
                                Tracking information
                            </p>
                            <p className='text-sm text-black'>
                                Tracking #: { selectedPackage?.trackingNumber }
                            </p>
                        </div>
                    </div>
                    <div className='justify-self-end'>
                        <button
                            className='hover:bg-[#4F4F4F]/10 text-black p-2 rounded-lg absolute top-3 right-3'
                            onClick={()=>{
                                document.body.classList.toggle('overflow-hidden')
                                modalRef.current?.classList.toggle('hidden');
                                setSelectedPackage(undefined)
                            }}
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    </div>
                </div>

                {/** Information */}
                <div className="grid grid-cols-5 flex-1 rounded-b-lg relative bg-[url('/images/pngs/map.png')] bg-no-repeat">
                    <div className="col-span-2">
                        <Image 
                            className='absolute left-5 bottom-10'
                            src={'/images/svgs/track-route.svg'} 
                            alt={'tracking marker map'} 
                            width={489}
                            height={415}
                        />
                    </div>
                    { trackingDetailPage1 }
                </div>
            </div>
        </div>
    )

    return(
        <>
            <div 
                ref={modalRef}
                // id="imperium-modal" 
                className="transition duration hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
            >
                { trackingModalContent }
            </div>
            <div 
                id="hs-overlay-package" 
                className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white hidden" 
                tabIndex={-1}
            >
                { overlayContent }
            </div>
            {  views === 'main' && mainDisplay }
            { 
                views === 'assign' && 
                <AssignDelivery
                    packageListData={Object.values(rowHash)}
                    onGoBack={handleGoBack}
                    onAddDelivery={handleGoBack}
                />
            }
            { 
                views === 'package' && 
                <PackageDetails
                    packageData={selectedPackage}
                    onGoBack={handleGoBack}
                    onAddDelivery={handleGoBack}
                    onUpdateTracking={handleUpdateTracking}
                    onAssign={handleAssignPackage}
                />
            }
            { 
                views === 'tracking' && 
                <TrackingInfo
                    packageData={selectedPackage}
                    onGoBack={handleGoBack}
                    onUpdateTrackingStatus={handleUpdateTrackingStatus}
                    isLoading={loading}
                />
            }
        </>
    )
}