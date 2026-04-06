import { User } from "@/types/users";
import { authHost } from ".";

export const getProfile = async () => {
	const { data } = await authHost.get(`/users/me`);
	return User.parse(data);
};

export const updateProfile = async (body: FormData) => {
	const { data } = await authHost.post("/users/me", body);
	return data;
};
