import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { breakpoint } from "../styles/mixins";
import { Link } from "react-router-dom";
import authStore from "../stores/authStore";
import { LuCircleUser } from "react-icons/lu";
import { useLogout } from "../hooks/useAuthData";
import OutsideClickHandler from "react-outside-click-handler";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const { isAuthenticated, user } = authStore();
  const { mutate: logout } = useLogout();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const togglePopOver = () => {
    setIsPopOverOpen((prev) => !prev);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      logout();
    }
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo to="/">
          <LogoImg src={logo} />
        </Logo>

        {isAuthenticated ? (
          <PopOverWrapper>
            <OutsideClickHandler onOutsideClick={() => setIsPopOverOpen(false)}>
              <PopOverButton onClick={togglePopOver}>
                <LuCircleUser />
              </PopOverButton>

              {isPopOverOpen && (
                <PopOver>
                  <PopOverItem>
                    {user?.nickname || "(알 수 없음)"} 님
                  </PopOverItem>
                  <PopOverItem>
                    <button onClick={handleLogout}>로그아웃</button>
                  </PopOverItem>
                </PopOver>
              )}
            </OutsideClickHandler>
          </PopOverWrapper>
        ) : (
          <LoginButton to="/login">로그인</LoginButton>
        )}

        {/* 햄버거 버튼 */}
        <HamburgerButton>
          <FiMenu />
        </HamburgerButton>
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-bottom: 0;
    box-shadow: none;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  ${({ theme }) => breakpoint(theme.breakpoints, theme.margins)}

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px;
    height: 56px;
  }
`;

const Logo = styled(Link)`
  width: 150px;
  height: 30px;
  overflow: hidden;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
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

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const PopOverWrapper = styled.div`
  position: relative;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const PopOverButton = styled.button`
  svg {
    font-size: 32px;
  }
`;

const PopOver = styled.div`
  position: absolute;
  top: calc(100% + 50px);
  right: 0;
  width: 190px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 4px 4px 10px 0px rgba(120, 120, 120, 0.25);
`;

const PopOverItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
`;

const HamburgerButton = styled.button`
  display: none;

  svg {
    font-size: 24px;
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

export default Header;
