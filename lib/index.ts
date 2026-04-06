import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useUser } from "@/store/user";

const host = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, withCredentials: true });
export const authHost = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, withCredentials: true });

authHost.interceptors.request.use(
	async (config) => {
		let token = useUser.getState().accessToken;
		if (!token) {
			try {
				const { data } = await host.get("/users/auth/refresh");
				useUser.getState().setAccessToken(data.access_token);
				token = data.access_token;
			} catch (error) {
				return Promise.reject(error);
			}
		}
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
authHost.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401 && !error.config._retry) {
			error.config._retry = true;
			try {
				const { data } = await host.get("/users/auth/refresh");
				useUser.getState().setAccessToken(data.access_token);
				error.config.headers.Authorization = `Bearer ${data.access_token}`;
				const retryResponse = await host.request(error.config);
				return retryResponse;
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
});

export default host;
