import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { breakpoint } from "../styles/mixins";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        {/* 로고 */}
        <Logo to="/">
          <LogoImg src={logo} />
        </Logo>

        {/* 로그인 버튼 */}
        <LoginButton to="/login">로그인</LoginButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  box-shadow: 0px 9px 10px 0px rgba(232, 232, 232, 0.25);
  z-index: 100;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}
`;

const Logo = styled(Link)`
  width: 150px;
  height: 30px;
  overflow: hidden;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoginButton = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
`;

export default Header;
