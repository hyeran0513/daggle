import React from "react";
import styled, { useTheme } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

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
      {[...Array(totalPages).keys()].map((_, index) => {
        const page = index + 1;
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
