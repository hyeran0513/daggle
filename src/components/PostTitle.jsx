import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const PostTitle = () => {
  const navigate = useNavigate();

  const handleGoToWrite = () => {
    navigate("/post/write");
  };

  return (
    <Wrapper>
      {/* 제목 */}
      <Title>게시판</Title>

      {/* 글쓰기 버튼 */}
      <Button variant="purple" size="small" onClick={handleGoToWrite}>
        글쓰기
      </Button>
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
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  letter-spacing: -0.3%;
`;

export default PostTitle;
