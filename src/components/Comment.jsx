import React from "react";
import styled from "styled-components";
import { formatDate } from "../utils/format";

const Comment = ({ comment }) => {
  return (
    <CommentItem>
      <NickName>{comment?.user?.nickname || "(알 수 없음)"}</NickName>
      <Content>{comment?.content}</Content>
      <Date>{formatDate(comment?.createdAt)}</Date>
    </CommentItem>
  );
};

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const NickName = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray900};
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray800};
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray600};
`;

export default Comment;
