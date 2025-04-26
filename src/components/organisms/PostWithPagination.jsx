import React, { useCallback, useState } from "react";
import { usePostsWithAuthors } from "../../hooks/usePostData";
import PostCardList from "./PostCardList";
import Pagination from "../molecules/Pagination";
import styled from "styled-components";

const PostWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // [게시판] 리스트 조회
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsWithAuthors({
    page: currentPage,
    limit: limit,
  });

  // 페이지 번호가 변경 헨들러
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생</div>;

  return (
    <>
      {posts?.items?.length > 0 ? (
        <>
          <PostCardList posts={posts.items} />
          <Pagination
            currentPage={posts?.meta?.currentPage}
            totalPages={posts?.meta?.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <NoData>게시글이 없습니다.</NoData>
      )}
    </>
  );
};

const NoData = styled.div``;

export default PostWithPagination;
