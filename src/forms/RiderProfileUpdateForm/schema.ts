import * as yup from "yup";


export const RiderProfileUpdateFormSchema = yup.object({
    fullName: yup.string().required(),
    frequentLocation: yup.string().required(),
    bikeRegistrationNumber: yup.string().required(),
    licenseNumber: yup.string().required(),
    phoneNumber: yup.string().required().min(8)
});

export type RiderProfileUpdateFormState = yup.InferType<typeof RiderProfileUpdateFormSchema>;