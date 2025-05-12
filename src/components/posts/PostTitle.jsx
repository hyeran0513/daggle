import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import { useResponsive } from "../../hooks/useResponsive";

const PostTitle = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();
  const { isMobile } = useResponsive();

  // 게시글 작성 페이지로 이동
  const handleGoToWrite = useCallback(() => {
    if (isAuthenticated) {
      navigate("/post/write");
    } else {
      alert("로그인 후 글을 작성할 수 있습니다.");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper>
      {/* 제목 */}
      <Title>게시판</Title>

      {/* 글쓰기 버튼 */}
      {!isMobile && (
        <ButtonWrapper>
          <Button variant="purple" size="small" onClick={handleGoToWrite}>
            글쓰기
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  height: 96px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
    height: auto;
    border-bottom: 0;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  letter-spacing: -0.3%;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div``;

export default PostTitle;
