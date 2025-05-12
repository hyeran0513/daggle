import React, { useCallback, useEffect, useState } from "react";
import { breakpoint } from "../styles/mixins";
import styled from "styled-components";
import { usePostForm } from "../hooks/usePostForm";
import Button from "../components/ui/Button";
import { FiChevronLeft } from "react-icons/fi";
import { validateForm } from "../utils/validation";
import { useNavigate, useParams } from "react-router-dom";
import { usePostDetailData, useEditPost } from "../hooks/usePostData";
import useInputChange from "../hooks/useInputChange";
import TextField from "../components/ui/TextField";
import TextareaField from "../components/ui/TextareaField";
import SEO from "../components/SEO/SEO";
import { useResponsive } from "../hooks/useResponsive";

const PostEdit = () => {
  const [state, dispatch] = usePostForm();
  const handleInputChange = useInputChange(dispatch);
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = 300;
  const { id } = useParams();
  const { data: post } = usePostDetailData(id);
  const { mutate } = useEditPost(id);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const isDisabled =
    post?.title === state.title && post?.content === state.content;

  // 내용 삭제 버튼 핸들러
  const handleDeleteContent = useCallback(() => {
    dispatch({ type: "SET_CONTENT", payload: "" });
    setCurrentLength(0);
  }, [dispatch]);

  // 수정 핸들러
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const title = state.title;
      const content = state.content;

      // 유효성 검사
      const errors = validateForm({ title, content }, "post");

      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", payload: errors });
        return;
      }

      mutate({ title, content });
    },
    [state.title, state.content, dispatch, mutate]
  );

  useEffect(() => {
    if (post) {
      dispatch({ type: "SET_TITLE", payload: post.title });
      dispatch({ type: "SET_CONTENT", payload: post.content });
      setCurrentLength(post.content?.length || 0);
    }
  }, [post, dispatch]);

  // 뒤로가기 핸들러
  const handleBack = useCallback(() => {
    navigate(`/post/${id}`);
  }, [navigate, id]);

  return (
    <>
      {/* SEO 설정 */}
      <SEO
        title="다글제작소 - 게시글 수정"
        description="다글제작소에서 작성한 게시글을 수정"
        keywords="다글제작소, 게시글 수정, 커뮤니티, React"
      />

      <Container>
        <PostContainer>
          <PostHead>
            {isMobile && (
              <BackButton onClick={handleBack}>
                <FiChevronLeft />
              </BackButton>
            )}

            <Title>게시글 수정</Title>

            {isMobile && (
              <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
            )}
          </PostHead>

          <Form>
            {/* 게시글 제목 */}
            <TextField
              type="text"
              value={state.title}
              placeholder={state.placeholder.title}
              onChange={handleInputChange("title")}
              error={state.errors.title}
            />

            {/* 게시글 내용 */}
            <TextareaField
              value={state.content}
              placeholder={state.placeholder.content}
              onChange={handleInputChange("content", {
                onChange: (value) => setCurrentLength(value.length),
              })}
              error={state.errors.content}
              maxLength={maxLength}
              currentLength={currentLength}
              onDeleteContent={handleDeleteContent}
            />
          </Form>
        </PostContainer>

        {/* 수정 버튼 */}
        {!isMobile && (
          <ButtonWrapper>
            <Button size="large" onClick={handleSubmit} disabled={isDisabled}>
              수정하기
            </Button>
          </ButtonWrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 110px 0 80px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 57px 0 56px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const PostContainer = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px;
    border: 0;
  }
`;

const PostHead = styled.div`
  padding-bottom: 24px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
    height: 56px;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 101;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.3%;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 4px;
    font-size: 16px;
    line-height: 150%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const BackButton = styled.button`
  svg {
    font-size: 24px;
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  margin-left: auto;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default PostEdit;
