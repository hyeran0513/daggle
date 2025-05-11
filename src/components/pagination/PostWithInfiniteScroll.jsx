import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInfinitePosts } from "../../hooks/usePostData";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import PostCardList from "../posts/PostCardList";
import styled from "styled-components";
import Loading from "../ui/Loading";
import NoData from "../ui/NoData";

const PostWithInfiniteScroll = ({ isMobile }) => {
  const queryClient = useQueryClient();

  // [게시판] 리스트 조회_무한 스크롤
  const {
    data: infinitePosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts({ limit: 10 });

  // 컴포넌트 언마운트 시 infinitePosts 쿼리 무효화
  // 다시 방문 시 refetch 유도
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(["infinitePosts"]);
    };
  }, []);

  // 화면 크기 변경 시 데이터 리패칭
  useEffect(() => {
    if (isMobile) {
      refetch();
    }
  }, [isMobile, refetch]);

  // 페이지가 화면에 보일 때 데이터 조회
  const observerRef = useIntersectionObserver(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  return (
    <>
      {infinitePosts?.pages?.length > 0 ? (
        <PostCardList
          posts={infinitePosts?.pages?.flatMap((page) => page.items)}
        />
      ) : (
        <NoData text="게시글이 없습니다." />
      )}

      {/* 감시 대상 */}
      <Observer ref={observerRef}>{isFetchingNextPage && <Loading />}</Observer>

      {/* 오버레이 */}
      <OverLay />
    </>
  );
};

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
