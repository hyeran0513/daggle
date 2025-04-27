import React from "react";
import { ClipLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

const Loading = () => {
  const theme = useTheme();

  return (
    <LoadingContainer>
      <ClipLoader
        color={theme.colors.primary.normal}
        loading={true}
        size={50}
      />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default Loading;
