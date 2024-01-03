import * as yup from "yup";

export const AddRiderFormSchema = yup.object({

    "fullName": yup.string().required(),
    "phoneNumber": yup.string().required(),
    email: yup.string().required().email(),
    "frequentLocation": yup.string().required(),
    "bikeRegistrationNumber": yup.string().required(),
    "licenseNumber": yup.string().required()
});

export type AddRiderFormState = yup.InferType<typeof AddRiderFormSchema>;