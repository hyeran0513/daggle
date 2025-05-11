import React from "react";
import styled from "styled-components";
import { RiMegaphoneLine } from "react-icons/ri";

const NoData = ({ text }) => {
  return (
    <NoDataContainer>
      <NoDataIcon>
        <RiMegaphoneLine />
      </NoDataIcon>

      <NoDataText>{text}</NoDataText>
    </NoDataContainer>
  );
};

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 300px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 240px;
  }
`;

const NoDataIcon = styled.div`
  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.gray500};
  }

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    svg {
      font-size: 34px;
    }
  }
`;

const NoDataText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray500};

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    svg {
      font-size: 16px;
    }
  }
`;

export default NoData;
