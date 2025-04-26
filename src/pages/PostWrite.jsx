import React, { useState } from "react";
import {
  breakpoint,
  errorMessage,
  form,
  formBox,
  inputField,
} from "../styles/mixins";
import styled from "styled-components";
import { usePostForm } from "../hooks/usePostForm";
import Button from "../components/atoms/Button";
import { FiXCircle, FiChevronLeft } from "react-icons/fi";
import { validateForm } from "../utils/validation";
import { usePostCreate } from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";

const PostWrite = () => {
  const [state, dispatch] = usePostForm();
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = 300;
  const { mutate } = usePostCreate();
  const navigate = useNavigate();

  // 내용 삭제 버튼 핸들러
  const handleDeleteContent = () => {
    dispatch({ type: "SET_CONTENT", payload: "" });
    setCurrentLength(0);
  };

  // 등록 핸들러
  const handleSubmit = (e) => {
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
  };

  // 뒤로가기 핸들러
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Container>
      <PostContainer>
        <PostHead>
          <BackButton onClick={handleBack}>
            <FiChevronLeft />
          </BackButton>

          <Title>게시글 작성</Title>

          <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        </PostHead>

        <Form>
          {/* 게시글 제목 */}
          <FormBox>
            <InputField
              type="text"
              value={state.title}
              placeholder={state.placeholder.title}
              onChange={(e) => {
                dispatch({ type: "SET_TITLE", payload: e.target.value });
                dispatch({ type: "CLEAR_ERROR", payload: "title" });
              }}
              error={Boolean(state.errors.title)}
            />

            {/* 게시글 제목 오류 메시지 */}
            {state.errors.title && (
              <ErrorMessage>{state.errors.title}</ErrorMessage>
            )}
          </FormBox>

          {/* 게시글 내용 */}
          <FormBox>
            <TextareaFieldWrapper error={Boolean(state.errors.content)}>
              <TextareaField
                value={state.content}
                placeholder={state.placeholder.content}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch({ type: "SET_CONTENT", payload: value });
                  setCurrentLength(value.length);
                  dispatch({ type: "CLEAR_ERROR", payload: "content" });
                }}
              />

              {/* 글자 수 */}
              <CharCountWrapper isOver={currentLength > maxLength}>
                {currentLength} / {maxLength}
              </CharCountWrapper>

              {/* 삭제 버튼 */}
              <DeleteButton type="button" onClick={handleDeleteContent}>
                <FiXCircle />
              </DeleteButton>
            </TextareaFieldWrapper>

            {/* 게시글 내용 오류 메시지 */}
            {state.errors.content && (
              <ErrorMessage>{state.errors.content}</ErrorMessage>
            )}
          </FormBox>
        </Form>
      </PostContainer>

      {/* 등록 버튼 */}
      <ButtonWrapper>
        <Button size="large" onClick={handleSubmit}>
          등록하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 110px 0 80px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 56px 0;
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
  ${form};
`;

const FormBox = styled.div`
  ${formBox};
`;

const InputField = styled.input`
  ${inputField};
`;

const TextareaFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 306px;
  border: 1px solid ${({ theme }) => theme.colors.line.normal};
  border-radius: 8px;
  overflow: hidden;
  transition: border 0.3s ease;

  ${({ error, theme }) =>
    error &&
    `
      border: 2px solid ${theme.colors.error};
  `}

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.primary.normal};
  }
`;

const TextareaField = styled.textarea`
  padding: 16px;
  width: 100%;
  flex: 1;
  border: none;
  resize: none;
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  font-family: "pretendard";

  &::placeholder {
    color: ${({ theme }) => theme.colors.label.assistive};
  }
`;

const ErrorMessage = styled.div`
  ${errorMessage}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const CharCountWrapper = styled.div`
  margin: 8px 16px 16px;
  text-align: right;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3%;
  color: ${({ isOver, theme }) =>
    isOver ? theme.colors.error : theme.colors.label.natural};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.white};

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.label.alternative};
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

const SubmitButton = styled.button`
  margin-left: auto;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
`;

export default PostWrite;
