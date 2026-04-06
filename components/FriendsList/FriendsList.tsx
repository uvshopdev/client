"use client";

import { useQuery } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import Image from "next/image";

import { getReferrals } from "@/lib/referrals";
import { Item, Items } from "./FriendsList.css";

const FriendsList = () => {
	const t = useExtracted("profile");

	const { data, isSuccess } = useQuery({
		queryKey: ["friends"],
		queryFn: async () => await getReferrals(),
		staleTime: 3 * 60 * 1000,
	});

	return (
		<Items>
			{isSuccess &&
				data.map((r) => (
					<Item key={r.id}>
						<div className="image">
							<Image
								src={r.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/${r.picture}` : "/logo.png"}
								width={34}
								height={34}
								alt=""
								unoptimized={true}
							/>
						</div>
						<div>{r.full_name}</div>
						<div className="status">{t("Waiting for the first purchase")}</div>
					</Item>
				))}
		</Items>
	);
};

export default FriendsList;
