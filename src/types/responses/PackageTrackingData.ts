export interface PackageTrackingData{
    "id": string;
    "trackingNumber": string;
    qrCode: string;
    "status": 'AvailableForPickUp' | 'PickedUp' | 'WareHouse' |'InDelivery' | 'UnDelivered' | 'SLABreach' | 'Delivered';
    "expectedDeliveryDate": string; // Date
    "pickupDate": string; // Date
    "numberOfItems": number;
    "weightOfPackage": number;
    "packagePlacedBy": string;
    "packageDescription": string;
    "deliveryAddress": string;
    "deliveryCity": string;
    "deliveryState": string;
    "deliveryLandMark": string;
    "customerFirstName": string;
    "customerLastName": string;
    "customerPhoneNumber": string;
    "pickUpAddress": string;
    "pickUpCity": string;
    "pickUpState": string;
    "pickUpLandMark": string;
    "deliveryRider": string;
    "pickUpRider": string;
    "notes"?: string
}