import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInfinitePostsWithAuthors } from "../../hooks/usePostData";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import PostCardList from "./PostCardList";
import styled from "styled-components";
import Loading from "../atoms/Loading";

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

      {/* 감시 대상 */}
      <Observer ref={observerRef}>{isFetchingNextPage && <Loading />}</Observer>

      {/* 오버레이 */}
      <OverLay />
    </>
  );
};

const NoData = styled.div``;

const Observer = styled.div``;

const OverLay = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 106px;
  padding: 0 16px 50px 16px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 100%
  );
  pointer-events: none;
`;

export default PostWithInfiniteScroll;
