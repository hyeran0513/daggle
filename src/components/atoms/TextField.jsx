import styled, { css } from "styled-components";

const TextField = ({ type = "text", value, placeholder, onChange, error }) => {
  return (
    <FormBox>
      <InputField
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
      />

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

const InputField = styled.input`
  padding: 0 16px;
  width: 100%;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  border: 1px solid ${({ theme }) => theme.colors.line.normal};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: border 0.3s ease;
  font-family: "pretendard";
  outline: 1px solid transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.label.assistive};
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary.normal};
    border: 1px solid ${({ theme }) => theme.colors.primary.normal};
  }

  ${({ error, theme }) =>
    error &&
    css`
      outline: 1px solid ${theme.colors.error};
      border: 1px solid ${theme.colors.error};
    `}
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.error};
`;

export default TextField;
