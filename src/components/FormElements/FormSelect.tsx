'use client';
import usePredictions from '@/hooks/usePredictions';
import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa6";
import ClickAwayListener from 'react-click-away-listener';
import FormInput, { FormInputProps } from './FormInput';


interface FormSelectProps extends FormInputProps{
    handleSelect?: (value: string)=> void;
    handleOptionSelect?: (option: { value: any; label: string })=> void;
    options?: {
        value: any;
        label: string;
    }[]
}

const FormSelect: React.FC<FormSelectProps> = ({ 
  onChange, handleSelect, handleOptionSelect, options = [], ref, ...props 
}) => {

    // Ref
    const optionsContainerRef = React.createRef<HTMLDivElement>();
  
   // State
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = React.useState(options);
    const [offset, setOffset] = React.useState<number>(0)
    

    // Handlers
    const handleFocus = ()=> {
        setIsFocused(true)
    }

    const handleSeacrh: React.ChangeEventHandler<HTMLInputElement> = (e)=>{

        if (e.target.value.replace(/ /g, '') === '') {
            setFilteredOptions(options);
        }

        let filtered = options.filter((item)=> item.label.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredOptions(filtered);

        onChange && onChange(e);
    }

    // Effect
    React.useEffect(()=>{
        if (optionsContainerRef.current) {
            const hasOverflowed = document.body.scrollHeight > optionsContainerRef.current?.clientHeight;

            if (hasOverflowed) {
                const difference = document.body.scrollHeight - optionsContainerRef.current?.clientHeight;;
                setOffset(difference)
            }
            else{
                setOffset(0)
            }

        }
        
    },[optionsContainerRef])


    return (
    <ClickAwayListener onClickAway={()=> setIsFocused(false)}>
        <div className='relative z-10'>
        <FormInput
            name='dropdown'
            onFocus={handleFocus}
            autoComplete='off'
            endAdornment={
                <FaChevronDown size={16} />
            }
            onChange={handleSeacrh}
            {...props}
        />
        {
        isFocused &&
            <div 
                ref={optionsContainerRef}
                className={`absolute w-full max-h-[300px] bg-white ${offset ? 'bottom-[85%]' : 'top-[115%]'} left-0 rounded-lg border overflow-y-scroll`}
            >
            {
                filteredOptions.map((item, i)=>(
                <div className='z-[200px] flex items-center py-2 px-3 hover:bg-zinc-100 cursor-pointer gap-3' key={`${i}${item.value}`}
                    onClick={()=>{
                        setIsFocused(false)
                        handleSelect && handleSelect(item.value)
                        handleOptionSelect && handleOptionSelect(item)
                    }}
                >
                    <p className='text-sm text-slate-500'>
                        { item.label }
                    </p>
                </div>
                ))
            }
            </div>
        }
        </div>
    </ClickAwayListener>

    );
};

export default FormSelect;



