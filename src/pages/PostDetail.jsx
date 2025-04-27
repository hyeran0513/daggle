import React, { useCallback } from "react";
import { usePostDetailData, useDeletePost } from "../hooks/usePostData";
import { useNavigate, useParams } from "react-router-dom";
import { formatToYYYYMMDD } from "../utils/format";
import { BiCommentDetail } from "react-icons/bi";
import { breakpoint } from "../styles/mixins";
import styled from "styled-components";
import { useCommentsData } from "../hooks/useCommentData";
import Comment from "../components/molecules/Comment";
import CommentForm from "../components/molecules/CommentForm";
import authStore from "../stores/authStore";
import { FiChevronLeft } from "react-icons/fi";
import Loading from "../components/atoms/Loading";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isLoading: postLoading } = usePostDetailData(id);
  const { data: comments, isLoading: commentsLoading } = useCommentsData(id);
  const { mutate: deletePost } = useDeletePost();
  const navigate = useNavigate();
  const { user } = authStore();
  const isAuthor = post?.author?.id === user?.id;

  // 삭제 핸들러
  const handleDelete = useCallback(() => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePost(id);
      navigate("/");
    }
  }, [id, deletePost, navigate]);

  // 수정 핸들러
  const handleEdit = useCallback(
    (postId) => {
      navigate(`/post/edit/${postId}`);
    },
    [navigate]
  );

  // 뒤로가기 핸들러
  const handleBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/");
    },
    [navigate]
  );

  if (postLoading && commentsLoading) return <Loading />;

  return (
    <Container>
      <NavigatorBar>
        <BackButton onClick={handleBack}>
          <FiChevronLeft />
        </BackButton>
      </NavigatorBar>

      <PostContainer>
        <PostHead>
          {/* 게시글 제목 */}
          <Title>{post?.title}</Title>

          {/* 메타 데이터 */}
          <Meta>
            <NickName>{post?.author?.nickname || "(닉네임 없음)"}</NickName>
            <Date>{formatToYYYYMMDD(post?.createdAt)}</Date>

            {/* 본인 작성 게시글일 경우 버튼 노출 */}
            {isAuthor && (
              <ButtonWrapper>
                <ControlButton onClick={() => handleEdit(id)}>
                  수정
                </ControlButton>
                <ControlButton onClick={handleDelete}>삭제</ControlButton>
              </ButtonWrapper>
            )}
          </Meta>
        </PostHead>

        <PostContent>
          {/* 게시글 내용 */}
          <Content>{post?.content}</Content>

          {/* 댓글 수 */}
          <CommentCountWrapper>
            <BiCommentDetail />
            <CommentCount>{post?.commentCount}개</CommentCount>
          </CommentCountWrapper>
        </PostContent>

        <PostFooter>
          {/* 댓글 목록 */}
          <CommentWrapper>
            {comments?.length > 0 && (
              <>
                {comments?.map((comment) => (
                  <Comment key={comment?.id} comment={comment} />
                ))}
              </>
            )}
          </CommentWrapper>

          {/* 댓글 폼 영역 */}
          <CommentForm postId={id} />
        </PostFooter>
      </PostContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 110px 0 100px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 56px 0 96px;
  }
`;

const NavigatorBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 101;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
  }
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 24px;
  }
`;

const PostContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: calc(100vh - 152px);
    border: 0;
    border-radius: 0;
  }
`;

const PostHead = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
    border-bottom: 0;
  }
`;

const Title = styled.div`
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 8px;
    font-size: 18px;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
`;

const NickName = styled.div`
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

const Date = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray600};

  &::before {
    content: "";
    display: inline-block;
    margin-right: 12px;
    width: 2px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.gray300};
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const ControlButton = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray700};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  min-height: 260px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;
    min-height: 183px;
  }
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray800};
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.gray800};

  svg {
    font-size: 18px;
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

const PostFooter = styled.div``;

const CommentWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
`;

export default PostDetail;
