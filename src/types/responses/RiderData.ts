export interface RiderData{
    id: string;
    "isActive": boolean;
    "fullName": string;
    "phoneNumber": string;
    "email": string;
    "frequentLocation": string;
    "bikeRegistrationNumber": string;
    "licenseNumber": string;
    "dateCreated"?: string;
}

export interface RiderAnalytics{
    "totalDeliveryAttempted": number;
    "totalDeliverySuccessful": number;
    "totalDeliveryFailed": number;
}