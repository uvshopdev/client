import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
	accessToken: string | null;

	setAccessToken: (accessToken: string) => void;
}

export const useUser = create<UserStore>()(
	devtools(
		persist(
			(set) => ({
				accessToken: null,
				user: { favorites: [], referrals: [] },

				setAccessToken: (accessToken) => set(() => ({ accessToken })),
			}),
			{ name: "auth_info" },
		),
		{ name: "UserStore" },
	),
);
