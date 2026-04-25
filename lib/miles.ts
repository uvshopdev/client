import { Miles } from "@/types/miles";
import { authHost } from ".";
import type { MileType } from "./../types/miles";

export const getUserMiles = async () => {
	const { data } = await authHost.get(`/users/me/miles`);
	return Miles.parse(data);
};

export const getMilesSummary = (miles: MileType[]) => {
	return miles.reduce((accumulator, item) => accumulator + item.amount - item.spent, 0);
};
