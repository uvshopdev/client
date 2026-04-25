import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { ProductType } from "@/types/products";

export interface Position {
	product: ProductType;
	amount: number;
}

interface BasketStore {
	positions: Record<number, Position>;
	subtotal: number;
	info: {
		name: string;
		email: string;
		phone_number: string;
		payment_method: string;
		delivery_method: string;
		address: string;
		postal_code: string;
		message: string;
		bonus_points_to_redeem: number;
	};

	addPosition: (product: ProductType, amount: number) => boolean;
	removePosition: (id: number) => void;
	setPositionAmount: (id: number, amount: number) => void;
	setInfo: <K extends keyof BasketStore["info"]>(key: K, value: BasketStore["info"][K]) => void;
	reset: () => void;
}

const calculateSubtotal = (positions: Record<number, Position>) =>
	Object.values(positions).reduce((sum, { product, amount }) => sum + product.price * amount, 0);

export const useBasket = create<BasketStore>()(
	devtools(
		persist(
			(set, get) => ({
				positions: {},
				subtotal: 0,
				info: {
					name: "",
					email: "",
					phone_number: "",
					payment_method: "",
					delivery_method: "",
					address: "",
					postal_code: "",
					message: "",
					bonus_points_to_redeem: 0,
				},

				addPosition: (product, amount) => {
					const alreadyIn = Boolean(get().positions[product.id]);
					set((state) => {
						const currentAmount = state.positions[product.id]?.amount ?? 0;
						const positions = {
							...state.positions,
							[product.id]: { product, amount: currentAmount + amount },
						};
						const subtotal = calculateSubtotal(positions);
						return { positions, subtotal };
					});
					return alreadyIn;
				},
				removePosition: (id) =>
					set((state) => {
						const positions = Object.fromEntries(Object.entries(state.positions).filter(([key]) => key !== String(id)));
						return {
							positions,
							subtotal: calculateSubtotal(positions),
						};
					}),
				setPositionAmount: (id, amount) =>
					set((state) => {
						if (!state.positions[id]) {
							return state;
						}

						if (amount <= 0) {
							const positions = Object.fromEntries(Object.entries(state.positions).filter(([key]) => key !== String(id)));
							return { positions, subtotal: calculateSubtotal(positions) };
						}

						const positions = {
							...state.positions,
							[id]: {
								...state.positions[id],
								amount,
							},
						};

						return { positions, subtotal: calculateSubtotal(positions) };
					}),
				setInfo: (key, value) => set((state) => ({ info: { ...state.info, [key]: value } })),
				reset: () =>
					set({
						positions: {},
						subtotal: 0,
						info: {
							name: "",
							email: "",
							phone_number: "",
							payment_method: "",
							delivery_method: "",
							address: "",
							postal_code: "",
							message: "",
							bonus_points_to_redeem: 0,
						},
					}),
			}),
			{ name: "basket_info" },
		),
		{ name: "BasketStore" },
	),
);
