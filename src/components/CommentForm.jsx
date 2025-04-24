import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { useCreateComment } from "../hooks/useCommentData";

const CommentForm = ({ postId }) => {
  const { mutate } = useCreateComment(postId);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("댓글을 입력해 주세요.");
    }

    mutate(comment);

    setComment("");
  };

  return (
    <FormWrapper>
      {/* 댓글 인풋 영역 */}
      <InputField
        type="text"
        value={comment}
        placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
        onChange={(e) => setComment(e.target.value)}
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
