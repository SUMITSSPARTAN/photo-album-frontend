import { API_BASE_URL } from "../config/api";

const ACCESS_TOKEN_KEY = "accessToken";

export class UnauthorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = "UnauthorizedError";
    }
}

export const authService = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    isAuthenticated() {
        return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
    },

    clearSession() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    async login(email: string, password: string) {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        const data = await response.json();

        if (typeof data.accessToken !== "string") {
            throw new Error("Login response did not include an access token");
        }

        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        return data.accessToken;
    },
};
