import React from "react";
import ReactDOM from "react-dom";
import { ClipLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

const Loading = () => {
  const theme = useTheme();

  return ReactDOM.createPortal(
    <LoadingContainer>
      <ClipLoader
        color={theme.colors.primary.normal}
        loading={true}
        size={50}
      />
    </LoadingContainer>,
    document.body
  );
};

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  z-index: 9999;
`;

export default Loading;
