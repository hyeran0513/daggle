import React from "react";
import Button from "./Button";
import styled from "styled-components";
import { useCreateComment } from "../hooks/useCommentData";
import { useCommentForm } from "../hooks/useCommentForm";
import { validateForm } from "../utils/validation";

const CommentForm = ({ postId }) => {
  // [댓글] 댓글 생성
  const { mutate } = useCreateComment(postId);
  const [state, dispatch] = useCommentForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    const comment = state.comment;

    // 유효성 검사
    const errors = validateForm({ comment }, "comment");

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });

      if (state.errors.comment) {
        alert(`${state.errors.comment}`);
      }

      return;
    }

    mutate(comment);

    dispatch({ type: "CLEAR_ERROR", payload: "comment" });
  };

  return (
    <FormWrapper>
      {/* 댓글 인풋 영역 */}
      <InputField
        type="text"
        value={state.comment}
        placeholder={state.placeholder.comment}
        onChange={(e) => {
          dispatch({ type: "SET_COMMENT", payload: e.target.value });
          dispatch({ type: "CLEAR_ERROR", payload: "comment" });
        }}
      />

      {/* 등록 버튼 */}
      <Button size="small" onClick={handleSubmit}>
        등록
      </Button>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 0 12px;
  height: 48px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  outline: none;
  transition: border-bottom 0.3s ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.normal};
  }
`;

export default CommentForm;
