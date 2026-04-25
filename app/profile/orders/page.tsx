"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useExtracted } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { getOrders } from "@/lib/orders";
import {
	CollapseIcon,
	Content,
	DetailsPanel,
	EmptyState,
	OrderCard,
	OrderDate,
	OrderHeader,
	OrderNumber,
	OrderTop,
	PageTitle,
	PageWrapper,
	ProductImage,
	ProductInfo,
	ProductList,
	ProductMeta,
	ProductName,
	ProductPrice,
	ProductPriceBlock,
	ProductQty,
	ProductRow,
	Step,
	StepCircle,
	StepLabel,
	TimelineProgress,
	TimelineTrack,
	TimelineWrapper,
} from "./page.css";

const formatter = new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const getStatusIndex = (status: string) => {
	const normalized = status.trim().toLowerCase();

	if (["pending"].includes(normalized)) return 0;
	if (["confirmed"].includes(normalized)) return 1;
	if (["processing"].includes(normalized)) return 2;
	if (["shipped", "delivered"].includes(normalized)) return 3;

	return 0;
};

export default function OrderHistoryPage() {
	const t = useExtracted("profile");
	const [openOrderIds, setOpenOrderIds] = useState<number[]>([]);

	const statusSteps = [t("Processing"), t("Packing"), t("Shipped"), t("Delivered")];

	const { data: orders = [] } = useQuery({
		queryKey: ["orders"],
		queryFn: async () => await getOrders(),
		select: (d) => d.map((o) => ({ ...o, inserted_at: new Date(o.inserted_at) })),
		placeholderData: [],
	});

	const toggleOrder = (id: number) => {
		setOpenOrderIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	return (
		<PageWrapper>
			<PageTitle>{t("My orders")}</PageTitle>
			<Content>
				{orders.length === 0 && <EmptyState>{t("You have no placed orders yet.")}</EmptyState>}

				{orders.map((order) => {
					const isOpen = openOrderIds.includes(order.id);
					const activeStepIndex = getStatusIndex(order.status);

					const progressPercentage = (activeStepIndex / (statusSteps.length - 1)) * 100;

					return (
						<OrderCard key={order.id}>
							<OrderTop onClick={() => toggleOrder(order.id)}>
								<OrderHeader>
									<OrderNumber>
										{t("Order №")}
										{order.id}
									</OrderNumber>
									<OrderDate>
										{t("Order date:")} {order.inserted_at.toLocaleDateString("uk-UA")}
									</OrderDate>
								</OrderHeader>

								<CollapseIcon>
									{isOpen ? <ChevronUp size={28} strokeWidth={1.5} /> : <ChevronDown size={28} strokeWidth={1.5} />}
								</CollapseIcon>
							</OrderTop>

							<DetailsPanel $open={isOpen}>
								<TimelineWrapper>
									<TimelineTrack>
										<TimelineProgress $progress={progressPercentage} />
									</TimelineTrack>

									{statusSteps.map((step, index) => {
										const isCompleted = index < activeStepIndex;
										const isActive = index === activeStepIndex;

										let state: "completed" | "active" | "pending" = "pending";
										if (isCompleted) state = "completed";
										if (isActive) state = "active";

										const stepNumber = `0${index + 1}`;

										return (
											<Step key={step}>
												<StepCircle $state={state}>
													{isCompleted ? <Check size={20} strokeWidth={2} /> : stepNumber}
												</StepCircle>
												<StepLabel>{step}</StepLabel>
											</Step>
										);
									})}
								</TimelineWrapper>

								<ProductList>
									{order.positions.map(({ amount, product }) => {
										const href = product.category?.id
											? `/product/${product.id}?category_id=${product.category.id}`
											: `/product/${product.id}`;

										return (
											<ProductRow
												key={product.id}
												as={Link}
												href={href}
												style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
											>
												<ProductImage
													src={
														product.picture
															? `${process.env.NEXT_PUBLIC_FILES_URL}/products/${product.id}/small/${product.picture}`
															: "/logo.webp"
													}
													alt={product.name}
												/>

												<ProductInfo>
													<ProductName>{product.name}</ProductName>
													<ProductMeta>
														{t("Article:")} {product.article}
													</ProductMeta>
												</ProductInfo>

												<ProductPriceBlock>
													<ProductPrice>
														{formatter.format(product.price)} {t("UAH")}
													</ProductPrice>
													<ProductQty>
														x{amount} {t("pcs")}
													</ProductQty>
												</ProductPriceBlock>
											</ProductRow>
										);
									})}
								</ProductList>
							</DetailsPanel>
						</OrderCard>
					);
				})}
			</Content>
		</PageWrapper>
	);
}
