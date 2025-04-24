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
