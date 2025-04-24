import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, getComments } from "../services/commentService";

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
