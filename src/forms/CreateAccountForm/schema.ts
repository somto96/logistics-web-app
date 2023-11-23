import * as yup from "yup";

let alphanumericRegex = /^[aA-zZ0-9]+$/;

export const CreateFormSchema = yup.object({
    contactFullName: yup.string().required(),

    companyName: yup.string().required(),

    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    email: yup.string().required().email(),
    phoneNumber: yup.string().required().min(8),
});

export type CreateFormState = yup.InferType<typeof CreateFormSchema>;