export interface PaginatedResponse<T = any>{
    "items": T[],
    "totalItemCount": number;
    "totalPageCount": number;
    "currentPageSize": number;
    "currentPageNumber": number;
    "hasPrevious": boolean;
    "hasNext": boolean;
}