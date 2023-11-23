import LoadingModal from '@/components/Modals/LoadingModal';
import React from 'react';
import { HeroTrackPackageFormSchema, HeroTrackPackageFormState } from './schema';
import { useFormik } from 'formik';
import { twMerge } from "tailwind-merge";

export interface HeroTrackPackageFormProps{
    onFormSubmit?: (state: HeroTrackPackageFormState) => void;
}

const HeroTrackPackageForm: React.FC<HeroTrackPackageFormProps> = ({
    onFormSubmit
})=>{

    // State
    // const [isError, setIsError] = React.useState<boolean>(false);

    // Initial values
    let initialValues: HeroTrackPackageFormState = {
        trackingId: ''
    }

    // Formik
    const { 
        values, handleChange, errors, setFieldValue,
        handleSubmit, 
        isValid, validateForm
    } =  useFormik({
        initialValues: initialValues,
        validationSchema: HeroTrackPackageFormSchema,
        onSubmit: (values, actions)=>{
            onFormSubmit && onFormSubmit(values)
        }
    });

    // Styles
    let errorClasses = !!errors.trackingId ? "outline outline-red-400" : "";
    let defaultInputClasses = "py-3 pl-4 pr-[120px] block w-full rounded-full text-sm outline-none"
    let inputClasses = twMerge(defaultInputClasses, errorClasses);

    // Handlers
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }

    // Effect for error changes
    // React.useEffect(() => {
    //     console.log(errors.trackingId)

    //     setIsError(!!errors.trackingId);
    //   }, [errors.trackingId]);

    return(
        <>
        <form className="bg-[#F2F2F2]/75 sm:p-12 p-6 rounded-lg" onSubmit={handleFormSubmit}>
            <div>
                <label
                    htmlFor="hs-validation-name-error"
                    className="block text-sm font-bold mb-2 text-slate-800"
                >
                    TRACK YOUR PACKAGE
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder='Enter your tracking number'
                        id="hs-validation-name-error"
                        name="hs-validation-name-error"
                        className={inputClasses}
                        value={values.trackingId}
                        onChange={handleChange('trackingId')}
                        aria-describedby="hs-validation-name-error-helper"
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <button
                            type='submit'
                            className='inline-flex items-center px-6 py-1 text-sm font-medium text-center text-white bg-black rounded-full'
                        >
                            TRACK
                        </button>
                    </div>
                </div>
                {
                    !!errors.trackingId &&
                    <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">Please enter a tracking number.</p>
                }
            </div>
        </form>
        </>
       
    )
}

export default HeroTrackPackageForm
