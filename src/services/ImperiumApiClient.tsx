import { AUTH_KEY } from "@/constants/cookie.config";
import { CreateAccountPayload } from "@/types/requests/CreateAccountPayload";
import { CreatePasswordPayload } from "@/types/requests/CreatePasswordPayload";
import { UpdatePackagePayload } from "@/types/requests/PackagePayload";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { SignInPayload } from "@/types/requests/SignInPayload";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { PackageAdminListData } from "@/types/responses/PackageAdminListData";
import { PackageTrackingData } from "@/types/responses/PackageTrackingData";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";


class ImperiumApiClient {

    // Instance variables
    private _axiosInstance!: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    public cacheTTL: number = 60 // 1 minute
    public adminListLoading = false;
    
    // private _token = process.env.TOKEN

    /**
     *
     */
    constructor() {
        this._axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_URL
        });
    }

    public async getTrackingInformationForPackage(id?: string): Promise<ApiResponse<PackageTrackingData>> {

        const cacheKey = `/Package/trackingnumber/${id}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        let response = await this._axiosInstance.get<ApiResponse<PackageTrackingData>>(cacheKey);
        
        // Update the cache with the fresh data
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

        return response.data
    }

    public async signIn(payload: SignInPayload){
        const cacheKey = `/Auth/login`;

        let response = await this._axiosInstance.post<ApiResponse<SignInResponseData>>(cacheKey, payload);

        return response.data
    }

    public async createPassword(payload: CreatePasswordPayload){
        const cacheKey = `/Company/credential`;

        let response = await this._axiosInstance.post<ApiResponse<SignInResponseData>>(cacheKey, payload);

        return response.data
    }

    public async createAccount(payload: CreateAccountPayload){
        const cacheKey = `/Company/account`;

        let response = await this._axiosInstance.post<ApiResponse<Text>>(cacheKey, payload);

        return response.data
    }

    public setToken(token: string){
        this._axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            headers:{
                'Authorization': `Bearer ${token}`
            },
        });
    }

    public setLoading(key: string, value: boolean){
        if (key === 'admin') {
            this.adminListLoading = value;
        }
    }

    public async getAdminPackageList(query: PaginatedQuery): Promise<ApiResponse<PaginatedResponse<PackageAdminListData>>>{
        const url = `/Package/adminlist`;
        const cacheKey = `/Package/adminlist/${JSON.stringify(query)}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        this.adminListLoading = true;
        let response = await this._axiosInstance.post<ApiResponse<PaginatedResponse<PackageAdminListData>>>(url, query);

        this.adminListLoading = false;
        // Update the cache with the fresh data
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

        return response.data
    }

    public async updatePackageStatus(payload: UpdatePackagePayload): Promise<ApiResponse<string>>{
        const url = `/Package/update`;

        let response = await this._axiosInstance.post<ApiResponse<string>>(url, payload);

        
        // Reset cache
        this.cache.clear();

        return response.data
    }


}

export default new ImperiumApiClient()
