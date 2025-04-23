import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const MainLayout = () => {
  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 메인 */}
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 100px 120px;
`;

export default MainLayout;
