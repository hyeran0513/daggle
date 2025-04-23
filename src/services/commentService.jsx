import axiosInstance from "../api/axiosInstance";

// [댓글] 댓글 목록 조회
export const getComments = async (postId) => {
  const response = await axiosInstance.get(`/api/posts/${postId}/comments`);

  return response.data;
};
