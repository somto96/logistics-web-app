import { ApiResponse } from "@/types/responses/ApiResponse";
import { PackageTrackingData } from "@/types/responses/PackageTrackingData";
import axios, { AxiosInstance } from "axios"


class ImperiumApiClient {

    // Instance variables
    private _axiosInstance!: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    public cacheTTL: number = 60 // 1 minute
    
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

}

export default new ImperiumApiClient()
