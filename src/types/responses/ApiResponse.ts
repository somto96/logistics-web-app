export interface ApiResponse<T = any>{
    "responseObject": T;
    "responseObjectExists": boolean;
    "message": string;
    "isSuccessful": boolean;
    "errors": string[]
}