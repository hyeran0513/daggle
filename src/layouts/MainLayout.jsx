import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/organisms/Header";
import MobileHeader from "../components/organisms/MobileHeader";

const MainLayout = () => {
  return (
    <>
      <Header />

      <MobileHeader />

      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main``;

export default MainLayout;
