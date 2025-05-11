import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authStore from "../../stores/authStore";
import { LuPencil } from "react-icons/lu";

const FloatingButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();

  // 게시글 작성 페이지로 이동
  const handleGoToWrite = useCallback(() => {
    if (isAuthenticated) {
      navigate("/post/write");
    } else {
      alert("로그인 후 글을 작성할 수 있습니다.");
    }
  }, [isAuthenticated, navigate]);

  return (
    <WriteButton onClick={handleGoToWrite}>
      <LuPencil />
    </WriteButton>
  );
};

const WriteButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 16px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  box-shadow: 0px 4px 5px rgba(159, 159, 159, 0.25);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.strong};
  }

  svg {
    font-size: 24px;
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export default FloatingButton;
