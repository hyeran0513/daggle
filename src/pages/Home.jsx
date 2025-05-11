import PostTitle from "../components/posts/PostTitle";
import styled from "styled-components";
import { breakpoint } from "../styles/mixins";
import PortfolioCarousel from "../components/portfolio/PortfolioCarousel";
import useWindowWidth from "../hooks/useWindowWidth";
import FloatingButton from "../components/ui/FloatingButton";
import PostWithPagination from "../components/pagination/PostWithPagination";
import PostWithInfiniteScroll from "../components/pagination/PostWithInfiniteScroll";
import SEO from "../components/SEO/SEO";
import { motion } from "framer-motion";

const Home = () => {
  const isMobile = useWindowWidth(642);

  return (
    <>
      {/* SEO 설정 */}
      <SEO
        title="다글제작소 - 홈"
        description="다글제작소 커뮤니티의 홈 페이지"
        keywords="다글제작소, 커뮤니티, FE 과제, 포트폴리오, React, 프론트엔드"
      />

      <Container>
        {/* 페이지 제목 */}
        <TitleWrapper>
          <TitleContainer
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <Title
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  },
                },
              }}
            >
              다글제작소
            </Title>
            <Subtitle
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4,
                  },
                },
              }}
            >
              다글제작소의 과제전형에
              <br /> 오신 것을 환영합니다.
            </Subtitle>
          </TitleContainer>
        </TitleWrapper>

        {/* 포트폴리오 영역 */}
        <PortfoiloWrapper>
          <PortfolioCarousel />
        </PortfoiloWrapper>

        {/* 포스트 영역 */}
        <PostContainer>
          {/* 포스트 제목 */}
          <PostTitle />

          {/* 포스트 목록 */}
          {isMobile ? (
            <PostWithInfiniteScroll isMobile />
          ) : (
            <PostWithPagination />
          )}
        </PostContainer>

        <FloatingButton />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 186px 0 120px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 56px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const TitleContainer = styled(motion.div)``;

const Title = styled(motion.h3)`
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.label.natural};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const Subtitle = styled(motion.p)`
  font-weight: 700;
  font-size: 32px;
  line-height: 160%;
  letter-spacing: -1.5%;
  color: ${({ theme }) => theme.colors.label.strong};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const PortfoiloWrapper = styled.div`
  padding-top: 40px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px 0;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const PostContainer = styled.div`
  margin-top: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 12px;
    border-radius: 0;
  }
`;

export default Home;
