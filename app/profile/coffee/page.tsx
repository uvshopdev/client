"use client";

import React from "react";
import {
  Content,
  Card,
  HeaderInfo,
  CounterBadge,
  TimelineContainer,
  TimelineLine,
  NodeWrapper,
  NodeImage, 
  ClaimButton,
  FreeCoffeeGrid,
  FreeCoffeeItem,
  ActionButton
} from "./page.css";

const CoffeePassportPage = () => {
  // Настройки позиций: active определяет, какую картинку показывать
  const timelineNodes = [
    { id: 1, active: true, top: "25%", left: "5%" },
    { id: 2, active: true, top: "75%", left: "20%" },
    { id: 3, active: false, top: "25%", left: "35%" },
    { id: 4, active: false, top: "75%", left: "50%" },
    { id: 5, active: false, top: "25%", left: "65%" },
    { id: 6, active: false, top: "75%", left: "80%" },
    { id: 7, active: false, top: "25%", left: "95%", large: true },
  ];

  return (
    <Content>
      {/* ПЕРВАЯ КАРТОЧКА: Акция 6 + 1 */}
      <Card>
        <HeaderInfo>
          <div>
            <h2>Акція 6 + 1</h2>
            <p>Купіть 6 кав та отримайте 7-у в подарунок.</p>
          </div>
          <CounterBadge>2/6</CounterBadge>
        </HeaderInfo>

        <TimelineContainer>
          <TimelineLine viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points="5,25 20,75 35,25 50,75 65,25 80,75 95,25" />
          </TimelineLine>

          {timelineNodes.map((node) => (
            <NodeWrapper key={node.id} $top={node.top} $left={node.left}>
              {/* Подставляем пути к папке coffee */}
              <NodeImage 
                src={node.active ? "/coffee/Coffee.png" : "/coffee/CoffeeClosed.png"} 
                alt="Coffee Status"
                $large={node.large} 
              />
              
              {node.id === 7 && <ClaimButton disabled>Забрати</ClaimButton>}
            </NodeWrapper>
          ))}
        </TimelineContainer>
      </Card>

      {/* ВТОРАЯ КАРТОЧКА: Бесплатные кофе */}
      <Card>
        <HeaderInfo>
          <div>
            <h2>Безкоштовні кави</h2>
            <p>Вкажіть код на касі, при покупці кави та отримайте її безкоштовно.</p>
          </div>
        </HeaderInfo>

        <FreeCoffeeGrid>
          {[1, 2, 3, 4].map((item) => (
            <FreeCoffeeItem key={item}>
              {/* Иконка кофемолки */}
              <NodeImage 
                src="/coffee/GiftedCoffee.png" 
                alt="Free Coffee" 
                style={{ width: "85px", height: "85px" }} 
              />
              <ActionButton>Використати</ActionButton>
            </FreeCoffeeItem>
          ))}
        </FreeCoffeeGrid>
      </Card>
    </Content>
  );
};

export default CoffeePassportPage;