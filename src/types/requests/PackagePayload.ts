export interface UpdatePackagePayload{
    "status": number;
    "trackingNumber": string;
}

export interface AssignPackagaePayload{
    "riderId": string;
    "packageIds": string[];
}