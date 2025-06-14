import { create } from "zustand";

const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("jiouser")) || null,

    setTheme: (value) => set({ theme: value }),
    setCredentials: (value) => set({ user: value }),
    signOut: () => set({ user: null }),
}));

export default useStore;