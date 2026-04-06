"use client";

import { Coffee, Handshake, Heart, History, LogOut, MapPin, User } from "lucide-react";
import { useExtracted } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Content, Item, ItemIcon, Items } from "./ProfileBar.css";

const ProfileBar = () => {
	const t = useExtracted("profile");
	const pathname = usePathname();

	const items = [
		{ href: "/profile", Icon: User, label: t("Profile") },
		{ href: "/profile/favorites", Icon: Heart, label: t("Favorites") },
		{ href: "/profile/orders", Icon: History, label: t("Order history") },
		{ href: "/profile/countries", Icon: MapPin, label: t("Countries") },
		{ href: "/profile/friends", Icon: Handshake, label: t("Hermes Friends") },
		{ href: "/profile/coffee", Icon: Coffee, label: t("Coffee passport") },
	];

	return (
		<Content>
			<Items>
				{items.map(({ href, Icon, label }) => (
					<Item key={href} $active={pathname === href}>
						<Link href={href} prefetch>
							<ItemIcon>
								<Icon strokeWidth={1} absoluteStrokeWidth />
							</ItemIcon>
							{label}
						</Link>
					</Item>
				))}
				<Item $active={pathname === "/profile/logout"}>
					<Link href={"/profile/logout"} prefetch={false}>
						<ItemIcon>
							<LogOut strokeWidth={1} absoluteStrokeWidth />
						</ItemIcon>
						{t("Logout")}
					</Link>
				</Item>
			</Items>
		</Content>
	);
};

export default ProfileBar;
