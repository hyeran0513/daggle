import React from "react";
import styled, { css } from "styled-components";
import { FiXCircle } from "react-icons/fi";

const TextareaField = ({
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  currentLength,
  onDeleteContent,
}) => {
  // 내용 삭제 버튼 핸들러
  const handleDeleteContent = () => {
    onDeleteContent();
  };

  return (
    <FormBox>
      <TextareaFieldWrapper error={error}>
        <TextareaFieldInput
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        {/* 글자 수 */}
        <CharCountWrapper isOver={currentLength > maxLength} error={!!error}>
          {currentLength} / {maxLength}
        </CharCountWrapper>

        {/* 삭제 버튼 */}
        <DeleteButton type="button" onClick={handleDeleteContent}>
          <FiXCircle />
        </DeleteButton>
      </TextareaFieldWrapper>

      {/* 오류 메시지 */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormBox>
  );
};

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  outline: 1px solid transparent;

  ${({ error, theme }) =>
    error &&
    css`
      outline: 1px solid ${theme.colors.error};
      border: 1px solid ${theme.colors.error};
    `}

  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.colors.primary.normal};
    border: 1px solid ${({ theme }) => theme.colors.primary.normal};
  }
`;

const TextareaFieldInput = styled.textarea`
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

const CharCountWrapper = styled.aside.withConfig({
  shouldForwardProp: (prop) => !["isOver", "error"].includes(prop),
})`
  margin: 8px 16px 16px;
  text-align: right;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3%;
  color: ${({ isOver, error, theme }) =>
    isOver || error ? theme.colors.error : theme.colors.label.natural};
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

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.error};
`;

export default TextareaField;
