import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInfinitePostsWithAuthors } from "../../hooks/usePostData";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import PostCardList from "./PostCardList";
import styled from "styled-components";

const PostWithInfiniteScroll = () => {
  const queryClient = useQueryClient();

  // [게시판] 리스트 조회_무한 스크롤
  const {
    data: infinitePosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePostsWithAuthors({ limit: 10 });

  // 다른 페이지에서 현재 페이지로 이동될 때, infinitePosts 쿼리 데이터를 초기화
  useEffect(() => {
    queryClient.removeQueries(["infinitePosts"]);
  }, [queryClient]);

  // 페이지가 화면에 보일 때 데이터 조회
  const observerRef = useIntersectionObserver(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  return (
    <>
      {infinitePosts?.pages.length > 0 ? (
        <PostCardList
          posts={infinitePosts?.pages.flatMap((page) => page.items)}
        />
      ) : (
        <NoData>게시글이 없습니다.</NoData>
      )}

      <div ref={observerRef}>{isFetchingNextPage && <>로딩 중...</>}</div>
    </>
  );
};

const NoData = styled.div``;

export default PostWithInfiniteScroll;
