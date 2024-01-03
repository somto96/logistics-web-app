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


backendClient.setToken(getSessionToken() || '');

type DashboardViewType = 'main'|'assign'|'package'|'tracking'

export default function BackOfficeHome() {

    // Hooks
    const router = useRouter()
    // const session = useSession();
    const { session } = useAuth()

    type RowHash = {
        [key: string]: any;
    }   

    // Fetched Data
    const { 
        data: analytics,
        isLoading
    } = useCompanyAnalytics(session?.id)
    

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
                    <tr className="border-b text-sm h-fit"
                        key={`${i}rtpkg`}
                        // onClick={()=> handleRowClick(user.id)}
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