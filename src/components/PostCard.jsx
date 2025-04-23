import React from "react";
import styled from "styled-components";
import { ellipsis } from "../styles/mixins";
import { formatDate } from "../utils/format";
import { BiCommentDetail } from "react-icons/bi";

const PostCard = ({ post }) => {
  const { title, createdAt, commentCount } = post;

  return (
    <Card>
      {/* 제목 */}
      <Title>{title}</Title>

      {/* 메타 데이터 */}
      <Meta>
        {/* 날짜 */}
        <Date>{formatDate(createdAt)}</Date>

        {/* 댓글 수 */}
        <Comment>
          <BiCommentDetail />
          <CommentCount>{commentCount}</CommentCount>
        </Comment>
      </Meta>
    </Card>
  );
};

const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.3%;
  flex: 1;
  ${ellipsis}
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Date = styled.div`
  font-weight: 400;
  size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${(props) => props.theme.colors.gray600};
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.colors.gray600};

  svg {
    font-size: 18px;
  }
`;

const CommentCount = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
`;

export default PostCard;
