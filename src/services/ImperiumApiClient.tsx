import { AUTH_KEY } from "@/constants/cookie.config";
import { CreateAccountPayload, CreateRiderPayload } from "@/types/requests/CreateAccountPayload";
import { CreatePackagePayload } from "@/types/requests/CreatePackagePayload";
import { CreatePasswordPayload } from "@/types/requests/CreatePasswordPayload";
import { AssignPackagaePayload, UpdatePackagePayload } from "@/types/requests/PackagePayload";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { SignInPayload } from "@/types/requests/SignInPayload";
import { UpdateCompanyPayload } from "@/types/requests/UpdateCompany";
import { UpdateRiderPayload } from "@/types/requests/UpdateRider";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { CompanyData } from "@/types/responses/CompanyData";
import { PackageAdminListData } from "@/types/responses/PackageAdminListData";
import { PackageCreatedData } from "@/types/responses/PackageCreatedData";
import { PackageTrackingData } from "@/types/responses/PackageTrackingData";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { RiderData } from "@/types/responses/RiderData";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import axios, { AxiosInstance } from "axios";


class ImperiumApiClient {

    // Instance variables
    private _axiosInstance!: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    public cacheTTL: number = 60 // 1 minute
    public adminListLoading = false;
    public riderListLoading = false;
    
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

        if (key === 'rider') {
            this.riderListLoading = value;
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

    public async getCustomerPackageList(query: PaginatedQuery): Promise<ApiResponse<PaginatedResponse<PackageAdminListData>>>{
        const url = `/Package/customerlist`;
        const cacheKey = `/Package/customerlist/${JSON.stringify(query)}`;

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

    public async getRiderPackageList(query: PaginatedQuery, loadingCb?: (loading: boolean)=> void): Promise<ApiResponse<PaginatedResponse<PackageAdminListData>>>{
        const url = `/Package/riderList`;
        const cacheKey = `/Package/riderList/${JSON.stringify(query)}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        // this.adminListLoading = true;
        loadingCb && loadingCb(true);
        let response = await this._axiosInstance.post<ApiResponse<PaginatedResponse<PackageAdminListData>>>(url, query);

        // this.adminListLoading = false;
        // Update the cache with the fresh data
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

        loadingCb && loadingCb(false);

        return response.data
    }

    public async getSinglePackage(id: string): Promise<ApiResponse<PackageAdminListData>>{
        const cacheKey = `/Package/id/${id}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        // this.adminListLoading = true;
        let response = await this._axiosInstance.get<ApiResponse<PackageAdminListData>>(cacheKey);

        // this.adminListLoading = false;
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

    public async updateRiderProfile(payload: UpdateRiderPayload): Promise<ApiResponse<RiderData>>{
        const url = `/Rider/update`;

        let response = await this._axiosInstance.post<ApiResponse<RiderData>>(url, payload);
        
        // Reset cache
        this.cache.clear();

        return response.data
    }

    public async createNewPackage(payload: CreatePackagePayload): Promise<ApiResponse<PackageCreatedData>>{
        const url = `/Package/create`;

        let response = await this._axiosInstance.post<ApiResponse<PackageCreatedData>>(url, payload);

        
        // Reset cache
        this.cache.clear();

        return response.data
    }

    public async getCompanyList(query: PaginatedQuery, loadingCb?: (loading: boolean)=> void): Promise<ApiResponse<PaginatedResponse<CompanyData>>>{
        const url = `/Company/list`;
        const cacheKey = `/Company/list/${JSON.stringify(query)}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        loadingCb && loadingCb(true);

        // this.adminListLoading = true;
        let response = await this._axiosInstance.post<ApiResponse<PaginatedResponse<CompanyData>>>(url, query);

        // this.adminListLoading = false;
        // Update the cache with the fresh data
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

        loadingCb && loadingCb(false);

        return response.data
    }

    public async getRiderList(query: PaginatedQuery, loadingCb?: (loading: boolean)=> void): Promise<ApiResponse<PaginatedResponse<RiderData>>>{
        const url = `/Rider/list`;
        const cacheKey = `/Rider/list/${JSON.stringify(query)}`;

        // First check cache
        const cachedData = this.cache.get(cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp <= this.cacheTTL * 1000) {
            return cachedData.data;
        }

        loadingCb && loadingCb(true);

        // this.adminListLoading = true;
        let response = await this._axiosInstance.post<ApiResponse<PaginatedResponse<RiderData>>>(url, query);

        // this.adminListLoading = false;
        // Update the cache with the fresh data
        this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });

        loadingCb && loadingCb(false);

        return response.data
    }

    public async createRiderProfile(payload: CreateRiderPayload): Promise<ApiResponse<string>>{
        const url = `/Rider/account`;

        let response = await this._axiosInstance.post<ApiResponse<string>>(url, payload);
        
        // Reset cache
        this.cache.clear();

        return response.data
    }

    public async updateCompanyProfile(payload: UpdateCompanyPayload): Promise<ApiResponse<CompanyData>>{
        const url = `/Company/update`;

        let response = await this._axiosInstance.post<ApiResponse<CompanyData>>(url, payload);
        
        // Reset cache
        this.cache.clear();

        return response.data
    }

    public async assignPackage(payload: AssignPackagaePayload): Promise<ApiResponse<string>>{
        const url = `/Package/assign`;

        let response = await this._axiosInstance.post<ApiResponse<string>>(url, payload);
        
        // Reset cache
        this.cache.clear();

        return response.data
    }


}

export default new ImperiumApiClient()
