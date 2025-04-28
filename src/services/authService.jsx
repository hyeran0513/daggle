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
export const requestRefreshToken = async (currentToken) => {
  const response = await axiosInstance.post("/api/auth/refresh", {
    refreshToken: currentToken,
  });

  return response.data;
};
