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

// [게시판] 게시글 리스트 조회 시 Author 정보 포함
// 현재 get:/api/post 응답에 author 정보가 누락되어 있어, 백엔드에서 author 필드를 포함해주시면 좋겠습니다.
export const getPostsWithAuthors = async ({ page = 1, limit = 10 }) => {
  const posts = await getPosts({ page, limit });

  const postsWithAuthors = await Promise.all(
    posts.items.map(async (post) => {
      const detail = await getPostDetail(post.id);
      return { ...post, author: detail.author };
    })
  );

  return {
    items: postsWithAuthors,
    meta: posts.meta,
  };
};

// [게시판] 게시글 생성
export const createPost = async (title, content) => {
  const response = await axiosInstance.post("/api/posts", {
    title,
    content,
  });

  return response.data;
};

// [게시판] 게시글 수정
export const editPost = async (id, title, content) => {
  const response = await axiosInstance.patch(`/api/posts/${id}`, {
    title,
    content,
  });

  return response.data;
};

// [게시판] 게시글 삭제
export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`/api/posts/${id}`);

  return response.data;
};
