import { MapPin } from "lucide-react";
import { getExtracted } from "next-intl/server";

import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { Content, PassportHeader } from "./page.css";

const page = async () => {
	const t = await getExtracted("profile");

	return (
		<Content>
			<PassportHeader>
				<h2>{t("Hermes Traveler's Passport")}</h2>
				<div className="badges">
					<button type="button">Турист</button>
					<button type="button">
						<MapPin size={16} className="icon" />
						<span>50</span>
					</button>
				</div>
			</PassportHeader>
			<ProfileForm />
		</Content>
	);
};

export default page;
