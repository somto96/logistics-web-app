import * as yup from "yup";

export const AddNewPackageFormSchema = yup.object({

    "pickUpAddress": yup.string().required("Pick up Address is Required"),
    "pickUpCity": yup.string().required("Pick up City is Required"),
    "pickUpState": yup.string().required("Pick up State is Required"),
    "pickUpLandmark": yup.string().required("Pick up Landmark is Required"),
    "senderFirstname": yup.string().required("Sender Firstname is Required"),
    "senderLastname": yup.string().required("Sender Lastname is Required"),
    "senderPhoneNumber": yup.string().required("Sender Phone Number").min(8),
    "deliveryAddress": yup.string().required("Delivery Address is Required"),
    "deliveryCity": yup.string().required("Delivery City is Required"),
    "deliveryState": yup.string().required("Delivery State is Required"),
    "deliveryLandmark": yup.string().required("Delivery Landmark is Required"),
    "receiverFirstname": yup.string().required("Receiver Firstname is Required"),
    "receiverLastname": yup.string().required("Receiver Lastname is Required"),
    "receiverPhoneNumber": yup.string().required("Receiver Phone Nunber is Required").min(8),
    "pickUpDate": yup.string().required("Pick up Date is Required"),
    "deliveryDate": yup.string().required("Delivery Date is Required"),
    "packageDescription": yup.string().required("Package Description is Required"),
    "numberOfItems": yup.number().required("Number of items is Required"),
    "weightOfPackage": yup.number().required("Weight of package is Required"),
    "CustomerLastName": yup.string().required("Customer Lastname is Required"),
    "CustomerFirstName": yup.string().required("Customer Firstname is Required"),
    "CustomerPhoneNumber": yup.string().required("Customer Phone Number is Required"),
    notes: yup.string().optional()
});

export type AddNewPackageFormState = yup.InferType<typeof AddNewPackageFormSchema>;