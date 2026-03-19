"use client";

import React, { useState, useRef, useEffect } from "react"; 
import { useExtracted } from "next-intl";

import GoogleIcon from "@/components/profile_icons/GoogleIcon";
import RemoveAvatarIcon from "@/components/profile_icons/RemoveAvatarIcon"; 
import AddAvatarIcon from "@/components/profile_icons/AddAvatarIcon"; 
import MapPinIcon from "@/components/profile_icons/MapPinIcon"; 
import { authHost } from "@/lib";
import {useQuery} from "@tanstack/react-query"

import { 
  Content, 
  PassportHeader, 
  ProfileCard, 
  TopRightIcons,
  AvatarSection, 
  FormSection, 
  InputGroup, 
  FormFooter,
  EditContainer
} from "./page.css";


const ProfilePage = () => {
  const t = useExtracted("profile");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });
  
  const [avatar, setAvatar] = useState("https://via.placeholder.com/220");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === 2. ПОЛУЧЕНИЕ ДАННЫХ (GET) ===
	const { data, isSuccess } = useQuery({
		queryKey: ["profile"],
		queryFn: () => authHost.get("/users/me").then(({data}) => data),
	});
  useEffect(() => {
    if (!isSuccess) return
    setFormData({
      full_name: data.full_name || "",
      email: data.email || "",
      phone_number: data.phone_number || "",
    });
    
    if (data.image_url) {
      setAvatar(data.image_url);
    }
  }, [data]);

  // === 3. ОБРАБОТЧИКИ ВВОДА ===
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // === 4. ОТПРАВКА ДАННЫХ (POST) ===
  const handleSave = async () => {
    try {
      const BASE_URL = "https://shopapi.webshining.space/api/v1"; // Replace with your actual API URL
            const response = await fetch(`${BASE_URL}/users/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ОБЯЗАТЕЛЬНО: передаем куки для авторизации!
        credentials: "include",
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
        }),
      });

      if (response.ok) {
        alert("Профіль успішно оновлено!"); 
      } else {
        alert("Сталася помилка при збереженні.");
      }
    } catch (error) {
      console.error("Помилка мережі при збереженні:", error);
    }
  };

  // Обработчики аватарки (локальные)
  const handleAddClick = () => fileInputRef.current?.click();
  const handleRemoveClick = () => {
    setAvatar("https://via.placeholder.com/220");
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <Content>
      <PassportHeader>
        <div>{t("Hermes Traveler's Passport")}</div>
        <div className="badges">
          <div className="badge">Турист</div>
          <div className="badge">
            <MapPinIcon className="icon" />
            <span>50</span>
          </div>
        </div>
      </PassportHeader>

      <ProfileCard>
        <TopRightIcons>
          <button className="icon-btn logo-google"><GoogleIcon /></button>
        </TopRightIcons>

        <EditContainer>
          <AvatarSection>
            <img src={avatar} alt="Avatar" />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
            <button className="action-btn remove" onClick={handleRemoveClick}><RemoveAvatarIcon /></button>
            <button className="action-btn add" onClick={handleAddClick}><AddAvatarIcon /></button>
            <div className="avatar-name">{formData.full_name || "Ім'я не вказано"}</div>
          </AvatarSection>

          <FormSection>
            <div className="section-title">Персональна інформація</div>
            
            <InputGroup>
              <label>Ім'я та прізвище</label>
              <input 
                type="text" 
                name="full_name"
                value={formData.full_name} 
                onChange={handleInputChange}
                className="inline-input" 
              />
            </InputGroup>
            
            <InputGroup>
              <label>Електронна адреса</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
                className="inline-input" 
              />
            </InputGroup>
            
            <InputGroup>
              <label>Номер телефону</label>
              <input 
                type="tel" 
                name="phone_number"
                value={formData.phone_number} 
                onChange={handleInputChange}
                className="inline-input" 
              />
            </InputGroup>

            <FormFooter>
              <button className="submit-btn" onClick={handleSave}>Зберегти зміни</button>
            </FormFooter>
          </FormSection>
        </EditContainer>
      </ProfileCard>
    </Content>
  );
};

export default ProfilePage;