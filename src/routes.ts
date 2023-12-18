export interface RouteType{
    path: string;
    pattern?: RegExp;
}

export const protectedRoutes: RouteType[] = [
    { path: '/dashboard', pattern: /^\/dashboard.*$/ },
    { path: '/riders', pattern: /^\/riders.*$/ },
];

export const authRoutes: RouteType[] = [
    { path: '/sign-in' },
    { path: '/create-account' },
    { path: '/create-password', pattern: /^\/create-password.*$/  },
]