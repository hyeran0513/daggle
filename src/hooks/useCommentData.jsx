import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../services/commentService";

// [댓글] 댓글 목록 조회
export const useCommentsData = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};

// [댓글] 댓글 생성
export const useCreateComment = (postId) => {
  return useMutation({
    mutationKey: ["comment", postId],
    mutationFn: (content) => createComment(postId, content),
    enabled: !!postId,
  });
};

// [댓글] 댓글 수정
export const useEditComment = (postId, commentId) => {
  return useMutation({
    mutationKey: ["edit", postId],
    mutationFn: ({ content }) => editComment(postId, commentId, content),
    enabled: !!postId,
  });
};

// [댓글] 댓글 삭제
export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: (postId, commentId) => deleteComment(postId, commentId),
  });
};
