"use client";

import { MapPin, X } from "lucide-react";
import { useExtracted } from "next-intl";
import { useState, useMemo } from "react";

import ProfileForm from "@/components/ProfileForm/ProfileForm";
import { 
	Content, 
	PassportHeader,
	ModalOverlay, 
	StatusModalBox, 
	ModalClose, 
	StatusHeader, 
	StatusTitleBlock, 
	StatusBadge, 
	TimelineWrapper, 
	TimelineLineBase, 
	TimelineLineActive, 
	TimelineNode, 
	TimelineCircle, 
	TimelineLabel,
	InfoCard, 
	InfoCardTitle, 
	InfoRow, 
	BonusRow
} from "./page.css";

const ProfilePage = () => {
	const t = useExtracted("profile");

	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const userAchievedStatusIdx = 0; 
	const [selectedStatusIdx, setSelectedStatusIdx] = useState(userAchievedStatusIdx);

	const statuses = useMemo(() => [
		{ 
			label: t("Tourist"), 
			miles: "0+",
			bonuses: [
				t("Miles rate: 1 mile = 100 UAH from the order receipt"),
				t("Birthday bonus"),
			] 
		},
		{ 
			label: t("Explorer"), 
			miles: "50+",
			bonuses: [
				t("Miles rate: 2 miles = 100 UAH from the order receipt"),
				t("Personal offers"),
				t("Double miles on \"Moon Country\" products"),
			] 
		},
		{ 
			label: t("Traveler"), 
			miles: "150+",
			bonuses: [
				t("Miles rate: 3 miles = 100 UAH from the order receipt"),
				t("Discounts on imported items"),
				t("Free weekly coffee"),
			] 
		},
		{ 
			label: t("Travel\nAmbassador"), 
			miles: "300+",
			bonuses: [
				t("Miles rate: 4 miles = 100 UAH from the order receipt"),
				t("Personal discounts on selected categories"),
				t("Participation in closed events"),
			] 
		},
	], [t]); 

	const progressPercentage = useMemo(() => {
		const totalNodes = statuses.length;
		if (totalNodes <= 1) return "0%";
		const percent = (userAchievedStatusIdx / (totalNodes - 1)) * 100;
		return `${percent}%`;
	}, [statuses, userAchievedStatusIdx]);

	return (
		<Content>
			<PassportHeader>
				<h2>{t("Traveler's Passport")}</h2>
				<div className="badges">
					<button type="button" onClick={() => setIsStatusModalOpen(true)}>
						{statuses[userAchievedStatusIdx].label.replace('\n', ' ')}
					</button>
					<button type="button">
						<MapPin size={16} className="icon" />
						<span>50</span>
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
								<span>{t("Received:")} 12.12.2025</span>
							</StatusTitleBlock>
							<StatusBadge>{statuses[userAchievedStatusIdx].label.replace('\n', ' ')}</StatusBadge>
						</StatusHeader>

						<TimelineWrapper>
							<TimelineLineBase />
							<TimelineLineActive $progress={progressPercentage} />
							
							{statuses.map((status, idx) => (
								<TimelineNode key={idx} onClick={() => setSelectedStatusIdx(idx)}>
									<TimelineCircle 
										$active={idx === selectedStatusIdx} 
										$achieved={idx <= userAchievedStatusIdx} 
									>
										{status.miles}
									</TimelineCircle>
									<TimelineLabel>
										{status.label}
									</TimelineLabel>
								</TimelineNode>
							))}
						</TimelineWrapper>

						<InfoCard>
							<InfoCardTitle>{t("Miles history")}</InfoCardTitle>
							<InfoRow><span>{t("Current number of active miles")}</span><span>10</span></InfoRow>
							<InfoRow><span>{t("Total accumulated for the previous year")}</span><span>0</span></InfoRow>
							<InfoRow><span>{t("Total accumulated for the current year")}</span><span>10</span></InfoRow>
						</InfoCard>

						<InfoCard>
							<InfoCardTitle>
								{t("List of bonuses for status")} "{statuses[selectedStatusIdx].label.replace('\n', ' ')}"
							</InfoCardTitle>
							
							{statuses[selectedStatusIdx].bonuses.map((bonus, idx) => (
								<BonusRow key={idx}>{bonus}</BonusRow>
							))}
						</InfoCard>
					</StatusModalBox>
				</ModalOverlay>
			)}
		</Content>
	);
};

export default ProfilePage;