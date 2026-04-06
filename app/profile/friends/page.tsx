import { getExtracted } from "next-intl/server";

import FriendsList from "@/components/FriendsList/FriendsList";
import { Content } from "./page.css";

const page = async () => {
	const t = await getExtracted("profile");

	return (
		<Content>
			<div>
				<div className="info">{t("Invite friends and get bonuses!")}</div>
				<div>
					{t(
						"Get +50 miles and coffee after your friend makes their first purchase for an amount of 150 UAH or more.",
					)}
				</div>
			</div>
			<FriendsList />
		</Content>
	);
};

export default page;
