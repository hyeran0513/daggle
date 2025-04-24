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

// [댓글] 댓글 수정
export const editComment = async (postId, commentId, content) => {
  const response = await axiosInstance.patch(
    `/api/posts/${postId}/comments/${commentId}`,
    {
      content,
    }
  );

  return response.data;
};

// [댓글] 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const response = await axiosInstance.delete(
    `/api/posts/${postId}/comments/${commentId}`
  );

  return response.data;
};
