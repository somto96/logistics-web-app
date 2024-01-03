export interface UpdateCompanyPasswordPayload{
    "companyId": string;
    "password": string;
    "confirmPassword": string;
}

export interface UpdateCompanyPayload{
    "contactFullName": string;
    "address": string;
    "city": string;
    "state": string;
    "phoneNumber": string;
    "id": string;
}