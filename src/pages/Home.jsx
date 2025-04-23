import React from "react";
import { usePostsData } from "../hooks/usePostData";

const Home = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsData({ page: 1, limit: 10 });

  if (isLoading) return <>로딩 중...</>;
  if (isError) return <>오류 발생</>;

  return (
    <ul>
      {posts?.length > 0 ? (
        posts.map((post) => <li key={post.id}>{post.title}</li>)
      ) : (
        <li>게시글이 없습니다.</li>
      )}
    </ul>
  );
};

export default Home;
