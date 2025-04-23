import React from "react";
import Button from "./Button";
import styled from "styled-components";

const CommentForm = () => {
  return (
    <FormWrapper>
      {/* 댓글 인풋 영역 */}
      <InputField
        type="text"
        placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
      />

      {/* 등록 버튼 */}
      <Button size="small">등록</Button>
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
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  outline: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.normal};
  }
`;

export default CommentForm;
