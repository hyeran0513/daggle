import React from "react";
import styled from "styled-components";
import { ellipsis } from "../styles/mixins";
import { formatDate } from "../utils/format";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { id, title, createdAt, commentCount } = post;

  return (
    <Card>
      <CardLink to={`/post/${id}`}>
        {/* 제목 */}
        <Title>{title}</Title>

        {/* 메타 데이터 */}
        <Meta>
          {/* 날짜 */}
          <Date>{formatDate(createdAt)}</Date>

          {/* 댓글 수 */}
          <CommentCountWrapper>
            <BiCommentDetail />
            <CommentCount>{commentCount}</CommentCount>
          </CommentCountWrapper>
        </Meta>
      </CardLink>
    </Card>
  );
};

const Card = styled.li``;

const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  cursor: pointer;
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
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${(props) => props.theme.colors.gray600};
`;

const CommentCountWrapper = styled.div`
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
