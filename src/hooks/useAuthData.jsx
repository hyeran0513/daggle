import { useMutation } from "@tanstack/react-query";
import authStore from "../stores/authStore";
import {
  loginUser,
  logoutUser,
  requestRefreshToken,
} from "../services/authService";

// 로그인
export const useLogin = () => {
  const { login } = authStore();

  return useMutation({
    mutationFn: async ({ loginId, password }) => {
      const data = await loginUser(loginId, password);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
    },
  });
};

// 로그아웃
export const useLogout = () => {
  const { logout, token } = authStore();

  return useMutation({
    mutationFn: () => logoutUser(token),
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.error("로그아웃 오류:", error);
    },
  });
};

// 토큰 갱신
export const useRefreshToken = () => {
  const { updateToken } = authStore();

  return useMutation({
    mutationFn: async (currentToken) => {
      const data = await requestRefreshToken(currentToken);
      return data;
    },
    onSuccess: (data) => {
      updateToken(data.token);
    },
    onError: (error) => {
      console.error("토큰 갱신 오류:", error);
    },
  });
};
