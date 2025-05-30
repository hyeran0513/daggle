import React, { useCallback } from "react";
import styled, { useTheme } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  const maxVisiblePages = 10;
  const navigate = useNavigate();

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page) => {
      if (page > 0 && page <= totalPages) {
        navigate(`?page=${page}`);
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  // 페이지네이션 범위 계산
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <PaginationWrapper>
      {/* 이전 버튼 */}
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft color={theme.colors.gray600} />
      </PageButton>

      {/* 페이지네이션 숫자 */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => {
        return (
          <PageButton
            key={page}
            onClick={() => handlePageChange(page)}
            $active={currentPage === page}
          >
            {page}
          </PageButton>
        );
      })}

      {/* 다음 버튼 */}
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight color={theme.colors.gray600} />
      </PageButton>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
`;

const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.gray300 : theme.colors.white};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Pagination;
