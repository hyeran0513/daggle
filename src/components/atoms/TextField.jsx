import styled from "styled-components";
import { inputField, errorMessage, formBox } from "../../styles/mixins";

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
  ${formBox}
`;

const InputField = styled.input`
  ${inputField}
  border-color: ${({ error, theme }) =>
    error ? theme.colors.error : theme.colors.gray300};
`;

const ErrorMessage = styled.div`
  ${errorMessage}
`;

export default TextField;
