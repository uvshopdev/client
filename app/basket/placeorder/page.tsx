"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { useExtracted } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { getMilesSummary, getUserMiles } from "@/lib/miles";
import { createOrder } from "@/lib/orders";
import { useBasket } from "@/store/basket";
import {
    Circle,
    Controls,
    CustomSelectHeader,
    CustomSelectItem,
    CustomSelectList,
    CustomSelectWrapper,
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

const CustomDropdown = ({
    value,
    onChange,
    options,
    placeholder,
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

    const selected = options.find((opt) => opt.value === value);

    return (
        <CustomSelectWrapper ref={ref}>
            <CustomSelectHeader $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <span>{selected ? selected.label : placeholder}</span>
                <ChevronDown size={20} strokeWidth={1.5} />
            </CustomSelectHeader>
            {isOpen && (
                <CustomSelectList>
                    {options.map((opt) => (
                        <CustomSelectItem
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </CustomSelectItem>
                    ))}
                </CustomSelectList>
            )}
        </CustomSelectWrapper>
    );
};

export default function CheckoutPage() {
    const t = useExtracted("checkout");
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [step, setStep] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [milesToRedeem, setMilesToRedeem] = useState(0);
    const { info, setInfo, positions, reset } = useBasket();

    const steps = [
        t("Personal Information"),
        t("Delivery and Payment"),
        t("Delivery Address"),
        t("Additional")
    ];

    const { data: milesEntries } = useQuery({
        queryKey: ["profile", "miles"],
        queryFn: async () => await getUserMiles(),
    });

    const availableMiles = useMemo(() => getMilesSummary(milesEntries ?? []).currentMiles, [milesEntries]);
    const subtotal = useMemo(() => Object.values(positions).reduce((sum, { amount, product }) => sum + product.price * amount, 0), [positions]);
    const maxMilesToRedeem = Math.min(availableMiles, Math.floor(subtotal));

    const selectedMilesFromBasket = useMemo(() => {
        const rawMiles = searchParams.get("miles");
        if (!rawMiles) return 0;
        const parsedMiles = Number(rawMiles);
        return !Number.isFinite(parsedMiles) || parsedMiles <= 0 ? 0 : Math.floor(parsedMiles);
    }, [searchParams]);

    const redeemedMilesValue = Math.min(milesToRedeem, maxMilesToRedeem);

    useEffect(() => {
        setMilesToRedeem(Math.min(selectedMilesFromBasket, maxMilesToRedeem));
    }, [maxMilesToRedeem, selectedMilesFromBasket]);

    const { mutate: submitOrder, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["orders"] });
            setShowModal(true);
            reset();
        },
        onError: () => {
            toast.error(t("Failed to place order"));
        },
    });

    const next = () => {
        if (step === 1 && (!info.delivery_method || !info.payment_method)) {
            toast.error(t("Select delivery and payment methods"));
            return;
        }
        setStep((s) => Math.min(3, s + 1));
    };

    const prev = () => setStep((s) => Math.max(0, s - 1));

    const progressPercentage = (step / (steps.length - 1)) * 100;

    const handleSubmitOrder = () => {
        if (!info.delivery_method || !info.payment_method) {
            toast.error(t("Select delivery and payment methods"));
            return;
        }

        if (milesToRedeem > maxMilesToRedeem) {
            toast.error(t("Only {maxMiles} miles available for redemption", { maxMiles: String(maxMilesToRedeem) }));
            return;
        }

        const positionsPayload = Object.values(positions).map(({ amount, product }) => ({
            amount,
            product_id: product.id,
        }));

        if (!positionsPayload.length) {
            toast.error(t("Cart is empty"));
            return;
        }

        submitOrder({
            recipient: info.name,
            address: info.address,
            phone_number: info.phone_number,
            email: info.email ?? "",
            payment_method: info.payment_method,
            delivery_method: info.delivery_method,
            miles_to_redeem: redeemedMilesValue,
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
                            <Label>{t("Full Name")}</Label>
                            <Input 
                                placeholder={t("First Last Name")} 
                                value={info.name} 
                                onChange={(e) => setInfo("name", e.target.value)} 
                            />
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
                            <Label>{t("Phone number")}</Label>
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
                            <Label>{t("Delivery method")}</Label>
                            <CustomDropdown
                                value={info.delivery_method}
                                onChange={(val) => setInfo("delivery_method", val)}
                                placeholder={t("Choose delivery method")}
                                options={[
                                    { value: "nova", label: t("Nova Poshta") },
                                    { value: "ukr", label: t("Ukrposhta") },
                                ]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>{t("Payment method")}</Label>
                            <CustomDropdown
                                value={info.payment_method}
                                onChange={(val) => setInfo("payment_method", val)}
                                placeholder={t("Choose payment method")}
                                options={[
                                    { value: "card", label: t("Card online") },
                                    { value: "cash", label: t("Cash on delivery") },
                                ]}
                            />
                        </FormGroup>
                    </FormContainer>
                );
            case 2:
                return (
                    <FormContainer>
                        <FormGroup>
                            <Label>{t("Postal code")}</Label>
                            <Input 
                                placeholder="03087" 
                                value={info.postal_code} 
                                onChange={(e) => setInfo("postal_code", e.target.value)} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>{t("Delivery address")}</Label>
                            <Input
                                placeholder={t("Address placeholder")}
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
                            <Label>{t("Order notes")}</Label>
                            <Textarea 
                                placeholder={t("Your notes")} 
                                value={info.message} 
                                onChange={(e) => setInfo("message", e.target.value)} 
                            />
                        </FormGroup>
                    </FormContainer>
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper>
            <Title>{t("Checkout title")}</Title>

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
                            <Circle $state={state}>
                                {state === "completed" ? <Check size={24} strokeWidth={3} /> : `0${index + 1}`}
                            </Circle>
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
                        {isPending ? t("Processing...") : t("Order")}
                    </SubmitButton>
                )}
            </Controls>

            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>{t("Thank you for your purchase! Your order has been successfully placed!")}</ModalTitle>
                        <ModalButtons>
                            <ModalBtnOutline onClick={() => setShowModal(false)}>{t("Cancel")}</ModalBtnOutline>
                            <ModalBtnSolid onClick={() => router.push("/")}>{t("To main page")}</ModalBtnSolid>
                        </ModalButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Wrapper>
    );
}