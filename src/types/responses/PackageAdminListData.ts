export enum PackageStatus{
    AVAILABLE_FOR_PICKUP = 'AvailableForPickUp',
    PICKUP = 'PickedUp',
    WAREHOUSE = 'WareHouse',
    IN_DELIVERY = 'InDelivery',
    UNDELIVERED =  'UnDelivered',
    SLA_BREACH = 'SLABreach',
    DELIVERED = 'Delivered'
}

export interface PackageAdminListData{
    "id": string;
    "trackingNumber": string;
    "qrCode"?: string;
    "status": PackageStatus;
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
}