import { create } from "zustand";

const usePackStore = create<{
  description: string;
  setDescription: (description: string) => void;
}>((set, get) => ({
  description: "my awesome resource pack",
  setDescription: (description) => set({ description }),
}));

export default usePackStore;
