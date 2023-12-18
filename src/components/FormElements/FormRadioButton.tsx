"use client"

import React from 'react';
import { BsCheck } from 'react-icons/bs';

export interface FormRadioButtonProps{
    checked?: boolean;
    onChecked?: (checked?: boolean)=> void;
    disabled?: boolean;
}

const FormRadioButton: React.FC<FormRadioButtonProps> = ({
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
            className='w-2.5 h-2.5 rounded-full p-2.5 flex items-center justify-center cursor-pointer border border-black bg-white'
        >
            {
                isChecked &&
                <div
                    className='bg-black rounded-full'
                >
                    <BsCheck color='black' size={18}/>
                </div>
            }
        </div>
    )
}


export default FormRadioButton;