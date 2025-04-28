import React, { useCallback, useState, useEffect } from "react";
import { usePostsData } from "../../hooks/usePostData";
import PostCardList from "./PostCardList";
import Pagination from "../molecules/Pagination";
import Loading from "../atoms/Loading";
import NoData from "../atoms/NoData";

const PostWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // [게시판] 리스트 조회
  const {
    data: posts,
    isLoading,
    isFetching,
  } = usePostsData({
    page: currentPage,
    limit: limit,
  });

  // 페이지 번호가 변경 헨들러
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // 스크롤 위치 유지
  useEffect(() => {
    if (!isFetching) {
      window.scrollTo(0, window.scrollY);
    }
  }, [isFetching]);

  if (isLoading) return <Loading />;

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
        <NoData text="게시글이 없습니다." />
      )}
    </>
  );
};

export default PostWithPagination;
