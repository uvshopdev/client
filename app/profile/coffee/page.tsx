"use client";

import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";

import { getCoffee } from "@/lib/coffee";
import {
	Card,
	Content,
	CounterBadge,
	FreeCoffeeGrid,
	FreeCoffeeItem,
	HeaderInfo,
	NodeWrapper,
	TimelineContainer,
	TimelineLine,
} from "./page.css";

const CoffeePassportPage = () => {
	const t = useExtracted("profile");
	const { data } = useQuery({ queryKey: ["coffee"], queryFn: async () => await getCoffee() });

	return (
		<Content>
			<Card>
				<HeaderInfo>
					<div>
						<h2>{t("Promotion 6 + 1")}</h2>
						<p>{t("Buy 6 coffees and get the 7th one free.")}</p>
					</div>
					<CounterBadge>{6 - (data?.to_next_bonus || 0)}/6</CounterBadge>
				</HeaderInfo>

				<TimelineContainer>
					<TimelineLine viewBox="0 0 100 100" preserveAspectRatio="none">
						<polyline points="5,25 20,75 35,25 50,75 65,25 80,75 95,25" />
					</TimelineLine>

					{[1, 2, 3, 4, 5, 6, 7].map((i) => (
						<NodeWrapper
							key={crypto.randomUUID()}
							$top={i % 2 === 0 ? "75%" : "25%"}
							$left={`${(i - 1) * 15 + 5}%`}
							$closed={i > 6 - (data?.to_next_bonus || 0)}
						>
							<Image
								src={"/coffee/coffee.webp"}
								alt="Coffee Status"
								{...(i === 7 ? { width: 80, height: 80 } : { width: 60, height: 60 })}
							/>
							<div className="mask">
								<Lock />
							</div>
							{i === 7 && (
								<button type="button" className="collect" disabled={true}>
									{t("Collect")}
								</button>
							)}
						</NodeWrapper>
					))}
				</TimelineContainer>
			</Card>

			<Card>
				<HeaderInfo>
					<div>
						<h2>{t("Free coffees")}</h2>
						<p>{t("Enter the code at the checkout when purchasing coffee and get it for free.")}</p>
					</div>
				</HeaderInfo>

				<FreeCoffeeGrid>
					{(data?.unused || []).map((item) => (
						<FreeCoffeeItem key={item.id}>
							<Image src="/coffee/giftedcoffee.webp" alt="Free Coffee" width={80} height={80} />
						</FreeCoffeeItem>
					))}
				</FreeCoffeeGrid>
			</Card>
		</Content>
	);
};

export default CoffeePassportPage;
