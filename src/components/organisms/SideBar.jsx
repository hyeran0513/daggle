import React, { useCallback } from "react";
import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import { useLogoutUser } from "../../hooks/useAuthData";

const SideBar = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = authStore();
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutUser();

  // 로그아웃 핸들러
  const handleLogout = useCallback(() => {
    if (confirm("로그아웃하시겠습니까?")) {
      onClose();
      logout();
    }
  }, [onClose, logout]);

  // 로그인 핸들러
  const handleLogin = useCallback(() => {
    onClose();
    navigate("/login");
  }, [onClose, navigate]);

  // 커뮤니티 핸들러
  const handleCommunity = useCallback(() => {
    onClose();
    navigate("/");
  }, [onClose, navigate]);

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        {/* 사이드바 헤더 */}
        <SidebarHead>
          <CloseButton type="button" onClick={onClose}>
            <HiMiniXMark />
          </CloseButton>
        </SidebarHead>

        {/* 사이드바 콘텐츠 */}
        <SidebarContent>
          <UserInfo>
            {isAuthenticated ? (
              <>
                <ProfileImageWrapper>
                  {user?.profileImageUrl && (
                    <ProfileImage
                      img={user?.profileImageUrl}
                      alt={`${user?.nickname}의 프로필 이미지`}
                    />
                  )}
                </ProfileImageWrapper>
                <NickName>{user?.nickname || "(닉네임 없음)"}</NickName>
              </>
            ) : (
              <div>로그인이 필요한 서비스입니다.</div>
            )}
          </UserInfo>

          {/* 메뉴 */}
          <Menu>
            {isAuthenticated ? (
              <MenuItem>
                <MenuButton onClick={handleLogout}>로그아웃</MenuButton>
              </MenuItem>
            ) : (
              <MenuItem>
                <MenuButton onClick={handleLogin}>로그인</MenuButton>
              </MenuItem>
            )}

            <MenuItem>
              <MenuButton onClick={handleCommunity}>커뮤니티</MenuButton>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </SidebarContainer>

      {/* 오버레이 */}
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

const SidebarContainer = styled.aside.withConfig({
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  padding: 32px 0;
  width: 280px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 101;
`;

const SidebarHead = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
`;

const SidebarContent = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;

  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.label.alternative};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line.normal};
`;

const ProfileImageWrapper = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray600};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NickName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
`;

const Menu = styled.ul``;

const MenuItem = styled.li`
  padding: 12px 16px;
`;

const MenuButton = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.black};
`;

export default SideBar;
