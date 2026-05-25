export const routes = {
    login: "/login",
    desktop: "/",
} as const;

export type AppRoute = typeof routes[keyof typeof routes];

export const getInitialRoute = (isAuthenticated: boolean): AppRoute =>
    isAuthenticated ? routes.desktop : routes.login;

export const getRouteFromPath = (path: string, isAuthenticated: boolean): AppRoute => {
    if (!isAuthenticated) {
        return routes.login;
    }

    return path === routes.login ? routes.login : routes.desktop;
};
