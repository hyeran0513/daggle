import React, { useCallback, useState } from "react";

import { LuCircleUser } from "react-icons/lu";
import { useLogoutUser } from "../../hooks/useAuthData";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import authStore from "../../stores/authStore";

const PopOver = () => {
  const { user } = authStore();
  const { mutate: logout } = useLogoutUser();
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  // 팝오버 토글
  const togglePopOver = useCallback(() => {
    setIsPopOverOpen((prev) => !prev);
  }, []);

  // 로그아웃 핸들러
  const handleLogout = useCallback(() => {
    if (confirm("로그아웃하시겠습니까?")) {
      logout();
    }
  }, [logout]);

  return (
    <PopOverWrapper>
      <OutsideClickHandler onOutsideClick={() => setIsPopOverOpen(false)}>
        {/* 팝오버 버튼 */}
        <PopOverButton onClick={togglePopOver}>
          <LuCircleUser />
        </PopOverButton>

        {/* 팝오버 */}
        {isPopOverOpen && (
          <PopOverMenu>
            <PopOverItem>{user?.nickname || "(닉네임 없음)"} 님</PopOverItem>
            <PopOverItem>
              <button onClick={handleLogout}>로그아웃</button>
            </PopOverItem>
          </PopOverMenu>
        )}
      </OutsideClickHandler>
    </PopOverWrapper>
  );
};

const PopOverWrapper = styled.div`
  position: relative;
`;

const PopOverButton = styled.button`
  svg {
    font-size: 32px;
  }
`;

const PopOverMenu = styled.div`
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

export default PopOver;
