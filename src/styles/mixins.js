import { css } from "styled-components";

// 한 줄 말줄임
export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 다중 말줄임
export const multiEllipsis = (lineClamp) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 에러 메시지
export const errorMessage = css`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.3%;
  color: ${({ theme }) => theme.colors.error};
`;

// 폼
export const form = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 폼 박스
export const formBox = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 인풋 필드
export const inputField = css`
  padding: 0 16px;
  width: 100%;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.3%;
  border: 1px solid ${({ theme }) => theme.colors.line.normal};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: border 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.label.alternative};
  }

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary.normal};
  }

  ${({ error, theme }) =>
    error &&
    css`
      border: 2px solid ${theme.colors.error};
    `}
`;

// 브레이크포인트
export const breakpoint = (breakpoints, margins) => `
  /* 웹 */
  @media (min-width: ${breakpoints.web}) {
    margin-left: ${margins.web};
    margin-right: ${margins.web};
  }

  /* 태블릿 */
  @media (max-width: ${breakpoints.web}) and (min-width: ${breakpoints.tablet}) {
    margin-left: ${margins.tablet};
    margin-right: ${margins.tablet};
  }

  /* 모바일 */
  @media (max-width: ${breakpoints.tablet}) and (min-width: ${breakpoints.mobile}) {
    margin-left: ${margins.mobile};
    margin-right: ${margins.mobile};
  }
`;
