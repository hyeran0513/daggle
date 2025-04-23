import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentService";

// [댓글] 댓글 목록 조회
export const useCommentsData = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};
