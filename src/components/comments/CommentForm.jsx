import React, { useCallback, useEffect } from "react";
import Button from "../ui/Button";
import styled from "styled-components";
import { useCreateComment } from "../../hooks/useCommentData";
import { useCommentForm } from "../../hooks/useCommentForm";
import { validateForm } from "../../utils/validation";
import authStore from "../../stores/authStore";
import useInputChange from "../../hooks/useInputChange";

const CommentForm = ({ postId }) => {
  // [댓글] 댓글 생성
  const { mutate } = useCreateComment(postId);
  const [state, dispatch] = useCommentForm();
  const handleInputChange = useInputChange(dispatch);
  const { isAuthenticated } = authStore();

  // 제출 핸들러
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const comment = state.comment;

      // 유효성 검사
      const errors = validateForm({ comment }, "comment");

      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", payload: errors });
        return;
      }

      mutate(comment);

      // 댓글 작성 후 초기화
      dispatch({ type: "SET_COMMENT", payload: "" });
      dispatch({ type: "CLEAR_ERROR", payload: "comment" });
    },
    [dispatch, mutate, state.comment]
  );

  useEffect(() => {
    if (state.errors.comment) {
      alert(state.errors.comment);
    }
  }, [state.errors.comment]);

  return (
    <FormWrapper>
      {/* 댓글 인풋 영역 */}
      <InputField
        type="text"
        value={state.comment}
        placeholder={state.placeholder.comment}
        onChange={handleInputChange("comment")}
      />

      {/* 등록 버튼 */}
      <Button size="small" onClick={handleSubmit} disabled={!isAuthenticated}>
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    left: 0;
    bottom: 0;
    gap: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 24px 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  }
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export default CommentForm;
