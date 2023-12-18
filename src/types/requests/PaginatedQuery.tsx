export interface PaginatedQuery{
    "pagedQuery": {
        "pageNumber": number;
        "pageSize": number;
    },
    "dateFilter"?: {
        "from": string; //Date
        "to": string; //Date
    },
    "textFilter"?: {
        "keyword": string; // Tracking number
    },
    "status"?: number;
    "riderId"?: string;
}