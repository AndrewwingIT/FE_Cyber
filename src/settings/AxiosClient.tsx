import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from 'sonner';

// State variables to handle concurrent requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void, reject: (reason?: any) => void }> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};


const api = axios.create({
    // baseURL: ${import.meta.env.VITE_API_URL},
    // withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Only handle 401 errors
        if (error.response?.status === 401 && originalRequest.url !== '/v2/auth/refresh') {

            if (isRefreshing) {
                // If refreshing, push request to queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // When new token is available (first request successfully refreshed),
                        // just retry the request. Browser will automatically attach new cookie.
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token API.
                // We don't need to receive data because new token is set in httpOnly cookie
                // through 'Set-Cookie' header from server.
                await api.post("/v2/auth/refresh");

                processQueue(null);

                return api(originalRequest);

            } catch (refreshError: any) {
                // If refresh fails, cancel queue and logout
                processQueue(refreshError);

                console.error("Session has expired. Please login again.");

                // Best practice: Call logout API to clear httpOnly cookie on server
                await api.post('/v2/auth/logout');

                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as { message?: string };
            let conflictMessage = data?.message || "Data conflict occurred. Please try again.";
            switch (status) {
                case 403:
                    toast.error("You don't have permission to perform this action.");
                    break;
                case 404:
                    toast.warning("The resource you requested does not exist.");
                    break;
                case 409:
                    toast.warning(conflictMessage);
                    break;
                case 500:
                    break;
                case 502:
                    break;
                case 503:
                    toast.warning("Server system is experiencing issues.");
                    break;
                default:
                    toast.warning(conflictMessage);
                    break;
            }
        } else if (error.request) {
            toast("Unable to connect to server. Please check your network connection.");
        }

        return Promise.reject(error);
    }
);

export default api;