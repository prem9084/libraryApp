import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("library") || "light",
  setTheme: (theme) => {
    localStorage.setItem("stramApp-theme", theme);
    set({ theme });
  },
}));
