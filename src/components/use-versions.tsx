import modrinth from "@/lib/modrinth";
import useSWR from "swr/immutable";

export default function useVersions() {
  const { data } = useSWR("a", (_) =>
    modrinth
      .getGameVersionTags()
      .then((e) => e.filter((v) => v.version_type === "release").map((v) => v.version))
  );

  return data ?? [];
}
