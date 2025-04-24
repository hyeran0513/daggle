import axiosInstance from "../api/axiosInstance";

// [댓글] 댓글 목록 조회
export const getComments = async (postId) => {
  const response = await axiosInstance.get(`/api/posts/${postId}/comments`);

  return response.data;
};

// [댓글] 댓글 생성
export const createComment = async (postId, content) => {
  const response = await axiosInstance.post(`/api/posts/${postId}/comments`, {
    content: content,
  });

  return response.data;
};
