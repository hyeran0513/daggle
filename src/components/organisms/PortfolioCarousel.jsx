import React, { useState, useEffect } from "react";
import styled from "styled-components";
import printy from "../../assets/images/portfolio/printy.png";
import sparta from "../../assets/images/portfolio/sparta.png";
import kosta from "../../assets/images/portfolio/kosta.png";
import sweet from "../../assets/images/portfolio/sweet.png";
import { multiEllipsis } from "../../styles/mixins";
import { motion } from "framer-motion";

const portfolios = [
  {
    title: "프린티",
    subTitle: "주식회사 프린티",
    description: "작가와 팬을 잇는 일러스트 출력 플랫폼",
    image: printy,
    link: "https://daggle.io/portfolio/5",
  },
  {
    title: "스파르타빌더스",
    subTitle: "팀스파르타",
    description: "물류 관계자 비교견적 솔루션",
    image: sparta,
    link: "https://daggle.io/portfolio/8",
  },
  {
    title: "KOSTA-EDU",
    subTitle: "한국소프트웨어 기술진흥협회",
    description: "학습관리 시스템",
    image: kosta,
    link: "https://daggle.io/portfolio/7",
  },
  {
    title: "달콤수학",
    subTitle: "달콤교육",
    description: "엄마표 온라인 수학교육 강의 플랫폼",
    image: sweet,
    link: "https://daggle.io/portfolio/6",
  },
];

const PortfolioCarousel = () => {
  const slideWidth = 320;
  const gap = 20;
  const repeatedData = [
    ...portfolios,
    ...portfolios,
    ...portfolios,
    ...portfolios,
  ];
  const oneSetWidth = portfolios.length * (slideWidth + gap);

  const [translateX, setTranslateX] = useState(-oneSetWidth);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // hover 상태가 아닐 때, 슬라이드 위치를 1씩 감소시켜 왼쪽으로 이동
  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        setTranslateX((prev) => prev - 1);
      }, 16);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  // 슬라이드가 한 세트의 끝에 도달하면, 위치를 리셋하고 애니메이션을 멈춤
  useEffect(() => {
    if (translateX <= -2 * oneSetWidth || translateX >= 0) {
      setIsTransitioning(false);
      setTranslateX(-oneSetWidth);
    }
  }, [translateX]);

  // 애니메이션이 끝난 후, 잠시 후 애니메이션 활성화
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <CarouselContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
    >
      <Slider translateX={translateX} isTransitioning={isTransitioning}>
        {repeatedData?.map((item, index) => (
          <Slide
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <Title>{item.title}</Title>

            <Meta>
              <Description>{item.description}</Description>
              <Subtitle>{item.subTitle}</Subtitle>
            </Meta>
          </Slide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  overflow: hidden;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Slider = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["translateX", "isTransitioning"].includes(prop),
})`
  display: flex;
  transform: ${({ translateX }) => `translateX(${translateX}px)`};
  transition: ${({ isTransitioning }) =>
    isTransitioning ? "transform 0.1s linear" : "none"};
`;

const Slide = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  margin-right: 20px;
  padding: 24px;
  width: 320px;
  height: 390px;
  border-radius: 20px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 328px;
  }
`;

const Title = styled.h3`
  position: relative;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.white};
  z-index: 2;
`;

const Meta = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.line.strong};
  z-index: 2;
`;

const Subtitle = styled.h4`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.white};
  ${multiEllipsis(2)}
`;

export default PortfolioCarousel;
