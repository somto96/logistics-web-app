import React from 'react';
import { CgSpinner } from "react-icons/cg";
import { twMerge } from 'tailwind-merge'

export interface CustomButtonProps extends 
React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
   loading?: boolean;
}

const FormButton = React.forwardRef<HTMLButtonElement,CustomButtonProps>(({
    loading, children, className,  ...props 
}, ref)=>{
    
    // Classes
    let defaultClasses = "min-w-10 inline-flex items-center px-5 h-10 text-sm font-medium text-center text-white bg-black rounded-full";
    let buttonClass = twMerge(defaultClasses, className);

    return(
        <button className={buttonClass} ref={ref} {...props}>
            { 
                loading &&
                <CgSpinner className='animate-spin mr-2' size={20}/>
            }
            { children }
        </button>
    )
}) 

FormButton.displayName = 'FormButton';

export default FormButton;