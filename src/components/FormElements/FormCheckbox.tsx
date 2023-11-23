"use client"

import React from 'react';
import { BsCheck } from 'react-icons/bs';

export interface FormCheckboxProps{
    checked?: boolean;
    onChecked?: (checked?: boolean)=> void;
    disabled?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
    checked, onChecked, disabled
})=>{

    // State
    const [isChecked, setIsChecked] = React.useState<boolean>();

    // Effect
    React.useEffect(()=>{
        setIsChecked(checked);
        console.log("checked is: ", checked);
    },[checked])

    // Handlers
    const handleCheck = ()=>{
        if (!disabled) {
            if (checked === undefined) {
                setIsChecked(!isChecked);
            }
            onChecked && onChecked(isChecked);
        }
    }

    return(
        <div
            onClick={handleCheck}
            className='w-3 h-3 rounded-md p-2 flex items-center justify-center cursor-pointer border border-black bg-white'
        >
            {
                isChecked &&
                <div
                    className='bg-black rounded-md'
                >
                    <BsCheck color='white' size={18}/>
                </div>
            }
        </div>
    )
}


export default FormCheckbox;