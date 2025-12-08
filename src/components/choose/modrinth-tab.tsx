import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useVersions from "../use-versions";
import { useEffect, useMemo, useState } from "react";
import modrinth from "@/lib/modrinth";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { DownloadIcon, Loader, Minus, Plus } from "lucide-react";
import useSWR from "swr";
import useResourcesStore from "../stores/resources-store";
import { SearchResultHit } from "@xmcl/modrinth";

function PackItem({ pack }: { pack: SearchResultHit }) {
  const { addResource, isResourceInStore, removeResource, resources } =
    useResourcesStore();

  const isIn = useMemo(
    () =>
      isResourceInStore({
        id: pack.slug,
        source: "modrinth",
        image: pack.featured_gallery,
        name: pack.title,
      }),
    [resources]
  );

  const packObj = useMemo(
    () =>
      ({
        id: pack.slug,
        source: "modrinth",
        image: pack.featured_gallery,
        name: pack.title,
      } as const),
    [pack.slug]
  );

  return (
    <Item variant="outline" className="p-0 h-24 not-first:mt-2">
      <ItemMedia className="size-24" variant="image">
        <a
          href={"https://modrinth.com/resourcepack/" + pack.slug}
          target="_blank"
          className="size-full bg-black"
        >
          {pack.featured_gallery ? (
            <img src={pack.featured_gallery} alt={pack.title} />
          ) : (
            <div className="size-full bg-black"></div>
          )}
        </a>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <a href={"https://modrinth.com/resourcepack/" + pack.slug} target="_blank">
            {pack.title} <span className="text-sm text-gray-500">{pack.author}</span>
          </a>
        </ItemTitle>
        <ItemDescription className="flex items-center">
          {(pack.downloads ?? 0).toLocaleString()}
          <DownloadIcon className="ml-1 size-4 inline-block" />
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant={isIn ? "destructive" : "outline"}
          className="mr-4 cursor-pointer"
          onClick={() => (isIn ? removeResource(packObj) : addResource(packObj))}
        >
          {isIn ? (
            <>
              Remove <Minus className="inline-block ml-1" />
            </>
          ) : (
            <>
              Add <Plus className="inline-block ml-1" />
            </>
          )}
        </Button>
      </ItemActions>
    </Item>
  );
}

export default function ModrinthTab() {
  const versions = useVersions();
  const { version, setVersion } = useResourcesStore();
  const [query, setQuery] = useState<string>("");

  const {
    data: packs,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(version ? ["md" + version] : null, async () => {
    const res = await modrinth.searchProjects({
      query,
      facets: `[["project_type:resourcepack"],["versions:${version}"]]`,
      limit: 30,
    });
    return res.hits.sort((a, b) => b.downloads - a.downloads);
  });

  useEffect(() => {
    setVersion(versions.at(0) || "1.21.10");
  }, [versions]);

  return (
    <CardContent className="w-full px-0.5 overflow-y-hidden">
      <div className="flex mb-2">
        <Input
          className="w-full"
          placeholder="Search for packs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") mutate();
          }}
        />
        <Select value={version} onValueChange={setVersion}>
          <SelectTrigger>
            <SelectValue placeholder="Select a version" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Versions</SelectLabel>
              {versions.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="cursor-pointer"
          onClick={() => mutate()}
          disabled={isLoading || isValidating}
        >
          {(isLoading || isValidating) && <Loader className="mr-2 animate-spin" />} Search
        </Button>
      </div>
      <div className="w-full overflow-y-scroll h-[calc(60vh-72px-48px)]">
        {(packs ?? []).map((e) => (
          <PackItem key={e.slug} pack={e} />
        ))}
      </div>
    </CardContent>
  );
}
