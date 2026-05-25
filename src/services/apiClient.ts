import { API_BASE_URL } from "../config/api";
import { authService, UnauthorizedError } from "./authService";

export async function apiFetch(path: string, init: RequestInit = {}) {
    const token = authService.getAccessToken();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            ...init.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (response.status === 401) {
        authService.clearSession();
        throw new UnauthorizedError();
    }

    return response;
}
