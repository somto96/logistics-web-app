import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface TablePaginationProps{
    page?: number;
    limit?: number;
    total?: number;
    onPageChange?: (page: number)=> void;
    isEnd?: boolean;
    pageOptions?: number[];
    onNumberOfPageChange?: (option: number)=> void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
    page = 1, limit = 10, total = 100, onPageChange, isEnd,
    pageOptions = [50, 100], onNumberOfPageChange
})=>{

    // Classes
    let panelClass = 'flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
    let activePanelClass = 'bg-gray-100'

    // Helpers
    const handlePrev = ()=>{
        if (page > 1) {
            onPageChange && onPageChange(page - 1)
        }
    }
    const handleNext = ()=>{
        if (!isEnd) {
            onPageChange && onPageChange(page + 1)
        }
    }
    const handlePageOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (e)=>{
        onNumberOfPageChange && onNumberOfPageChange(Number.parseInt(e.target.value))
    }

    return(
        <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
        >
            <div className='flex items-center space-x-2'>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Rows per page
                </span>
                <select 
                    onChange={handlePageOptionChange}
                    placeholder='Kyc Status'
                    id="status-user" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-auto w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {
                        pageOptions.map((item, i)=>(
                            <option key={`${item}${i}`}>{ item }</option>
                        ))
                    }
                </select>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing {" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        { ((page - 1) * limit) + 1 } - { (limit * page) > total ? total : limit * page } {" "}
                    </span>
                    of {" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        { total }
                    </span>
                </span>
            </div>
            
            <div className="inline-flex items-center">
                <button 
                    onClick={handlePrev}
                    className={`p-3 text-white ${page < 2 ? 'bg-gray-400' : 'bg-black'}`}
                >
                   <FaChevronLeft />
                </button>

                <button
                    onClick={handleNext}
                    className={`p-3 text-white ${isEnd ? 'bg-gray-400' : 'bg-black'}`}
                >
                    <FaChevronRight/>
                </button>
            </div>
        </nav>
    )
}

export default TablePagination;