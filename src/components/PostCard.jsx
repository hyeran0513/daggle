import React from "react";
import styled from "styled-components";
import { ellipsis } from "../styles/mixins";
import { formatToYYMMDD } from "../utils/format";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Card>
      <CardLink to={`/post/${post?.id}`}>
        {/* 제목 */}
        <Title>{post?.title}</Title>

        {/* 메타 데이터 */}
        <Meta>
          {/* 날짜 */}
          <Date>{formatToYYMMDD(post?.createdAt)}</Date>

          {/* 댓글 수 */}
          <CommentCountWrapper>
            <BiCommentDetail />
            <CommentCount>{post?.commentCount}</CommentCount>
          </CommentCountWrapper>

          <AuthorInfo>
            <ProfileImageWrapper>
              {post?.author?.profileImageUrl && (
                <ProfileImage img={post?.author?.profileImageUrl} alt="" />
              )}
            </ProfileImageWrapper>

            <NickName> {post?.author?.nickname || "(닉네임 없음)"}</NickName>
          </AuthorInfo>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  cursor: pointer;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
  }
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.3%;
  flex: 1;
  ${ellipsis}

  /* 모바일 */
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray600};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.gray600};

  svg {
    font-size: 18px;
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    svg {
      font-size: 20px;
    }
  }
`;

const CommentCount = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: auto;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray600};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: ${({ theme }) => theme.colors.gray400};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NickName = styled.div`
  display: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray900};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default PostCard;
