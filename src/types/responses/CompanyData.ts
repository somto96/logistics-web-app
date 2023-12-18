export interface CompanyData{
    "name": string;
    "phoneNumber": string;
    "address": string;
    "city": string;
    "state": string;
    "emailAddress": {
        "address": string;
        "isVerified": boolean;
    },
    "owner": {
        "fullName": string;
    },
    "id": string;
    "dateCreated": string; // Date
}