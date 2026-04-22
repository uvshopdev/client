import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 40px 60px;
  font-family: "Montserrat Alternates", sans-serif;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const BannerBase = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2.8 / 1; 
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 16px;
    aspect-ratio: 2.8 / 1; 
  }
`;

export const EmptyBanner = styled(BannerBase)``;
export const CountryBanner = styled(BannerBase)``;
export const SliderWrapper = styled(BannerBase)``;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.6s ease-in-out;
  
  img {
    object-fit: cover !important; 
    width: 100% !important;
    height: 100% !important;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Gabriela", serif;
  font-size: 34px;
  font-weight: 400;
  color: #3B3028;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const LinkText = styled.div`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #3B3028;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover { opacity: 0.7; }
`;

export const HeroSection = styled.section`
  width: 100%;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

export const ArrowBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #3B3028;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div<{ $active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#3B3028" : "#E9E3D9")};
  transition: background 0.3s;
`;

export const Section = styled.section`
  margin-top: 60px;
`;

export const SectionTight = styled.section`
  margin-top: 40px;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 640px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 15px;
    padding-bottom: 16px; 
    scrollbar-width: thin;
    scrollbar-color: #3B3028 #f3eee9; 
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-track { background: #f3eee9; border-radius: 10px; }
    &::-webkit-scrollbar-thumb { background-color: #3B3028; border-radius: 10px; }
  }
`;

export const CategoryCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 30px 20px;
  border-radius: 24px;
  border: 1px solid #E9E3D9;
  cursor: pointer;
  background: #fff;
  transition: transform 0.2s ease;
  height: 100%;
  &:hover { transform: translateY(-5px); }
  @media (max-width: 640px) {
    min-width: 130px; 
    padding: 20px 10px;
    scroll-snap-align: start;
    &:hover { transform: none; }
  }
`;

export const CategoryCircle = styled.div`
  width: 100%;
  max-width: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #f3eee9;
  position: relative;
  overflow: hidden;
  img { object-fit: cover; }
  @media (max-width: 640px) { max-width: 80px; }
`;

export const CategoryName = styled.p`
  margin: 0;
  font-weight: 400; 
  font-size: 16px;
  color: #000;
  text-align: center;
  @media (max-width: 640px) { font-size: 13px; }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 1440px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @media (max-width: 1200px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 640px) { grid-template-columns: repeat(1, minmax(0, 1fr)); }
`;