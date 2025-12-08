import { create } from "zustand";

type Resource =
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
  addResource: (resource: Resource) => void;
  removeResource: (resource: Resource) => void;
  isResourceInStore: (resourceId: Resource) => boolean;
}>((set, get) => ({
  resources: [],
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
}));

export default useResourcesStore;
