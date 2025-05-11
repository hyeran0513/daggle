import React, { useCallback } from "react";
import styled from "styled-components";
import { ellipsis } from "../../styles/mixins";
import { formatToYYMMDD } from "../../utils/format";
import { BiCommentDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();

  // 게시글 상세 페이지로 이동
  const handleGoToDetail = useCallback(() => {
    if (isAuthenticated) {
      navigate(`/post/${post?.id}`);
    } else {
      alert("로그인 후 게시글을 확인할 수 있습니다.");
    }
  }, [isAuthenticated, navigate, post?.id]);

  return (
    <Card>
      <CardButton onClick={handleGoToDetail}>
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

          {/* 한다글다글 담당자님께서 author 정보가 아닌 '익명의유저'로 출력해달라고 요청 */}
          <AuthorInfo>
            <ProfileImageWrapper></ProfileImageWrapper>

            <NickName>익명의유저</NickName>
          </AuthorInfo>
        </Meta>
      </CardButton>
    </Card>
  );
};

const Card = styled.li``;

const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  text-align: left;
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
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.3%;
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
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
