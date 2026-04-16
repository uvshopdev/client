"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
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

const statusSteps = ["Обробка", "Комплектація", "Відправлено", "Доставлено"];

const formatter = new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const formatDate = (value: string) => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "-";
	}

	return date.toLocaleDateString("uk-UA");
};

const getStatusIndex = (status: string) => {
	const normalized = status.trim().toLowerCase();

	if (["обробка", "processing", "pending"].includes(normalized)) return 0;
	if (["комплектація", "packing", "preparing"].includes(normalized)) return 1;
	if (["відправлено", "shipped", "in_transit"].includes(normalized)) return 2;
	if (["доставлено", "delivered", "done", "completed"].includes(normalized)) return 3;

	return 0;
};

const getProductImageUrl = (id: number, picture: string | null) => {
	if (!picture) {
		return "/logo.png";
	}

	return `${process.env.NEXT_PUBLIC_FILES_URL}/products/${id}/large/${picture}.webp`;
};

export default function OrderHistoryPage() {
	const [openOrderIds, setOpenOrderIds] = useState<number[]>([]);

	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: async () => await getOrders(),
	});

	const toggleOrder = (id: number) => {
		setOpenOrderIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	if (isLoading) {
		return (
			<PageWrapper>
				<PageTitle>Мої замовлення</PageTitle>
				<EmptyState>Завантажуємо замовлення...</EmptyState>
			</PageWrapper>
		);
	}

	if (isError) {
		return (
			<PageWrapper>
				<PageTitle>Мої замовлення</PageTitle>
				<EmptyState>Не вдалося завантажити замовлення. Спробуйте пізніше.</EmptyState>
			</PageWrapper>
		);
	}

	return (
		<PageWrapper>
			<PageTitle>Мої замовлення</PageTitle>
			<Content>
				{data.length === 0 && <EmptyState>У вас поки немає оформлених замовлень.</EmptyState>}

				{data.map((order) => {
					const isOpen = openOrderIds.includes(order.id);
					const activeStepIndex = getStatusIndex(order.status);

					const progressPercentage = (activeStepIndex / (statusSteps.length - 1)) * 100;

					return (
						<OrderCard key={order.id}>
							<OrderTop onClick={() => toggleOrder(order.id)}>
								<OrderHeader>
									<OrderNumber>Замовлення №{order.id}</OrderNumber>
									<OrderDate>Дата замовлення: {formatDate(order.inserted_at ?? order.updated_at ?? "")}</OrderDate>
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
									{order.positions.map(({ amount, product }) => (
										<ProductRow key={product.id}>
											<ProductImage src={getProductImageUrl(product.id, product.picture)} alt={product.name} />

											<ProductInfo>
												<ProductName>{product.name}</ProductName>
												<ProductMeta>Артикул: {product.article}</ProductMeta>
											</ProductInfo>

											<ProductPriceBlock>
												<ProductPrice>{formatter.format(product.price)} грн</ProductPrice>
												<ProductQty>x{amount} шт.</ProductQty>
											</ProductPriceBlock>
										</ProductRow>
									))}
								</ProductList>
							</DetailsPanel>
						</OrderCard>
					);
				})}
			</Content>
		</PageWrapper>
	);
}
