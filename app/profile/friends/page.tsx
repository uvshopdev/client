"use client";

import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import { getReferrals } from "@/lib/referrals";
import { getProfile } from "@/lib/user";
import {
	Content,
	CopyButton,
	Header,
	HeaderInfo,
	InviteButton,
	Item,
	Items,
	LinkContainer,
	LinkInput,
	ModalBox,
	ModalClose,
	ModalOverlay,
	ModalTitle,
} from "./page.css";

const FriendsPage = () => {
	const t = useExtracted("profile");

	const { data: apiReferrals, isSuccess } = useQuery({
		queryKey: ["profile", "friends"],
		queryFn: async () => await getReferrals(),
	});
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => await getProfile(),
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isModalOpen]);

	const referralLink = useMemo(() => (profile ? `${origin}/auth?inviter=${profile.id}` : ""), [profile, origin]);
	profile?.id ? `${origin}/auth?inviter=${profile.id}` : "";

	const handleCopy = () => {
		navigator.clipboard.writeText(referralLink);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	return (
		<Content>
			<Header>
				<HeaderInfo>
					<div className="info">{t("Invite friends and get bonuses!")}</div>
					<div>{t("Get +50 miles and coffee after your friend makes their first purchase for an amount of 150 UAH or more.")}</div>
				</HeaderInfo>

				<InviteButton onClick={() => setIsModalOpen(true)} type="button">
					{t("Invite")}
				</InviteButton>
			</Header>

			<Items>
				{isSuccess &&
					apiReferrals?.map((r) => (
						<Item key={r.id}>
							<div className="image">
								<Image
									src={r.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/${r.picture}` : "/logo.webp"}
									width={34}
									height={34}
									alt={r.full_name || ""}
									unoptimized={true}
									style={{ objectFit: "cover" }}
								/>
							</div>
							<div>{r.full_name}</div>
							<div className="status">{t("Waiting for the first purchase")}</div>
						</Item>
					))}
			</Items>

			{isModalOpen && (
				<ModalOverlay onClick={handleOverlayClick}>
					<ModalBox onClick={(e) => e.stopPropagation()}>
						<ModalClose onClick={() => setIsModalOpen(false)} type="button">
							<X size={28} />
						</ModalClose>

						<ModalTitle>{t("Invitation link")}</ModalTitle>

						<LinkContainer>
							<LinkInput type="text" value={referralLink} readOnly />
							<CopyButton onClick={handleCopy} type="button">
								{isCopied ? t("Copied") : t("Copy")}
							</CopyButton>
						</LinkContainer>
					</ModalBox>
				</ModalOverlay>
			)}
		</Content>
	);
};

export default FriendsPage;
