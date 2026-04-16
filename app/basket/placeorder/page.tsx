"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import { createOrder } from "@/lib/orders";
import { useBasket } from "@/store/basket";
import {
	Circle,
	Controls,
	FormContainer,
	FormGroup,
	IconButton,
	Input,
	Label,
	ModalBtnOutline,
	ModalBtnSolid,
	ModalButtons,
	ModalContent,
	ModalOverlay,
	ModalTitle,
	CustomSelectWrapper,
    CustomSelectHeader,
    CustomSelectList,
    CustomSelectItem,
	Step,
	StepLabel,
	SubmitButton,
	Textarea,
	TimelineProgress,
	TimelineTrack,
	TimelineWrapper,
	Title,
	Wrapper,
} from "./page.css";

const steps = ["Персональна інформація", "Доставка та оплата", "Адреса доставки", "Додатково"];

const CustomDropdown = ({ 
    value, 
    onChange, 
    options, 
    placeholder 
}: { 
    value: string; 
    onChange: (v: string) => void; 
    options: { value: string; label: string }[]; 
    placeholder: string; 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find(opt => opt.value === value);

    return (
        <CustomSelectWrapper ref={ref}>
            <CustomSelectHeader $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <span>{selected ? selected.label : placeholder}</span>
                <ChevronDown size={20} strokeWidth={1.5} />
            </CustomSelectHeader>
            {isOpen && (
                <CustomSelectList>
                    {options.map((opt) => (
                        <CustomSelectItem key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
                            {opt.label}
                        </CustomSelectItem>
                    ))}
                </CustomSelectList>
            )}
        </CustomSelectWrapper>
    );
};

export default function CheckoutPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [step, setStep] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const { info, setInfo, positions } = useBasket();

	const { mutate: submitOrder, isPending } = useMutation({
		mutationFn: createOrder,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["orders"] });
			setShowModal(true);
			reset();
		},
		onError: () => {
			toast.error("Не вдалося оформити замовлення");
		},
	});

	const { reset } = useBasket();

	const next = () => {
		if (step === 1 && (!info.delivery_method || !info.payment_method)) {
			toast.error("Оберіть спосіб доставки та спосіб оплати");
			return;
		}

		setStep((s) => Math.min(3, s + 1));
	};
	const prev = () => setStep((s) => Math.max(0, s - 1));

	const progressPercentage = (step / (steps.length - 1)) * 100;

	const handleSubmitOrder = () => {
		if (!info.delivery_method || !info.payment_method) {
			toast.error("Оберіть спосіб доставки та спосіб оплати");
			return;
		}

		const positionsPayload = Object.values(positions).map(({ amount, product }) => ({
			amount,
			product_id: product.id,
		}));

		if (!positionsPayload.length) {
			toast.error("Кошик порожній");
			return;
		}

		submitOrder({
			recipient: info.name,
			address: info.address,
			phone_number: info.phone_number,
			email: info.email ?? "",
			payment_method: info.payment_method,
			delivery_method: info.delivery_method,
			postal_code: info.postal_code,
			message: info.message,
			positions: positionsPayload,
		});
	};

	const renderForm = () => {
		switch (step) {
			case 0:
				return (
					<FormContainer>
						<FormGroup>
							<Label>Ім'я та прізвище</Label>
							<Input placeholder="Ім'я Прізвище" value={info.name} onChange={(e) => setInfo("name", e.target.value)} />
						</FormGroup>
						<FormGroup>
							<Label>Email</Label>
							<Input
								placeholder="example@email.com"
								value={info.email ?? ""}
								onChange={(e) => setInfo("email", e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>Номер телефону</Label>
							<Input
								placeholder="+380 XXXXXXXXXX"
								value={info.phone_number}
								onChange={(e) => setInfo("phone_number", e.target.value)}
							/>
						</FormGroup>
					</FormContainer>
				);
			case 1:
                return (
                    <FormContainer>
                        <FormGroup>
                            <Label>Спосіб доставки</Label>
                            <CustomDropdown
                                value={info.delivery_method}
                                onChange={(val) => setInfo("delivery_method", val)}
                                placeholder="Оберіть спосіб доставки"
                                options={[
                                    { value: "nova", label: "Нова Пошта" },
                                    { value: "ukr", label: "Укрпошта" }
                                ]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Спосіб оплати</Label>
                            <CustomDropdown
                                value={info.payment_method}
                                onChange={(val) => setInfo("payment_method", val)}
                                placeholder="Оберіть спосіб оплати"
                                options={[
                                    { value: "card", label: "Карткою онлайн" },
                                    { value: "cash", label: "При отриманні" }
                                ]}
                            />
                        </FormGroup>
                    </FormContainer>
                );
			case 2:
				return (
					<FormContainer>
						<FormGroup>
							<Label>Поштовий індекс</Label>
							<Input placeholder="03087" value={info.postal_code} onChange={(e) => setInfo("postal_code", e.target.value)} />
						</FormGroup>
						<FormGroup>
							<Label>Адреса доставки</Label>
							<Input
								placeholder="№248, б-р Чоколівський, 37"
								value={info.address}
								onChange={(e) => setInfo("address", e.target.value)}
							/>
						</FormGroup>
					</FormContainer>
				);
			case 3:
				return (
					<FormContainer>
						<FormGroup>
							<Label>Додаткові нотатки щодо замовлення</Label>
							<Textarea placeholder="Ваші нотатки" value={info.message} onChange={(e) => setInfo("message", e.target.value)} />
						</FormGroup>
					</FormContainer>
				);
			default:
				return null;
		}
	};

	return (
		<Wrapper>
			<Title>Оформлення замовлення</Title>

			<TimelineWrapper>
				<TimelineTrack>
					<TimelineProgress $progress={progressPercentage} />
				</TimelineTrack>

				{steps.map((label, index) => {
					let state: "completed" | "active" | "pending" = "pending";
					if (index < step) state = "completed";
					if (index === step) state = "active";

					return (
						<Step key={label}>
							<Circle $state={state}>{state === "completed" ? <Check size={24} strokeWidth={3} /> : `0${index + 1}`}</Circle>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</TimelineWrapper>

			{renderForm()}

			<Controls>
				<IconButton onClick={prev} disabled={step === 0} type="button">
					<ArrowLeft />
				</IconButton>

				{step < 3 ? (
					<IconButton onClick={next} type="button">
						<ArrowRight />
					</IconButton>
				) : (
					<SubmitButton onClick={handleSubmitOrder} type="button" disabled={isPending}>
						{isPending ? "Оформлюємо..." : "Замовити"}
					</SubmitButton>
				)}
			</Controls>

			{showModal && (
				<ModalOverlay onClick={() => setShowModal(false)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<ModalTitle>Дякуємо за покупку! Ваше замовлення успішно оформлено!</ModalTitle>
						<ModalButtons>
							<ModalBtnOutline onClick={() => setShowModal(false)}>Відмінити</ModalBtnOutline>
							<ModalBtnSolid onClick={() => router.push("/")}>На головну</ModalBtnSolid>
						</ModalButtons>
					</ModalContent>
				</ModalOverlay>
			)}
		</Wrapper>
	);
}
