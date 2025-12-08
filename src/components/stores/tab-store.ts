import { create } from "zustand";

const useTabStore = create<{
  selectedTab: "modrinth" | "curseforge" | "local";
  setSelectedTab: (tab: "modrinth" | "curseforge" | "local") => void;
}>((set, get) => ({
  selectedTab: "modrinth",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

export default useTabStore;
