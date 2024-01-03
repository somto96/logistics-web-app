export interface CreateAccountPayload{
    contactFullName: string;
    companyName: string;
    address: string;
    city: string;
    state: string;
    email: string;
    "phoneNumber": {
        "Number": string;
        "CountryCode": string;
    }
}

export interface CreateRiderPayload{
    "fullName": string;
    "phoneNumber": string;
    "email": string;
    "frequentLocation": string;
    "bikeRegistrationNumber": string;
    "licenseNumber": string;
}