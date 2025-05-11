import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/layout/Header";
import MobileHeader from "../components/layout/MobileHeader";

const MainLayout = () => {
  return (
    <>
      {/* PC 헤더 */}
      <Header />

      {/* mobile 헤더 */}
      <MobileHeader />

      {/* 메인 */}
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main``;

export default MainLayout;
