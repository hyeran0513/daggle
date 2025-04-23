import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { breakpoint } from "../styles/mixins";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고 */}
        <Logo>
          <LogoImg src={logo} />
        </Logo>

        {/* 로그인 버튼 */}
        <LoginButton>로그인</LoginButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  margin: 0 auto;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  box-shadow: 0px 9px 10px 0px rgba(232, 232, 232, 0.25);
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  ${(props) => breakpoint(props.theme.breakpoints, props.theme.margins)}
`;

const Logo = styled.div`
  width: 150px;
  height: 30px;
  overflow: hidden;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoginButton = styled.button``;

export default Header;
