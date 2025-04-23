import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/postService";

// [게시판] 리스트 조회
export const usePostsData = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getPosts({ page, limit }),
    keepPreviousData: true,
  });
};
