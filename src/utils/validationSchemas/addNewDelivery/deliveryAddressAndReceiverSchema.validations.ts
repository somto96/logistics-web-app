import * as Yup from 'yup';

export const deliveryAddressAndReceiverDetailsSchema = Yup.object({
    deliveryCity: Yup.string().trim().required('Please enter a city'),
    deliveryState: Yup.string().required('Please select a state'),
    deliveryAddress: Yup.string().trim().required('Please enter your address'),
    deliveryLandmark: Yup.string().trim().required('Please enter your landmark'),
    receiverFirstname: Yup.string().trim().required('Please enter your first name'),
    receiverLastname: Yup.string().trim().required('Please enter your last name'),
    receiverPhoneNumber: Yup.string().required('Please enter your phone number'),
})