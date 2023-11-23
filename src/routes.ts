export interface RouteType{
    path: string;
    pattern?: RegExp;
}

export const protectedRoutes: RouteType[] = [
    { path: '/dashboard', pattern: /^\/dashboard.*$/ },
];

export const authRoutes: RouteType[] = [
    { path: '/sign-in' },
    { path: '/create-account' },
    { path: '/create-password', pattern: /^\/create-password.*$/  },
]