import React from "react";
import { usePostDetailData, usePostDelete } from "../hooks/usePostData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/format";
import { BiCommentDetail } from "react-icons/bi";
import { breakpoint } from "../styles/mixins";
import styled from "styled-components";
import { useCommentsData } from "../hooks/useCommentData";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = usePostDetailData(id);
  const { data: comments, isLoading } = useCommentsData(id);
  const { mutate } = usePostDelete();
  const navigate = useNavigate();

  const deletePost = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      mutate(id);
      navigate("/");
    }
  };

  if (isLoading) return <>로딩 중...</>;

  return (
    <Container>
      <PostContainer>
        <PostHead>
          {/* 게시글 제목 */}
          <Title>{post?.title}</Title>

          {/* 메타 데이터 */}
          <Meta>
            <NickName>{post?.nickname || "(알 수 없음)"}</NickName>
            <Date>{formatDate(post?.createdAt)}</Date>

            <ButtonWrapper>
              <EditButton to={`/post/edit/${id}`}>수정</EditButton>
              <DeleteButton onClick={deletePost}>삭제</DeleteButton>
            </ButtonWrapper>
          </Meta>
        </PostHead>

        <PostContent>
          {/* 게시글 내용 */}
          <Content>{post?.content}</Content>

          {/* 댓글 수 */}
          <CommentCountWrapper>
            <BiCommentDetail />
            <CommentCount>{post?.commentCount}</CommentCount>
          </CommentCountWrapper>
        </PostContent>

        <PostFooter>
          {/* 댓글 목록 */}
          <CommentWrapper>
            {comments?.length > 0 && (
              <>
                {comments?.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
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
`;

const PostContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

const PostHead = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const Title = styled.div`
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const EditButton = styled(Link)`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray700};
`;

const DeleteButton = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray700};
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  min-height: 260px;
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
`;

const PostFooter = styled.div``;

const CommentWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
`;

export default PostDetail;
