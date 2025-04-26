import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comment", postId],
    mutationFn: (content) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};

// [댓글] 댓글 수정
export const useEditComment = (postId, commentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit", postId],
    mutationFn: ({ content }) => editComment(postId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};

// [댓글] 댓글 삭제
export const useDeleteComment = (postId, commentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete"],
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};
