import { Icons } from '../Icons/Icons';

export const USER_SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <Icons currentColor="white" name="dashboard" />,
    activeIcon: <Icons currentColor="#000000" name="dashboard" />,
    path: '/dashboard/user',
    hasDropdown: false,
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: <Icons currentColor="white" name="payment" />,
    activeIcon: <Icons currentColor="#000000" name="payment" />,
    path: '/dashboard/user/payment',
    hasDropdown: false,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Icons currentColor="white" name="settings" />,
    activeIcon: <Icons currentColor="#000000" name="settings" />,
    path: '/dashboard/user/settings',
    hasDropdown: false,
  },
  {
    id: 'support',
    name: 'Support',
    icon: <Icons currentColor="white" name="support" />,
    activeIcon: <Icons currentColor="#000000" name="support" />,
    path: '/dashboard/user/support',
    hasDropdown: false,
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: <Icons currentColor="white" name="logout" />,
    activeIcon: <Icons currentColor="#000000" name="logout" />,
    path: '/logout',
    hasDropdown: false,
  },
];
export const ADMIN_SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <Icons currentColor="white" name="dashboard" />,
    activeIcon: <Icons currentColor="#000000" name="dashboard" />,
    path: '/dashboard/back-office',
    hasDropdown: false,
  },
  {
    id: 'user-mgmt',
    name: 'User Management',
    icon: <Icons currentColor="white" name="users" />,
    activeIcon: <Icons currentColor="#000000" name="users" />,
    path: '/dashboard/back-office/user-management/customers',
    hasDropdown: true
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Icons currentColor="white" name="settings" />,
    activeIcon: <Icons currentColor="#000000" name="settings" />,
    path: '/dashboard/back-office/settings',
    hasDropdown: false,
  },
  {
    id: 'support',
    name: 'Support',
    icon: <Icons currentColor="white" name="support" />,
    activeIcon: <Icons currentColor="#000000" name="support" />,
    path: '/dashboard/back-office/support',
    hasDropdown: false,
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: <Icons currentColor="white" name="logout" />,
    activeIcon: <Icons currentColor="#000000" name="logout" />,
    path: '/logout',
    hasDropdown: false,
  },
];
export const RIDER_SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <Icons currentColor="white" name="dashboard" />,
    activeIcon: <Icons currentColor="#000000" name="dashboard" />,
    path: '/dashboard/rider',
    hasDropdown: false,
  },
  {
    id: 'deliveryHistory',
    name: 'Delivery History',
    icon: <Icons currentColor="white" name="delivery" />,
    activeIcon: <Icons currentColor="#000000" name="delivery" />,
    path: '/dashboard/rider/delivery-history',
    hasDropdown: false,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Icons currentColor="white" name="settings" />,
    activeIcon: <Icons currentColor="#000000" name="settings" />,
    path: '/dashboard/rider/settings',
    hasDropdown: false,
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: <Icons currentColor="white" name="logout" />,
    activeIcon: <Icons currentColor="#000000" name="logout" />,
    path: '/logout',
    hasDropdown: false,
  },
];

export const USER_MANAGEMENT_SUBMENU = [
  {
    id: 'customers_sub_menu',
    name: 'Customers',
    path: '/dashboard/back-office/user-management/customers',
  },
  {
    id: 'riders_sub_menu',
    name: 'Delivery Riders',
    path: '/dashboard/back-office/user-management/riders',
  }
]
