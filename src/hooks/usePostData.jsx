import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  editPost,
  getPostDetail,
  getPosts,
} from "../services/postService";
import { useNavigate } from "react-router-dom";

// [게시판] 리스트 조회
export const usePostsData = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getPosts({ page, limit }),
    keepPreviousData: true,
  });
};

// [게시판] 게시글 리스트 조회_무한 스크롤
export const useInfinitePosts = ({ limit = 10 }) => {
  return useInfiniteQuery({
    queryKey: ["infinitePosts"],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage < lastPage.meta.totalPages) {
        return lastPage.meta.currentPage + 1;
      }
    },
  });
};

// [게시판] 게시글 상세
export const usePostDetailData = (postId) => {
  return useQuery({
    queryKey: ["detail", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    retry: false,
  });
};

// [게시판] 게시글 생성
export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["create"],
    mutationFn: ({ title, content }) => createPost(title, content),
    onSuccess: () => {
      navigate("/");
    },
  });
};

// [게시판] 게시글 수정
export const useEditPost = (postId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["edit", postId],
    mutationFn: ({ title, content }) => editPost(postId, title, content),
    onSuccess: (data) => {
      if (data) {
        navigate(`/post/${data.id}`);
      }
    },
  });
};

// [게시판] 게시글 삭제
export const useDeletePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["delete"],
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      navigate("/");
    },
  });
};
