import axios from "axios";
import { requestRefreshToken } from "../services/authService";
import authStore from "../stores/authStore";

const baseURL =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      // 새로 받은 accessToken을 로컬스토리지에 저장 및 재요청
      if (refreshToken) {
        try {
          const data = await requestRefreshToken(refreshToken);

          if (data) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            config.headers["Authorization"] = `Bearer ${data.accessToken}`;

            return axiosInstance(config);
          }
        } catch (error) {
          console.error("토큰 갱신 오류: ", error);
          authStore.getState().logout();

          // alert가 한 번만 뜨도록 설정
          if (!authStore.getState().alertShown) {
            authStore.getState().setAlertShown(true);
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
