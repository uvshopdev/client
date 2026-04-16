"use client";

import { useQuery } from "@tanstack/react-query";
import { MapPin, X } from "lucide-react";
import { useExtracted } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { getMilesSummary, getUserMiles } from "@/lib/miles";
import {
	BonusRow,
	Content,
	InfoCard,
	InfoCardTitle,
	InfoRow,
	ModalClose,
	ModalOverlay,
	PassportHeader,
	StatusBadge,
	StatusHeader,
	StatusModalBox,
	StatusTitleBlock,
	TimelineCircle,
	TimelineLabel,
	TimelineLineActive,
	TimelineLineBase,
	TimelineNode,
	TimelineWrapper,
} from "./page.css";

const ProfilePage = () => {
	const t = useExtracted("profile");

	const { data: milesEntries } = useQuery({
		queryKey: ["profile", "miles"],
		queryFn: async () => await getUserMiles(),
	});

	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [selectedStatusIdx, setSelectedStatusIdx] = useState(0);

	const statuses = useMemo(
		() => [
			{
				label: t("Tourist"),
				minMiles: 0,
				miles: "0+",
				bonuses: [t("Miles rate: 1 mile = 100 UAH from the order receipt"), t("Birthday bonus")],
			},
			{
				label: t("Explorer"),
				minMiles: 50,
				miles: "50+",
				bonuses: [
					t("Miles rate: 2 miles = 100 UAH from the order receipt"),
					t("Personal offers"),
					t('Double miles on "Moon Country" products'),
				],
			},
			{
				label: t("Traveler"),
				minMiles: 150,
				miles: "150+",
				bonuses: [t("Miles rate: 3 miles = 100 UAH from the order receipt"), t("Discounts on imported items"), t("Free weekly coffee")],
			},
			{
				label: t("Traveller’s\nAmbassador"),
				minMiles: 300,
				miles: "300+",
				bonuses: [
					t("Miles rate: 4 miles = 100 UAH from the order receipt"),
					t("Personal discounts on selected categories"),
					t("Participation in closed events"),
				],
			},
		],
		[t],
	);

	const milesSummary = useMemo(() => getMilesSummary(milesEntries ?? []), [milesEntries]);
	const currentMiles = milesSummary.currentMiles;
	const previousYearMiles = milesSummary.previousYearMiles;
	const currentYearMiles = milesSummary.currentYearMiles;

	const activeStatusIdx = useMemo(() => {
		return statuses.reduce((accumulator, status, index) => {
			return currentMiles >= status.minMiles ? index : accumulator;
		}, 0);
	}, [currentMiles, statuses]);

	const progressPercentage = useMemo(() => {
		const totalNodes = statuses.length;
		if (totalNodes <= 1) return 0;
		return (activeStatusIdx / (totalNodes - 1)) * 100;
	}, [activeStatusIdx, statuses]);

	useEffect(() => {
		if (!isStatusModalOpen) return;
		setSelectedStatusIdx(activeStatusIdx);
	}, [activeStatusIdx, isStatusModalOpen]);

	return (
		<Content>
			<PassportHeader>
				<h2>{t("Traveler's Passport")}</h2>
				<div className="badges">
					<button type="button" onClick={() => setIsStatusModalOpen(true)}>
						{statuses[activeStatusIdx].label.replace("\n", " ")}
					</button>
					<button type="button">
						<MapPin size={16} className="icon" />
						<span>{currentMiles}</span>
					</button>
				</div>
			</PassportHeader>

			{/* Форма зі своєю рідною рамкою */}
			<ProfileForm />

			{isStatusModalOpen && (
				<ModalOverlay onClick={() => setIsStatusModalOpen(false)}>
					<StatusModalBox onClick={(e) => e.stopPropagation()}>
						<ModalClose onClick={() => setIsStatusModalOpen(false)} type="button">
							<X size={28} />
						</ModalClose>

						<StatusHeader>
							<StatusTitleBlock>
								<h3>{t("Current status")}</h3>
								<span>
									{t("Received:")} {statuses[activeStatusIdx].label.replace("\n", " ")}
								</span>
							</StatusTitleBlock>
							<StatusBadge>{statuses[activeStatusIdx].label.replace("\n", " ")}</StatusBadge>
						</StatusHeader>

						<TimelineWrapper>
							<TimelineLineBase />
							<TimelineLineActive $progress={progressPercentage} />

							{statuses.map((status, idx) => (
								<TimelineNode key={status.label} onClick={() => setSelectedStatusIdx(idx)}>
									<TimelineCircle $active={idx === selectedStatusIdx} $achieved={idx <= activeStatusIdx}>
										{status.miles}
									</TimelineCircle>
									<TimelineLabel>{status.label}</TimelineLabel>
								</TimelineNode>
							))}
						</TimelineWrapper>

						<InfoCard>
							<InfoCardTitle>{t("Miles history")}</InfoCardTitle>
							<InfoRow>
								<span>{t("Current number of active miles")}</span>
								<span>{currentMiles}</span>
							</InfoRow>
							<InfoRow>
								<span>{t("Total accumulated for the previous year")}</span>
								<span>{previousYearMiles}</span>
							</InfoRow>
							<InfoRow>
								<span>{t("Total accumulated for the current year")}</span>
								<span>{currentYearMiles}</span>
							</InfoRow>
						</InfoCard>

						<InfoCard>
							<InfoCardTitle>
								{t("List of bonuses for status")} "{statuses[selectedStatusIdx].label.replace("\n", " ")}"
							</InfoCardTitle>

							{statuses[selectedStatusIdx].bonuses.map((bonus) => (
								<BonusRow key={`${statuses[selectedStatusIdx].label}-${bonus}`}>{bonus}</BonusRow>
							))}
						</InfoCard>
					</StatusModalBox>
				</ModalOverlay>
			)}
		</Content>
	);
};

export default ProfilePage;
