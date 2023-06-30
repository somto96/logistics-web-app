import { Icons } from "../Icons/Icons"


export const USER_SIDEBAR_LINKS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <Icons currentColor="white" name="dashboard" />,
    activeIcon: <Icons currentColor="#000000" name="dashboard" />,
    path: '/dashboard/user',
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: <Icons currentColor="white" name="payment" />,
    activeIcon: <Icons currentColor="#000000" name="payment" />,
    path: '/dashboard/user/payment',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Icons currentColor="white" name="settings" />,
    activeIcon: <Icons currentColor="#000000" name="settings" />,
    path: '/dashboard/user/settings',
  },
  {
    id: 'support',
    name: 'Support',
    icon: <Icons currentColor="white" name="support" />,
    activeIcon: <Icons currentColor="#000000" name="support" />,
    path: '/dashboard/user/support',
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: <Icons currentColor="white" name="logout" />,
    activeIcon: <Icons currentColor="#000000" name="logout" />,
    path: '/logout',
  },
];
