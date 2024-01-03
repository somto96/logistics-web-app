"use client"

import React from "react";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { PackageAdminListData, PackageStatus } from "@/types/responses/PackageAdminListData";
import CustomSkeleton from "@/components/CustomSkeleton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import { useRouter } from "next/navigation";
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from "@/utils/sessionUtils";
import TablePagination from "@/components/TablePagination";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { useAuth } from "@/providers/AuthProvider";
import { CompanyData } from "@/types/responses/CompanyData";
import UserManagementFilter, { UserManagementFilterState } from "@/components/Filters/UserManagementFilter";
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import moment from "moment";
import { MdOutlineClose } from "react-icons/md";
import UpdateCompanyForm from "@/forms/UpdateCompanyForm";


backendClient.setToken(getSessionToken() || '');

type DashboardViewType = 'main'|'assign'|'package'|'tracking'

export default function CustomersPage() {

    // Refs
    const tableRowRef = React.createRef<HTMLTableRowElement>()
    const modalRef = React.createRef<HTMLDivElement>()

    // Hooks
    const router = useRouter()
    // const session = useSession();
    const { session } = useAuth()

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
    const [data, setData] = React.useState<PaginatedResponse<CompanyData>>()
    const [selectedCompany, setSelectedCompany] = React.useState<CompanyData>()

    // Fetched data
    // const { data, isLoading, error } = usePackagaAdminList(query);
    const fetchCompanyList = async(params: PaginatedQuery)=>{
        backendClient.setToken(getSessionToken() || '');
        
        try {
            let response = await backendClient.getCompanyList(params, setLoading)

            if (response.responseObject) {
                setData(response.responseObject);
                return response.responseObject
            }
            
        } catch (err: any) {
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
        fetchCompanyList(query)
    },[query])

    // Columns
    const columns = [
        "COMPANY NAME", 
        "COMPANY PHONE NO",
        // "", 
        "COMPANY EMAIL", 
        // "CUSTOMER NAME",
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
    const handleFilterApply = (state: UserManagementFilterState)=>{
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
            // cloneHash[code] = values.find((item)=> item.trackingNumber === code);
            setRowHash(cloneHash);
        }
    }
    const handleSelectAll = ()=>{
        // let cloneHash = {...rowHash}
        // let values = data?.items || []

        // if (seletectedAll) {
        //     setRowHash({})
        // }
        // else{
        //     for (let i = 0; i < values.length; i++) {
        //         let item = values[i];

        //         if (!handleAssignBtnLabelText(item.status).disabled) {
        //             cloneHash[item.trackingNumber] = item;
        //         }
        //     } 
        //     setRowHash(cloneHash);
        // }
        // setSelectedAll(!seletectedAll)
    }

    const handleAssign = ()=>{
        setViews('assign')
    }
    const handleGoBack = ()=> setViews('main');

    const handleUpdateTracking = (packageData?: PackageAdminListData)=>{
        // if (packageData) {
        //     setSelectedPackage(packageData)
        //     setViews('tracking')
        // }
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
        setSelectedCompany(undefined);
    }
    const toggleUpdateCompanyModal = ()=>{
        document.body.classList.toggle('overflow-hidden')
        modalRef.current?.classList.toggle('hidden');
    }
    const handleEditProfile = (e: React.MouseEvent)=>{
        let clone: any = selectedCompany ? { ...selectedCompany } : undefined
        e.stopPropagation()
        tableRowRef.current?.click();
        setSelectedCompany(clone)
        toggleUpdateCompanyModal();
    }

    

    // Helpers
    const getStatusClass = (isVerified: boolean) =>{

        if (isVerified) {
            return "text-green-500 border-green-500 bg-green-100"
        }

        return "text-red-500 border-red-500 bg-red-100"
        
    }
    const renderRows = ()=>{
        let rows = [];

        if (data && data.items.length > 0) {
            
            for (let i = 0; i < data?.items.length; i++) {

                let companyData = data.items[i];

                let element = (
                    <tr className="border-b text-sm h-fit hover:bg-gray-200 cursor-pointer"
                        key={`${i}rtpkg`}
                        data-hs-overlay="#hs-overlay-customer"
                        ref={tableRowRef}
                        onClick={()=> setSelectedCompany(companyData)}
                    >
                        <td scope="row" className="px-3.5 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                {/* <FormCheckbox
                                    checked={!!rowHash[packageData.trackingNumber]}
                                    onChecked={()=> handleSelect(packageData.trackingNumber)} 
                                    disabled={handleAssignBtnLabelText(packageData.status).disabled}
                                /> */}
                                <p className="font-bold">
                                    { companyData.name }
                                </p>
                            </div>
                        </td>
                        <td scope="row" className="px-3.5 py-5">
                            <div className="space-y-2">
                                <p className="font-bold">
                                    { companyData.phoneNumber }
                                </p>
                            </div>
                        </td>
                
                        <td scope="row" className="px-3.5 py-5">
                        <div className="space-y-2">
                                <p className="font-bold">
                                    { companyData.emailAddress.address }
                                </p>
                            </div>
                        </td>
                        
                        <td scope="col" className="px-3.5 py-5 text-center">
                            <div className={`rounded-md border p-2 ${getStatusClass(companyData.emailAddress.isVerified)}`}>
                                <p className={`text-sm text-center font-normal whitespace-nowrap`}>
                                    { companyData.emailAddress.isVerified ? "Active" : "Inactive" }
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
            <div className="p-5 border-gray-300 flex items-center h-[68px]">
                <p className="font-bold text-lg ">
                    User Management
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

            {/** Filter Area */}
            <div className="border-y">
                <UserManagementFilter
                    allCustomers={data?.totalItemCount}
                    onApply={handleFilterApply}
                />
            </div>

            <div className="bg-white overflow-x-scroll h-[40vh] overflow-y-scroll grow">
                
                <table className={`relative w-full ${loading ? 'h-full' : ''}`}>
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
                            loading &&
                            <tr>
                                <td colSpan={columns.length}>
                                    <CustomSkeleton isLoading></CustomSkeleton> 
                                </td>  
                            </tr>
                        }
                        { !loading && renderRows() }
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
        <div>
            <div className="flex justify-end p-2">
                <button
                    onClick={handleOverlayClose}
                    className="hover:bg-gray-100 p-2 rounded-md"
                >
                    <AiOutlineClose size={20}/>
                </button>
            </div>
            <div className="bg-site-gray-F2 py-3 px-5">
                <p className="text-xs text-site-gray-text">
                    Joined: {" "}
                    <span className="text-black font-semibold">
                        { moment(selectedCompany?.dateCreated).format('DD/MM/yyyy') }
                    </span>
                </p>
            </div>
            <div className="flex justify-center py-5">
                <Image 
                    className="rounded-full" 
                    src="/images/svgs/user-avatar.svg" 
                    alt={"hello"}
                    width={60}
                    height={60}
                />
            </div>
            <div className="p-4 space-y-4 border-b border-site-gray-82">
                <p className="text-black text-sm">
                    Customer details
                </p>
                <div className="flex">
                    <div className="flex-1">
                        <p className="text-site-gray-border text-xs">
                            Full Name
                        </p>
                        <p className="text-black text-sm">
                            { selectedCompany?.owner.fullName }
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-site-gray-border text-xs">
                            Company Phone No
                        </p>
                        <p className="text-black text-sm">
                            { selectedCompany?.phoneNumber }
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <p className="text-site-gray-border text-xs">
                            Company Email
                        </p>
                        <p className="text-black text-sm">
                            { selectedCompany?.emailAddress.address }
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <p className="text-site-gray-border text-xs">
                            Company Address
                        </p>
                        <p className="text-black text-sm">
                            { selectedCompany?.address }
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-4 gap-4">
                <button
                    // onClick={handleUpdateTracking}
                    className={`min-w-[136px] inline-flex items-center justify-center px-2 h-8 text-sm text-center rounded-full text-black bg-white border border-black`}
                >
                    Deactivate User
                </button>
                <button
                    onClick={handleEditProfile}
                    className={`min-w-[136px] inline-flex items-center justify-center px-2 h-8 text-sm text-center rounded-full text-white bg-black`}
                >
                    Edit Details
                </button>
            </div>
        </div>
    )

    return(
        <>
            <div 
                ref={modalRef}
                // id="imperium-modal" 
                className="transition hidden duration fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
            >
                
                <div className='h-full w-full items-center justify-center flex'>
                    <div className='sm:w-[90%] md:w-[950px] w-[90%] bg-white rounded-lg h-[90%] flex flex-col text-black relative'>
                    <div 
                        className='absolute right-3 top-3 cursor-pointer z-10'
                        onClick={(e)=>{
                            e.stopPropagation();
                            toggleUpdateCompanyModal()
                        }}
                    >
                        <MdOutlineClose size={20} />
                    </div>

                        <UpdateCompanyForm
                            companyData={selectedCompany}
                            onSuccess={()=>{
                                toggleUpdateCompanyModal();
                                setSelectedCompany(undefined)
                                fetchCompanyList(query)
                            }}
                        />

                    </div>
                </div>
                
            </div>
            <div 
                id="hs-overlay-customer" 
                className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white hidden" 
                tabIndex={-1}
            >
                { overlayContent }
            </div>
            {  views === 'main' && mainDisplay }
        </>
    )
}