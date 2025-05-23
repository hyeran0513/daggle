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
export const breakpoint = (breakpoints, margins) => `;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  /* 태블릿 */
  @media (max-width: ${breakpoints.tablet}) {
    padding-left: ${margins.tablet};
    padding-right: ${margins.tablet};
  }

  /* 모바일 */
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${margins.mobile};
    padding-right: ${margins.mobile};
  }
`;
