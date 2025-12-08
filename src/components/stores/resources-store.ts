import { create } from "zustand";

export type Resource =
  | { id: string; image: string; name: string } & (
      | {
          source: "modrinth" | "curseforge";
        }
      | {
          data: ArrayBuffer;
          source: "local";
        }
    );

const useResourcesStore = create<{
  resources: Resource[];
  version: string;
  setVersion: (version: string) => void;
  addResource: (resource: Resource) => void;
  removeResource: (resource: Resource) => void;
  isResourceInStore: (resourceId: Resource) => boolean;
  reorderResource: (resource: Resource, index: number) => void;
}>((set, get) => ({
  resources: [],
  version: "1.21.10",
  setVersion: (version) => set({ version }),
  addResource: (resource) =>
    set((state) => ({
      resources: [...state.resources, resource],
    })),
  removeResource: (resource) =>
    set((state) => ({
      resources: state.resources.filter((e) => e !== resource),
    })),
  isResourceInStore: (resource) =>
    get().resources.some((e) => e.id === resource.id && e.source === resource.source),
  reorderResource: (resource, newIndex) =>
    set((state) => {
      const currentIndex = state.resources.findIndex((r) => r === resource);
      if (currentIndex === -1) return state;

      const updated = [...state.resources];
      updated.splice(currentIndex, 1);
      updated.splice(newIndex, 0, resource);

      return { resources: updated };
    }),
}));

export default useResourcesStore;
