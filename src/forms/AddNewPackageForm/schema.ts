import * as yup from "yup";

export const AddNewPackageFormSchema = yup.object({

    "pickUpAddress": yup.string().required(),
    "pickUpCity": yup.string().required(),
    "pickUpState": yup.string().required(),
    "pickUpLandmark": yup.string().required(),
    "senderFirstname": yup.string().required(),
    "senderLastname": yup.string().required(),
    "senderPhoneNumber": yup.string().required().min(8),
    "deliveryAddress": yup.string().required(),
    "deliveryCity": yup.string().required(),
    "deliveryState": yup.string().required(),
    "deliveryLandmark": yup.string().required(),
    "receiverFirstname": yup.string().required(),
    "receiverLastname": yup.string().required(),
    "receiverPhoneNumber": yup.string().required().min(8),
    "pickUpDate": yup.string().required(),
    "deliveryDate": yup.string().required(),
    "packageDescription": yup.string().required(),
    "numberOfItems": yup.number().required(),
    "weightOfPackage": yup.number().required(),
    "CustomerLastName": yup.string().required(),
    "CustomerFirstName": yup.string().required(),
    "CustomerPhoneNumber": yup.string().required(),
    notes: yup.string().optional()
});

export type AddNewPackageFormState = yup.InferType<typeof AddNewPackageFormSchema>;