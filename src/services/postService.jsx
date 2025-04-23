import axiosInstance from "../api/axiosInstance";

// [게시판] 리스트 조회
export const getPosts = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get("/api/posts", {
    params: { page, limit },
  });

  return response.data;
};

// [게시판] 게시글 상세
export const getPostDetail = async (id) => {
  const response = await axiosInstance.get(`/api/posts/${id}`, {
    params: { id },
  });

  return response.data;
};
