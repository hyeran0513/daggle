import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";

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
