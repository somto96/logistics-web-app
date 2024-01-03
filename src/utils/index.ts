import { PackageStatus } from "@/types/responses/PackageAdminListData";

export type WebsiteMenuLinks = {
  title: string;
  id: string | number;
  path: string;
};

export type PackageDescriptions = {
  id: string | number;
  title: string;
  value: string;
}

export const PACKAGE_DESCRIPTIONS: PackageDescriptions[] = [
  {
    id: 0,
    title: "Beverages",
    value: "beverages",
  },
  {
    id: 1,
    title: "Comestics",
    value: "comestics",
  },
  {
    id: 3,
    title: "Wears",
    value: "wears",
  },
  {
    id: 4,
    title: "Kitchen utensils",
    value: "kitchen utensils",
  },
  {
    id: 5,
    title: "Electronics",
    value: "electronics",
  },
  {
    id: 6,
    title: "Provisions",
    value: "provisions",
  },
  {
    id: 7,
    title: "General goods",
    value: "general goods",
  },
]

export const PACKAGE_STATUS = [
  {
    id: 0,
    label: 'All',
    value: 'all',
  },
  {
    id: 1,
    label: 'AvailableForPickUp',
    value: 'availableForPickUp',
  },
  {
    id: 2,
    label: 'Delivered',
    value: 'delivered',
  },
  {
    id: 3,
    label: 'In Delivery',
    value: 'inDelivery',
  },
  {
    id: 4,
    label: 'Warehouse',
    value: 'warehouse',
  },
  {
    id: 5,
    label: 'Picked Up',
    value: 'pickedUp',
  },
  {
    id: 6,
    label: 'Undelivered',
    value: 'undelivered',
  },
  {
    id: 7,
    label: 'SLA Breach',
    value: 'slaBreach',
  },
 
];

export const RIDER_STATUS = [
  {
    id: 0,
    label: 'All',
    value: 'all',
  },
  {
    id: 1,
    label: 'Active',
    value: 'active',
  },
  {
    id: 2,
    label: 'Inactive',
    value: 'inactive',
  },
]
export const TRACKING_STATUS = [
  // AvailableForPickUp = 0,
  // PickedUp = 1,
  // WareHouse = 2,
  // InDelivery = 3,
  // UnDelivered = 4,
  // SLABreach = 5,
  // Delivered = 6

  {
    id: 0,
    label: 'Available For PickUp',
    value: 0,
  },
  {
    id: 1,
    label: 'Delivered',
    value: 6,
  },
  {
    id: 2,
    label: 'In Delivery',
    value: 3,
  },
  {
    id: 3,
    label: 'Warehouse',
    value: 2,
  },
  {
    id: 4,
    label: 'Picked Up',
    value: 1,
  },
  {
    id: 5,
    label: 'Undelivered',
    value: 4,
  },
  {
    id: 6,
    label: 'SLA Breach',
    value: 5,
  },
 
];

export const LOCATIONS = [
  {
    id: 1,
    label: "Agbado",
    value: "Agbado"
  },
  {
    id: 2,
    label: "Agboyi",
    value: "Agboyi"
  },
  {
    id: 3,
    label: "Alimosho",
    value: "Alimosho"
  },
  {
    id: 4,
    label: "Ajah",
    value: "Ajah"
  },
  {
    id: 5,
    label: "Ayobo",
    value: "Ayobo"
  },
  {
    id: 6,
    label: "Bariga",
    value: "Bariga"
  },
  {
    id: 7,
    label: "Egbeda-Idimu",
    value: "Egbeda-Idimu"
  },
  {
    id: 8,
    label: "Ejigbo",
    value: "Ejigbo"
  },
  {
    id: 9,
    label: "Igando-Ikotun",
    value: "Igando-Ikotun"
  },
  {
    id: 10,
    label: "Magodo",
    value: "Magodo"
  },
]

export const WEBSITE_MENU_LINKS: WebsiteMenuLinks[] = [
  {
    title: 'Home',
    id: 'home',
    path: '/',
  },
  {
    title: 'Our services',
    id: 'our-services',
    path: '#our-services',
  },
  {
    title: 'About us',
    id: 'about-us',
    path: '/about-us',
  },
  {
    title: 'Sign in',
    id: 'sign-in',
    path: '/sign-in',
  },
];

export const DROPDOWN_LINKS: WebsiteMenuLinks[] = [
  {
    id: 'log-out',
    title: 'Logout',
    path: '/logout',
  },
];
export const MOBILE_DROPDOWN_LINKS: WebsiteMenuLinks[] = [
  {
    id: 'api-doc',
    title: 'Api Documentation',
    path: '/api',
  },
  {
    id: 'add-new-delivery',
    title: 'Add New Delivery',
    path: '/add-new-delivery',
  },
  {
    id: 'log-out',
    title: 'Logout',
    path: '/logout',
  },
];

export const QUICK_LINKS = [
  {
    id: 'about-us',
    title: 'About us',
    path: '/about-us',
  },
  {
    id: 'track',
    title: 'Track',
    path: '/',
  },
  {
    id: 'apiDoc',
    title: 'API Documentation',
    path: '/',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    path: '/',
  },
];

export const GET_STARTED_LINKS = [
  {
    id: 'create-account',
    title: 'Create account',
    path: '/create-account',
  },
  {
    id: 'sign-in',
    title: 'Sign in',
    path: '/sign-in',
  },
];
export const LEGAL_LINKS = [
  {
    id: 'terms-and-conditions',
    title: 'Terms and conditions',
    path: '/terms-and-conditions',
  },
  {
    id: 'privacy-policy',
    title: 'Privacy policy',
    path: '/privacy-policy',
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'ig',
    src: 'images/svgs/ig-icon.svg',
    alt: 'Instagram icon',
  },
  {
    id: 'tweet',
    src: 'images/svgs/twitter-icon.svg',
    alt: 'Twitter icon',
  },
  {
    id: 'fb',
    src: 'images/svgs/fb-icon.svg',
    alt: 'Facebook icon',
  },
  {
    id: 'linkedin',
    src: 'images/svgs/linkedin-icon.svg',
    alt: 'LinkedIn icon',
  },
];

export const STATES = [
  {
    id: 0,
    label: 'Abia',
    value: 'Abia',
  },
  {
    id: 1,
    label: 'Adamawa',
    value: 'Adamawa',
  },
  {
    id: 2,
    label: 'Akwa Ibom',
    value: 'Akwa Ibom',
  },
  {
    id: 3,
    label: 'Anambra',
    value: 'Anambra',
  },
  {
    id: 4,
    label: 'Bauchi',
    value: 'Bauchi',
  },
  {
    id: 5,
    label: 'Bayelsa',
    value: 'Bayelsa',
  },
  {
    id: 6,
    label: 'Benue',
    value: 'Benue',
  },
  {
    id: 7,
    label: 'Borno',
    value: 'Borno',
  },
  {
    id: 8,
    label: 'Cross River',
    value: 'Cross River',
  },
  {
    id: 9,
    label: 'Delta',
    value: 'Delta',
  },
  {
    id: 10,
    label: 'Ebonyi',
    value: 'Ebonyi',
  },
  {
    id: 11,
    label: 'Edo',
    value: 'Edo',
  },
  {
    id: 12,
    label: 'Ekiti',
    value: 'Ekiti',
  },
  {
    id: 13,
    label: 'Enugu',
    value: 'Enugu',
  },
  {
    id: 14,
    label: 'FCT - Abuja',
    value: 'FCT - Abuja',
  },
  {
    id: 15,
    label: 'Gombe',
    value: 'Gombe',
  },
  {
    id: 16,
    label: 'Imo',
    value: 'Imo',
  },
  {
    id: 17,
    label: 'Jigawa',
    value: 'Jigawa',
  },
  {
    id: 18,
    label: 'Kaduna',
    value: 'Kaduna',
  },
  {
    id: 19,
    label: 'Kano',
    value: 'Kano',
  },
  {
    id: 20,
    label: 'Katsina',
    value: 'Katsina',
  },
  {
    id: 21,
    label: 'Kebbi',
    value: 'Kebbi',
  },
  {
    id: 22,
    label: 'Kogi',
    value: 'Kogi',
  },
  {
    id: 23,
    label: 'Kwara',
    value: 'Kwara',
  },
  {
    id: 24,
    label: 'Lagos',
    value: 'Lagos',
  },
  {
    id: 25,
    label: 'Nasarawa',
    value: 'Nasarawa',
  },
  {
    id: 26,
    label: 'Niger',
    value: 'Niger',
  },
  {
    id: 27,
    label: 'Ogun',
    value: 'Ogun',
  },
  {
    id: 28,
    label: 'Ondo',
    value: 'Ondo',
  },
  {
    id: 29,
    label: 'Osun',
    value: 'Osun',
  },
  {
    id: 30,
    label: 'Oyo',
    value: 'Oyo',
  },
  {
    id: 31,
    label: 'Plateau',
    value: 'Plateau',
  },
  {
    id: 32,
    label: 'Rivers',
    value: 'Rivers',
  },
  {
    id: 33,
    label: 'Sokoto',
    value: 'Sokoto',
  },
  {
    id: 34,
    label: 'Taraba',
    value: 'Taraba',
  },
  {
    id: 35,
    label: 'Yobe',
    value: 'Yobe',
  },
  {
    id: 36,
    label: 'Zamfara',
    value: 'Zamfara',
  },
];

export const PORTFOLIO = [
  {
    id: 1,
    title: 'Our clients',
    description: 'Our clients grows on a daily basis. you are welcome to join us.',
    numbers: '1.2M+',
  },
  {
    id: 2,
    title: 'Our riders',
    description: 'Readily available riders to complete delivery to customers',
    numbers: '500k+',
  },
  {
    id: 3,
    title: 'Completed delivery',
    description: 'We have completed and still completing deliveries everywhere',
    numbers: '12.3M+',
  },
];

export const TEAMS = [
  {
    id: 1,
    url: 'images/pngs/profile-1.png',
    name: 'Kolade Johnson',
    position: 'Chairman',
  },
  {
    id: 2,
    url: 'images/pngs/profile-2.png',
    name: 'Pete Obi',
    position: 'President',
  },
  {
    id: 3,
    url: 'images/pngs/profile-3.png',
    name: 'Vanessa Doeh',
    position: 'Vice President',
  },
  {
    id: 4,
    url: 'images/pngs/profile-4.png',
    name: 'Ramsey Steve',
    position: 'Treasurer',
  },
  {
    id: 5,
    url: 'images/pngs/profile-1.png',
    name: 'Dumebi Austin',
    position: 'Accountant',
  },
  {
    id: 6,
    url: 'images/pngs/profile-2.png',
    name: 'Katie Johnson',
    position: 'Logistic Director',
  },
  {
    id: 7,
    url: 'images/pngs/profile-3.png',
    name: 'John Doe',
    position: 'I.T Expert',
  },
  {
    id: 8,
    url: 'images/pngs/profile-2.png',
    name: 'Rita Kolade',
    position: 'Operation Lead',
  },
];

export const statusType = (type: any) => {
  switch (type) {
    case "availableforpickup":
      return "#FFFFFF";
    case "delivered":
      return "#219653";
    case "indelivery":
      return "#2D9CDB";
    case "warehouse":
      return "#F2994A";
    case "pickedup":
      return "#0D0D0D";
    case "undelivered":
      return "#EB5757";
    default:
      return "#F2C94C";
  }
};
export const statusText = (type: any) => {
  switch (type) {
    case "availableforpickup":
      return "Available For Pickup";
    case "delivered":
      return "Delivered";
    case "indelivery":
      return "In Delivery";
    case "warehouse":
      return "Warehouse";
    case "pickedup":
      return "Picked Up";
    case "undelivered":
      return "Undelivered";
    default:
      return "SLABreach";
  }
};

export const PACKAGES_TABLE_HEADERS = [
  {
    id: 0,
    name: "TRACKING ID"
  },
  {
    id: 1,
    name: "PICK UP ADDRESS"
  },
  {
    id: 2,
    name: "DELIVERY ADDRESS"
  },
  {
    id: 3,
    name: "CUSTOMER NAME"
  },
  {
    id: 4,
    name: "STATUS"
  },
]
export const ADMIN_PACKAGES_TABLE_HEADERS = [
  {
    id: 0,
    name: "TRACKING ID"
  },
  // {
  //   id: 1,
  //   name: "PICK UP ADDRESS"
  // },
  // {
  //   id: 2,
  //   name: "DELIVERY ADDRESS"
  // },
  {
    id: 3,
    name: "CUSTOMER NAME"
  },
  {
    id: 4,
    name: "STATUS"
  },
  {
    id: 5,
    name: "ACTION"
  },
]
export const RIDERS_TABLE_HEADERS = [
  {
    id: 0,
    name: "FULLNAME"
  },
  // {
  //   id: 1,
  //   name: "LAST NAME"
  // },
  {
    id: 2,
    name: "COMPANY PHONE NO"
  },
  {
    id: 4,
    name: "COMPANY EMAIL"
  },
  {
    id: 5,
    name: "STATUS"
  },
]
export const CUSTOMERS_TABLE_HEADERS = [
  {
    id: 0,
    name: "FULLNAME"
  },
  {
    id: 2,
    name: "COMPANY PHONE NO"
  },
  {
    id: 4,
    name: "COMPANY EMAIL"
  },
  {
    id: 5,
    name: "STATUS"
  },
]

export const packageDetailsTitleAndDescription = (status: PackageStatus) => {
  switch (status) {
    case PackageStatus.AVAILABLE_FOR_PICKUP:
      return {
        title: "Available for Pick Up",
        sub: "Your package is on it’s way to our warehouse"
      };
    case PackageStatus.DELIVERED:
      return {
        title: "Delivery completed",
        sub: "Package was successfully delivered"
      };
    case PackageStatus.IN_DELIVERY:
      return {
        title: "Package in delivery",
        sub: "We are heading towards customer location"
      };
    case PackageStatus.WAREHOUSE:
      return {
        title: "Package at our warehouse",
        sub: "Package arrived our facility"
      };
    case PackageStatus.PICKUP:
      return {
        title: "Package Picked Up",
        sub: "Your package is on it’s way to our warehouse"
      };
    case PackageStatus.UNDELIVERED:
      return {
        title: "We wouldn’t complete delivery",
        sub: "Customer not available to receive package"
      };
    default:
      return {
        title: "In breach of SLA",
        sub: "For some reasons, we couldn’t deliver in time"
      };
  }
}
