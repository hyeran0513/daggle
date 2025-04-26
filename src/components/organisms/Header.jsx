import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { breakpoint } from "../../styles/mixins";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
import { LuCircleUser } from "react-icons/lu";
import { useLogout } from "../../hooks/useAuthData";
import OutsideClickHandler from "react-outside-click-handler";

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
                    {user?.nickname || "(닉네임 없음)"} 님
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const HeaderInner = styled.div`
  position: relative;
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

const PopOverWrapper = styled.div`
  position: relative;
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

export default Header;
