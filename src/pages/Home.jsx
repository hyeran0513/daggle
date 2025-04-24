import React, { useState } from "react";
import { usePostsData } from "../hooks/usePostData";
import PostCard from "../components/PostCard";
import PostTitle from "../components/PostTitle";
import Pagination from "../components/Pagination";
import styled from "styled-components";
import { breakpoint } from "../styles/mixins";
import PortfolioCarousel from "../components/PortfolioCarousel";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  // [게시판] 리스트 조회
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsData({
    page: currentPage,
    limit: limit,
  });

  // 페이지 번호가 변경 헨들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      <PortfolioCarousel />

      {/* 포스트 영역 */}
      <PostContainer>
        {/* 포스트 제목 */}
        <PostTitle />

        {/* 포스트 목록 */}
        {posts?.items?.length > 0 ? (
          <PostCardWrapper>
            {posts?.items?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostCardWrapper>
        ) : (
          <div>게시글이 없습니다.</div>
        )}

        {/* 페이지네이션 */}
        <Pagination
          currentPage={posts?.meta?.currentPage}
          totalPages={posts?.meta?.totalPages}
          onPageChange={handlePageChange}
        />
      </PostContainer>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => breakpoint(props.theme.breakpoints, props.theme.margins)}
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.label.natural};
`;

const Subtitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 160%;
  letter-spacing: -1.5%;
  color: ${({ theme }) => theme.colors.label.strong};
`;

const PostContainer = styled.div`
  margin-top: 40px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 16px;
`;

const PostCardWrapper = styled.ul``;

export default Home;
