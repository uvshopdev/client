import styled from "styled-components";

// Глобальные стили для контента
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

// Стиль для паспорта-шапки
export const PassportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  font-size: 24px;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors?.secondary || "#EAEAEA"};

  .badges {
    display: flex;
    gap: 15px;
    font-size: 16px;
    align-items: center;
  }

  .badge {
    padding: 6px 16px;
    border-radius: 12px;
    background-color: #6F3F18; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
  }

  .badge .icon {
    width: 16px; 
    height: 16px;
    display: block;
    stroke: white;
    stroke-width: 1.5px;
    fill: none;
  }
`;

// Карточка профиля (теперь всегда в одном режиме)
export const ProfileCard = styled.div`
  position: relative;
  padding: 60px 40px;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors?.secondary || "#EAEAEA"};
  background: #FFF;
  width: 100%;
`;

// Контейнер, разделяющий лево (аватар) и право (инпуты)
export const EditContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 80px;
  width: 100%;
`;

// Иконки в углу (только Гугл по новой задумке)
export const TopRightIcons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
  align-items: center;

  .icon-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid #3B3028; 
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;

    svg {
      width: 22px; 
      height: 22px;
      display: block;
    }
  }
`;

// Левая часть: Аватарка + Имя под ней
export const AvatarSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  img {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #F0F0F0;
  }

  .avatar-name {
    font-size: 22px;
    font-weight: 500;
    color: #333;
  }

  // Кнопки управления аватаром (сделаем их чуть менее кричащими)
  .action-btn {
    position: absolute;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex; 
    align-items: center;
    justify-content: center;
    z-index: 2;
    left: -19px; 
    
    &.remove { top: 20px; }
    &.add { top: 70px; }

    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

// Правая часть: Сразу инпуты, которые выглядят как текст
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-grow: 1;
  max-width: 400px;

  .section-title {
    font-size: 14px;
    color: #888;
    font-weight: 500;
    margin-bottom: -10px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 14px;
    color: #888;
  }

  /* ТЕ САМЫЕ АННУЛИРОВАННЫЕ СТИЛИ ДЛЯ ИНПУТОВ */
  .inline-input {
    border: none;
    border-bottom: 1px solid transparent;
    padding: 5px 0;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    background: transparent;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-bottom: 1px solid #4A3320;
      padding-left: 5px; /* Легкий эффект при клике */
    }

    &::placeholder {
      color: #CCC;
    }
  }
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  .password-text {
    font-size: 14px;
    color: #333;
    
    a {
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .submit-btn {
    background-color: #4A3320;
    color: white;
    padding: 12px 30px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.1s;

    &:active {
      transform: scale(0.98);
    }
  }
`;