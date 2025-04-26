import React from "react";
import PostCard from "../molecules/PostCard";
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

const PostCardWrapper = styled.ul``;

export default PostCardList;
