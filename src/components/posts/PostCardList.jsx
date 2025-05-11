import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";

const PostCardList = ({ posts }) => {
  return (
    <PostCardWrapper>
      {posts?.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </PostCardWrapper>
  );
};

const PostCardWrapper = styled.ul`
  min-height: 598px;

  /* 모바일 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
  }
`;

export default PostCardList;
