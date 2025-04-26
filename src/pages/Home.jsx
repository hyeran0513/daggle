import { useCallback, useEffect, useState } from "react";
import {
  useInfinitePostsWithAuthors,
  usePostsWithAuthors,
} from "../hooks/usePostData";
import PostTitle from "../components/atoms/PostTitle";
import Pagination from "../components/molecules/Pagination";
import styled from "styled-components";
import { breakpoint } from "../styles/mixins";
import PortfolioCarousel from "../components/organisms/PortfolioCarousel";
import { useQueryClient } from "@tanstack/react-query";
import useWindowWidth from "../hooks/useWindowWidth";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import PostCardList from "../components/organisms/PostCardList";
import FloatingButton from "../components/atoms/FloatingButton";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();
  const isMobile = useWindowWidth(642);

  // [게시판] 리스트 조회
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsWithAuthors({
    page: currentPage,
    limit: limit,
  });

  // [게시판] 리스트 조회_무한 스크롤
  const {
    data: infinitePosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePostsWithAuthors({ limit: 10 });

  // 다른 페이지에서 현재 페이지로 이동될 때, infinitePosts 쿼리 데이터를 초기화
  useEffect(() => {
    queryClient.removeQueries(["infinitePosts"]);
  }, [queryClient]);

  // 페이지가 화면에 보일 때 데이터 조회
  const observerRef = useIntersectionObserver(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  // 페이지 번호가 변경 헨들러
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생</div>;

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
        {isMobile ? (
          infinitePosts?.pages.length > 0 ? (
            <PostCardList
              posts={infinitePosts?.pages.flatMap((page) => page.items)}
            />
          ) : (
            <div>게시글이 없습니다.</div>
          )
        ) : posts?.items?.length > 0 ? (
          <>
            <PostCardList posts={posts.items} />
            {/* 페이지네이션 */}
            <Pagination
              currentPage={posts?.meta?.currentPage}
              totalPages={posts?.meta?.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </PostContainer>

      <FloatingButton />

      {isMobile && (
        <div ref={observerRef}>{isFetchingNextPage && <>로딩 중...</>}</div>
      )}
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
