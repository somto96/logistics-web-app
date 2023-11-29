"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export interface FormInputProps extends 
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    error?: boolean;
    success?: boolean;
    errorMessage?: string;
    labelClass?: string;
    label?: string;
    containerClass?: string;
    inputContainerClass?: string;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const FormInput = React.forwardRef<HTMLInputElement,FormInputProps>(({
    error = false, 
    success = false,
    errorMessage = 'This field is required', 
    className, 
    id,
    labelClass, 
    label,
    containerClass,
    inputContainerClass,
    endAdornment,
    startAdornment,
    ...props
},ref)=>{

    // State
    const [isError, setIsError] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    // Effect for error changes
    React.useEffect(() => {
      setIsError(error);
    }, [error]);

    React.useEffect(()=>{
        setIsSuccess(success);
    }, [success]);

    // Classes
    let defaultLabelClasses =
      "block text-xs mb-2";
    let defaultInputClasses = `py-3 pl-4 block w-full rounded-lg text-sm outline-none ${endAdornment ? 'pr-[120px]' : 'pr-4'} ${startAdornment ? 'pl-10' : ''}`;
    let errorClasses = isError ? "border-red-400" : "";
    let successClasses = isSuccess ? "border-brand-200" : "";
    let labelClasses = twMerge(defaultLabelClasses, labelClass);
    let inputClasses = twMerge(defaultInputClasses, className, errorClasses, successClasses);

    let defaultInputContainerClasses = 'relative'
    let inputContainerClasses = twMerge(defaultInputContainerClasses, inputContainerClass)
    
    // return(
    //     <div className={containerClass}>
    //         {
    //             label &&
    //             <label htmlFor={id} className={labelClasses}>
    //                 { label }
    //             </label>
    //         }
    //         <input 
    //             ref={ref}
    //             id={id}
    //             { ...props }
    //             className={inputClasses}
    //         />
    //         {
    //             isError &&
    //             <label htmlFor={id} className="text-xs text-red-400">
    //                 { errorMessage }
    //             </label>
    //         }
    //     </div>
    // )

    return(
        <div className={containerClass}> 
            {
                label &&
                <label
                    htmlFor={id}
                    className={labelClasses}
                >
                    { label }
                </label>
            }
            <div className={inputContainerClasses}>
                {
                    startAdornment &&
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        { startAdornment }
                    </div>
                }
                <input
                    ref={ref}
                    id={id}
                    { ...props }
                    className={inputClasses}
                />
                {
                    endAdornment &&
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                        { endAdornment }
                    </div>
                }
            </div>
            {
                isError && errorMessage &&
                <p className="text-xs text-red-400 mt-2" id="hs-validation-name-error-helper">
                    { errorMessage }
                </p>
            }
        </div>
    )
})

export default FormInput;