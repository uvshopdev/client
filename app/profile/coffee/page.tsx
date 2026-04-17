"use client";

import { useQuery } from "@tanstack/react-query";
import { Lock, X } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

import { getCoffee } from "@/lib/coffee";
import {
	Card,
	Content,
	CounterBadge,
	FreeCoffeeGrid,
	FreeCoffeeItem,
	HeaderInfo,
	ModalBody,
	ModalClose,
	ModalCode,
	ModalOverlay,
	ModalTitle,
	NodeWrapper,
	ShowQrButton,
	TimelineContainer,
	TimelineLine,
} from "./page.css";

const CoffeePassportPage = () => {
	const t = useExtracted("profile");
	const { data } = useQuery({ queryKey: ["coffee"], queryFn: async () => await getCoffee() });
	const [selectedCoffee, setSelectedCoffee] = useState<{ id: number; source: string } | null>(null);

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
							<ShowQrButton type="button" onClick={() => setSelectedCoffee({ id: item.id, source: item.source })}>
								{t("Show QR")}
							</ShowQrButton>
						</FreeCoffeeItem>
					))}
				</FreeCoffeeGrid>
			</Card>

			{selectedCoffee && (
				<ModalOverlay onClick={() => setSelectedCoffee(null)}>
					<ModalBody onClick={(e) => e.stopPropagation()}>
						<ModalClose type="button" onClick={() => setSelectedCoffee(null)} aria-label={t("Close QR modal")}>
							<X size={20} />
						</ModalClose>
						<ModalTitle>
                            {t("QR code for free coffee #")}{selectedCoffee.id}
                        </ModalTitle>
						<QRCodeSVG value={selectedCoffee.source || String(selectedCoffee.id)} size={220} />
						<ModalCode>{selectedCoffee.source || `coffee-${selectedCoffee.id}`}</ModalCode>
					</ModalBody>
				</ModalOverlay>
			)}
		</Content>
	);
};

export default CoffeePassportPage;
