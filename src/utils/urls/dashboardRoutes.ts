export const POST_FETCH_PACKAGES: string = '/Package/customerlist';
export const POST_CREATE_PACKAGE: string = '/Package/create';

// BACKOFFICE
export const POST_FETCH_ADMIN_PACKAGES: string = '/Package/adminlist';
export const POST_FETCH_RIDERS_LIST: string = '/Rider/list';
export const POST_FETCH_CUSTOMERS_LIST: string = '/Company/list';
export const GET_RIDER_DETAILS = (id: string) => `/Rider/id/${id}`;
export const POST_ASSIGN_PACKAGES: string = '/Package/assign';
export const POST_UPDATE_PACKAGE_STATUS: string = '/Package/update';
export const POST_UPDATE_RIDER_DETAILS: string = '/Rider/update';
export const POST_ADD_NEW_RIDER: string = '/Rider/account';
export const POST_UPDATE_CUSTOMER_DETAILS: string = '/Company/update';
export const GET_PACKAGE_DETAILS = (trackingNum: string) => `/Package/trackingnumber/${trackingNum}`;
export const GET_COMPANY_ANALYTICS = (companyId: string) => `/Company/analytics?companyId=${companyId}`;
