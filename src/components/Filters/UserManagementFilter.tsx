import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import FormInput from '../FormElements/FormInput';
import { PackageStatus } from '@/types/responses/PackageAdminListData';
import moment from 'moment';

export interface UserManagementFilterState{
    "dateFilter"?: {
        "from": string;
        "to": string;
    },
    "textFilter"?: {
        "keyword": string;
    }
}

export interface UserManagementFilterErrorState{
    from: boolean;
    to: boolean;
    keyword: boolean;
}

export interface UserManagementFilterProps{
    allCustomers?: number;
    allRiders?: number;
    riders?: boolean;
    onApply?: (state: UserManagementFilterState)=> void;
}

const UserManagementFilter: React.FC<UserManagementFilterProps> = ({
    allCustomers = 0, allRiders = 0, onApply, riders
})=>{

    // Refs
    const contentEl = React.createRef<HTMLDivElement>();

    // Default
    const defaulErrorState: UserManagementFilterErrorState = {
        from: false,
        to: false,
        keyword: false
    }

    // State
    const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
    const [active, setActive] = React.useState<boolean>(false);
    const [todayClicked, setTodayClicked] = React.useState<boolean>(false);
    const [yesterdayClicked, setYesterdayClicked] = React.useState<boolean>(false);
    const [filterState, setFilterState] = React.useState<UserManagementFilterState>({});
    const [errorState, setErrorState] = React.useState<UserManagementFilterErrorState>(defaulErrorState)

    // Handlers
    const handleClear = ()=>{
        setFilterState({});
        onApply && onApply({
            dateFilter: undefined,
            textFilter: undefined
        })
    }
    const handleUnhighlight = (key: keyof UserManagementFilterErrorState)=>{
        setErrorState((prevState)=>({
            ...prevState,
            [key]: false
        }))
    }
    const handleErrhighlight = (key: keyof UserManagementFilterErrorState)=>{
        setErrorState((prevState)=>({
            ...prevState,
            [key]: true
        }))
    }
    const toggle = ()=> setActive(!active);

    const handleFromOnChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{

        if (filterState.dateFilter?.to && moment(e.target.value).isValid()) {
            if (moment(filterState.dateFilter?.to) < moment(e.target.value)) {
                handleErrhighlight('from')
                setFilterState((prevState)=>({
                    ...prevState,
                    dateFilter:{
                        from: '',
                        to: prevState.dateFilter?.to || ''
                    }
                }))
                return
            }
        }
        handleUnhighlight('from')
        setFilterState((prevState)=>({
            ...prevState,
            dateFilter:{
                from: e.target.value,
                to: prevState.dateFilter?.to || ''
            }
        }))
    }

    const handleToOnChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        if (filterState.dateFilter?.from && moment(e.target.value).isValid()) {
            if (moment(filterState.dateFilter?.from) > moment(e.target.value)) {
                handleErrhighlight('to')
                setFilterState((prevState)=>({
                    ...prevState,
                    dateFilter:{
                        from: prevState.dateFilter?.from || '',
                        to: ''
                    }
                }))
                return
            }
        }
        handleUnhighlight('to')
        setFilterState((prevState)=>({
            ...prevState,
            dateFilter:{
                to: e.target.value,
                from: prevState.dateFilter?.from || ''
            }
        }))
    }
    const handleIdChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        handleUnhighlight('keyword');
        setFilterState((prevState)=>({
            ...prevState,
            textFilter:{
                keyword: e.target.value
            }
        }))
    }

    const handleApply = () => {
        // Validate Date filters
        if (filterState.dateFilter?.to && !filterState.dateFilter.from) {
            handleErrhighlight('from')
            return
        }

        if (filterState.dateFilter?.from && !filterState.dateFilter.to) {
            handleErrhighlight('to')
            return
        }

        onApply && onApply(filterState);
    }

    // Classes
    let activeClass = `h-[${contentEl.current?.scrollHeight}] py-2`;
    let inActiveClass = `h-0 overflow-hidden`;
    let activeBtnClass = 'text-white bg-black'
    let inActiveBtnClass = 'text-site-gray-text bg-gray-300' 

    // Options
    const options = [
        {
            value: PackageStatus.AVAILABLE_FOR_PICKUP,
            label: "Available For Pickup",
        },
        {
            value: PackageStatus.DELIVERED,
            label: "Delivered",
        },
        {
            value: PackageStatus.IN_DELIVERY,
            label: "In Delivery",
        },
        {
            value: PackageStatus.PICKUP,
            label: "Pickup",
        },
        {
            value: PackageStatus.SLA_BREACH,
            label: "SLA Breach",
        },
        {
            value: PackageStatus.UNDELIVERED,
            label: "Undelivered",
        },
        {
            value: PackageStatus.WAREHOUSE,
            label: "Warehouse",
        },

    ]

    return(
        
        <div className='relative overflow-x-scroll'>
            <div className="flex items-center p-5 gap-8 flex-wrap">
                <div className='w-full sm:w-auto'>
                    <p className="font-bold">
                        { !riders? "All Customers" : "All Deleviry Riders" }
                    </p>
                    <p className="text-sm text-gray-400">
                        { riders ? allRiders : allCustomers }
                    </p>
                </div>

                {/** Filters */}
                <div className={`gap-8 flex items-center flex-1 flex-wrap`}>
                    <FormInput
                        className="border-site-gray-border border py-2 rounded-full text-sm"
                        containerClass='w-full sm:w-auto'
                        labelClass="hidden"
                        placeholder={ !riders ? "Search customer name" : "Search rider name" }
                        startAdornment={
                            <CiSearch />
                        }
                        onChange={handleIdChange}
                        value={filterState.textFilter?.keyword || ''}

                    />
                    {/* <div className="hs-accordion-group" data-hs-accordion-always-open> */}
                    
                    {/* <button
                        onClick={toggle}
                        // href={'/create-account'}
                        className='min-w-10 inline-flex items-center px-4 h-10 text-sm text-center text-black  hover:text-site-gray-text'
                    >
                        More filters
                        <IoIosArrowDown className={`ml-2 transition-transform ${active ? 'rotate-180' : ''}`} />
                    </button> */}
                    
                </div>

                {/** Actions */}
                <div className='flex items-center justify-end gap-4 w-full sm:w-auto'>
                    <button
                        onClick={handleClear}
                        className={`min-w-10 inline-flex items-center px-4 h-10 text-sm text-center rounded-lg border-black border`}
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApply}
                        className={`min-w-10 inline-flex items-center px-4 h-10 text-sm text-center rounded-lg bg-black text-white`}
                    >
                        Apply
                    </button>
                </div>
                
            </div>

            {/** Collapsed Filters */}
            <div 
                ref={contentEl}
                className={`transition-[all] duration-300 ease-out ${ active ? activeClass : inActiveClass }`}
                aria-labelledby="hs-filter-collapse"
            >
                <div className='px-5 py-3 flex items-center gap-4'>
                    
                    {/** Date Ranges */}
                    <div className='flex items-center gap-4'>
                        <FormInput 
                            labelClass='text-sm'
                            label='From'
                            type='date'
                            className='border border-site-gray-border min-w-[200px] py-2'
                            onChange={handleFromOnChange}
                            value={filterState.dateFilter?.from || ''}
                            error={errorState.from}
                            errorMessage=''
                        />
                        <FormInput 
                            labelClass='text-sm'
                            label='To'
                            type='date'
                            className='border border-site-gray-border min-w-[200px] py-2'
                            onChange={handleToOnChange}
                            value={filterState.dateFilter?.to || ''}
                            error={errorState.to}
                            errorMessage=''
                        />
                    </div>

                    {/** Status Dropdown */}
                    {/* <div>
                        <FormSelect
                            labelClass='text-sm'
                            label='Status'
                            id='status filter'
                            options={options}
                            className='border border-site-gray-border min-w-[200px] py-2'
                        />
                    </div> */}

                    {/** Location Search */}
                    {/* <GoogleCityAutocomplete
                        // handleSelect={(city)=>{
                        //     setFieldValue('city', city)
                        // }}
                        
                        label="City"
                        className='border border-site-gray-border min-w-[200px] py-2'
                        endAdornment={
                            <GrLocation size={20} />
                        }
                        // error={!!errors.city}
                        // errorMessage={errors.city}
                        // onChange={handleChange('city')}
                        // value={values.city}
                    /> */}
                </div>
            </div>
        </div>
            
    )
}

export default UserManagementFilter;