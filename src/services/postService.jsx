import axiosInstance from "../api/axiosInstance";

// [게시판] 리스트 조회
export const getPosts = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get("/posts", {
    params: { page, limit },
  });

  return response.data.items;
};
