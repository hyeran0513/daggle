import axiosInstance from "../api/axiosInstance";

// [Auth] 로그인
export const loginUser = async (loginId, password) => {
  const response = await axiosInstance.post("/api/auth/login", {
    loginId,
    password,
  });

  return response.data;
};

// [Auth] 로그아웃
export const logoutUser = async (refreshToken) => {
  const response = await axiosInstance.post("/api/auth/logout", {
    refreshToken,
  });

  return response.data;
};

// [Auth] 토큰 갱신
// - /api/auth/refresh 요청 시 서버에서 Internal Server Error(500에러) 발생
// - 백엔드 이슈로 인해 해당 함수 사용 불가
export const requestRefreshToken = async (currentToken) => {
  const response = await axiosInstance.post("/api/auth/refresh", {
    refreshToken: currentToken,
  });

  return response.data;
};
