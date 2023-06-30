export interface FetchPackagesPayload {
  pagedQuery?: {
    keyword?: string;
    pageNumber?: number;
    pageSize?: number;
  };
  dateFilter?: {
    from?: string;
    to?: string;
  };
  textFilter?: {
    keyword?: string;
  };
}

export interface Packages {
  status: string;
  numberOfItems: number;
  weightOfPackage: number;
  packagePlacedBy: string;
  packageDescription: string;
  expectedDeliveryDate: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLandMark: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  pickupDate: string;
  pickUpAddress: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpLandMark: string;
  id: string;
  trackingNumber: string;
}

export interface PackagesResponse {
    items: Packages[];
    totalItemCount: number;
    totalPageCount: number;
    currentPageSize: number;
    currentPageNumber: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
