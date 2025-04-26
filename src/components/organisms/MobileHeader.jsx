import React, { useCallback, useState } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import SideBar from "./SideBar";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 사이드바 토글
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <HeaderContainer>
        {/* 햄버거 버튼 */}
        <HamburgerButton onClick={toggleSidebar}>
          <FiMenu />
        </HamburgerButton>
      </HeaderContainer>

      {/* 사이드 바 */}
      <SideBar isOpen={isOpen} onClose={toggleSidebar} />
    </>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
  }
`;
const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 24px;
  }
`;

export default MobileHeader;
