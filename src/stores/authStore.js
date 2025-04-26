import { create } from "zustand";

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  updateToken: (token) => {
    set((state) => ({
      token,
      isAuthenticated: !!token,
      user: state.user,
    }));
    localStorage.setItem("accessToken", token);
  },
}));

export default authStore;
