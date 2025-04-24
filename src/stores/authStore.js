import { create } from "zustand";

const authStore = create((set) => ({
  user: null,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    localStorage.setItem("accessToken", token);
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("accessToken");
  },

  updateToken: (token) => {
    set({ token, isAuthenticated: true });
    localStorage.setItem("accessToken", token);
  },
}));

export default authStore;
