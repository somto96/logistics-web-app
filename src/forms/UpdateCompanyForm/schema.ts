import * as yup from "yup";

export const UpdateCompanyFormSchema = yup.object({

    "contactFullName": yup.string().required(),
    "address": yup.string().required(),
    "city": yup.string().required(),
    "state": yup.string().required(),
    "phoneNumber": yup.string().required()
});

export type UpdateCompanyFormState = yup.InferType<typeof UpdateCompanyFormSchema>;