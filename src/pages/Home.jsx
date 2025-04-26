import PostTitle from "../components/atoms/PostTitle";
import styled from "styled-components";
import { breakpoint } from "../styles/mixins";
import PortfolioCarousel from "../components/organisms/PortfolioCarousel";
import useWindowWidth from "../hooks/useWindowWidth";
import FloatingButton from "../components/atoms/FloatingButton";
import PostWithPagination from "../components/organisms/PostWithPagination";
import PostWithInfiniteScroll from "../components/organisms/PostWithInfiniteScroll";

const Home = () => {
  const isMobile = useWindowWidth(642);

  return (
    <Container>
      {/* 페이지 제목 */}
      <TitleWrapper>
        <Title>다글제작소</Title>
        <Subtitle>
          다글제작소의 과제전형에
          <br /> 오신 것을 환영합니다.
        </Subtitle>
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
        {isMobile ? <PostWithInfiniteScroll /> : <PostWithPagination />}
      </PostContainer>

      <FloatingButton />
    </Container>
  );
};

const Container = styled.div`
  padding: 186px 0;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 56px 0 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Title = styled.div`
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

const Subtitle = styled.div`
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
