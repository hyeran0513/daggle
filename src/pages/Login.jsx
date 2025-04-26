import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateForm } from "../utils/validation";
import { errorMessage, form, formBox, inputField } from "../styles/mixins";
import { useLogin } from "../hooks/useAuthData";
import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

const Login = () => {
  const [state, dispatch] = useAuthForm();
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();

  // [Auth] 로그인
  const { mutate } = useLogin();

  // 로그인 상태일 경우 로그인 페이지 접근 불가능
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // 등록 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const loginId = state.id;
    const password = state.password;

    // 유효성 검사
    const errors = validateForm({ id: loginId, password }, "login");

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    mutate({ loginId, password });
  };

  return (
    <Container>
      <FormContainer>
        <TitleWrapper>
          <Title>
            안녕하세요
            <br />
            <Brand>한다글다글</Brand>입니다.
          </Title>

          <Subtitle>로그인을 통해 더 많은 기능을 이용하세요</Subtitle>
        </TitleWrapper>

        <Form>
          {/* 아이디 */}
          <FormBox>
            <InputField
              type="text"
              value={state.id}
              placeholder={state.placeholder.id}
              onChange={(e) => {
                dispatch({ type: "SET_ID", payload: e.target.value });
                dispatch({ type: "CLEAR_ERROR", payload: "id" });
              }}
              error={Boolean(state.errors.id)}
            />

            {/* 아이디 오류 메시지 */}
            {state.errors.id && <ErrorMessage>{state.errors.id}</ErrorMessage>}
          </FormBox>

          {/* 비밀번호 */}
          <FormBox>
            <InputField
              type="password"
              value={state.password}
              placeholder={state.placeholder.password}
              onChange={(e) => {
                dispatch({ type: "SET_PASSWORD", payload: e.target.value });
                dispatch({ type: "CLEAR_ERROR", payload: "password" });
              }}
              error={Boolean(state.errors.password)}
            />

            {/* 비밀번호 오류 메시지 */}
            {state.errors.password && (
              <ErrorMessage>{state.errors.password}</ErrorMessage>
            )}
          </FormBox>

          {/* 로그인 버튼 */}
          <ButtonWrapper>
            <Button size="full" onClick={handleSubmit}>
              로그인
            </Button>
          </ButtonWrapper>
        </Form>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    padding: 56px 0;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const FormContainer = styled.div`
  padding: 40px 32px;
  width: 454px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px 16px;
    border-radius: 0;
    border: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 160%;
  letter-spacing: -1.5%;
`;

const Brand = styled.span`
  font-weight: 700;
  font-size: 32px;
  line-height: 160%;
  letter-spacing: -1.5%;
  color: ${({ theme }) => theme.colors.primary.heavy};
`;

const Subtitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Form = styled.form`
  ${form};
`;

const FormBox = styled.div`
  ${formBox};
`;

const InputField = styled.input`
  ${inputField}
`;

const ErrorMessage = styled.div`
  ${errorMessage}
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
`;

export default Login;
