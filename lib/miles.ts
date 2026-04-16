import { Miles } from "@/types/miles";
import { authHost } from ".";

export const getUserMiles = async () => {
	const { data } = await authHost.get(`/users/me/miles`);
	return Miles.parse(data);
};

export const getMilesSummary = (miles: ReturnType<typeof Miles.parse>) => {
	const currentYear = new Date().getFullYear();

	return miles.reduce(
		(accumulator, item) => {
			const activeMiles = Math.max(item.amount - item.spent, 0);
			const insertedYear = new Date(item.inserted_at).getFullYear();

			accumulator.currentMiles += activeMiles;
			if (insertedYear === currentYear) {
				accumulator.currentYearMiles += activeMiles;
			} else {
				accumulator.previousYearMiles += activeMiles;
			}

			return accumulator;
		},
		{
			currentMiles: 0,
			previousYearMiles: 0,
			currentYearMiles: 0,
		},
	);
};
