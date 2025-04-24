import React, { useState } from "react";
import { breakpoint } from "../styles/mixins";
import styled from "styled-components";
import { usePostForm } from "../hooks/usePostForm";
import Button from "../components/Button";
import { FiXCircle } from "react-icons/fi";
import { validateForm } from "../utils/validation";

const PostWrite = () => {
  const [state, dispatch] = usePostForm();
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = 300;

  // 내용 삭제 버튼 핸들러
  const handleDeleteContent = () => {
    dispatch({ type: "SET_CONTENT", payload: "" });
    setCurrentLength(0);
  };

  // 등록 핸들러
  const handleSubmit = () => {
    const title = state.title;
    const content = state.content;

    const errors = validateForm({ title, content });

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }
  };

  return (
    <Container>
      <PostContainer>
        <PostHead>
          <Title>게시글 작성</Title>
        </PostHead>

        <Form>
          {/* 게시글 제목 */}
          <FieldWrapper>
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
          </FieldWrapper>

          {/* 게시글 내용 */}
          <FieldWrapper>
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
          </FieldWrapper>
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
  ${(props) => breakpoint(props.theme.breakpoints, props.theme.margins)}
`;

const PostContainer = styled.div`
  padding: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray300};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
`;

const PostHead = styled.div`
  padding-bottom: 24px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.3%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputField = styled.input`
  padding: 0 16px;
  width: 100%;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.line.normal};
  border-radius: 8px;
  transition: border 0.3s ease;

  ${({ error, theme }) =>
    error &&
    `
      border: 2px solid ${theme.colors.error};
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.label.alternative};
  }

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary.normal};
  }
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
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.error};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
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

export default PostWrite;
