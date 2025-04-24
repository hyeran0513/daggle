import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  editPost,
  getPostDetail,
  getPosts,
} from "../services/postService";

// [게시판] 리스트 조회
export const usePostsData = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getPosts({ page, limit }),
    keepPreviousData: true,
  });
};

// [게시판] 게시글 상세
export const usePostDetailData = (postId) => {
  return useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    retry: false,
  });
};

// [게시판] 게시글 생성
export const usePostCreate = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: ({ title, content }) => createPost(title, content),
  });
};

// [게시판] 게시글 수정
export const usePostEdit = (postId) => {
  return useMutation({
    mutationKey: ["edit", postId],
    mutationFn: ({ title, content }) => editPost(postId, title, content),
    enabled: !!postId,
  });
};

// [게시판] 게시글 삭제
export const usePostDelete = () => {
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: (postId) => deletePost(postId),
  });
};
