import * as Yup from 'yup';

export const pickupAddressAndSenderDetailsSchema = Yup.object({
    pickUpCity: Yup.string().trim().required('Please enter a city'),
    pickUpState: Yup.string().required('Please select a state'),
    pickUpAddress: Yup.string().trim().required('Please enter your address'),
    pickUpLandmark: Yup.string().trim().required('Please enter your landmark'),
    senderFirstname: Yup.string().trim().required('Please enter your first name'),
    senderLastname: Yup.string().trim().required('Please enter your last name'),
    senderPhoneNumber: Yup.string().required('Please enter your phone number'),
})