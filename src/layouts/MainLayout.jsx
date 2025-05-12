import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/layout/Header";
import MobileHeader from "../components/layout/MobileHeader";
import { useResponsive } from "../hooks/useResponsive";

const MainLayout = () => {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* 헤더 */}
      {isMobile ? <MobileHeader /> : <Header />}

      {/* 메인 */}
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main``;

export default MainLayout;
