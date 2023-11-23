'use client';
import usePredictions from '@/hooks/usePredictions';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import ClickAwayListener from 'react-click-away-listener';
import FormInput, { FormInputProps } from './FormInput';


interface GooglePlacesAutocompleteProps extends FormInputProps{
  handleSelect?: (city: string)=> void;

  /**
   * Supported types:
   * https://developers.google.com/maps/documentation/places/web-service/supported_types#table2
   */
  types?: string[]
}

const GooglePlaceAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({ 
  onChange, handleSelect, types, ref, ...props 
}) => {
  
  // Ref
  const geocoder = React.useRef<google.maps.Geocoder>();

  // State
  interface Search{
    term: string;
    fetchPredictions: boolean;
  }
  const [search, setSearch] = React.useState<Search>({ term: '', fetchPredictions: false });
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  

  // Fetch predictoins
  let predictions = usePredictions(search.term, search.fetchPredictions, types);

  // Handlers
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
    // setValue(text);
    onChange && onChange(e)
    setSearch({ term: e.target.value, fetchPredictions: true });
  }

  const handleFocus = ()=> {
    setIsFocused(true)
  }

  const onPredictionSelect = async (placeId: string, full: string) => {
    setIsFocused(false)
    setSearch({ term: full, fetchPredictions: false });
    handleSelect && handleSelect(full);
  }


  return (
   <ClickAwayListener onClickAway={()=> setIsFocused(false)}>
     <div className='relative'>
      <FormInput
        onChange={handleChange}
        onFocus={handleFocus}
        {...props}
      />
      {
       isFocused &&
        <div className='absolute w-full max-h-[300px] bg-white top-[115%] left-0 rounded-lg border overflow-y-scroll'>
          {
            predictions.map((p, index)=>(
              <div className='flex items-center py-2 px-3 hover:bg-zinc-100 cursor-pointer gap-3' key={p.place_id}
                onClick={()=> onPredictionSelect(p.place_id, p.structured_formatting.main_text)}
              >
                <IoLocationSharp size={20} className='text-brand-500'/>
                <div>
                  <p className='text-sm'>
                    { p.structured_formatting.main_text }
                  </p>
                  <p className='text-xs text-slate-500'>
                    { p.structured_formatting.secondary_text }
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
   </ClickAwayListener>
    // <div className={className}>
    //   {/* <GooglePlacesAutocomplete
    //     apiKey={process.env.GOOGLEMAP_API_KEY}
    //     selectProps={{
    //       placeholder: placeholder,
    //       onInputChange: handleInputChange,
    //     }}
    //   /> */}
    // </div>
  );
};

export default GooglePlaceAutocomplete;



