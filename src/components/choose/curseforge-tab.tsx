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
import { useEffect, useState, useMemo } from "react";
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
import curseforge from "@/lib/curseforge";
import { Mod } from "@xmcl/curseforge";

interface CurseforgePack {
  project_id: string;
  project_type: string;
  slug: string;
  author: string;
  title: string;
  description: string;
  categories: string[];
  display_categories: string[];
  versions: string[];
  downloads: number;
  follows: number;
  icon_url: string;
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  client_side: string;
  server_side: string;
  gallery: string[];
  featured_gallery: string;
  color: number;
}

export interface CurseforgePack2 {
  screenshots: {
    id: number;
    modId: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string;
  }[];
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links: {
    websiteUrl: string;
    wikiUrl: string;
    issuesUrl: string;
    sourceUrl?: any;
  };
  summary: string;
  status: number;
  downloadCount: number;
  isFeatured: boolean;
  primaryCategoryId: number;
  categories: {
    id: number;
    gameId: number;
    name: string;
    slug: string;
    url: string;
    iconUrl: string;
    dateModified: string;
    isClass: boolean;
    classId: number;
    parentCategoryId: number;
  }[];
  classId: number;
  authors: {
    id: number;
    name: string;
    url: string;
    avatarUrl: string;
  }[];
  logo: {
    id: number;
    modId: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string;
  };
  mainFileId: number;
  latestFiles: {
    id: number;
    gameId: number;
    modId: number;
    isAvailable: boolean;
    displayName: string;
    fileName: string;
    releaseType: number;
    fileStatus: number;
    hashes: {
      value: string;
      algo: number;
    }[];
    fileDate: string;
    fileLength: number;
    downloadCount: number;
    fileSizeOnDisk: number;
    downloadUrl: string;
    gameVersions: string[];
    sortableGameVersions: {
      gameVersionName: string;
      gameVersionPadded: string;
      gameVersion: string;
      gameVersionReleaseDate: string;
      gameVersionTypeId: number;
    }[];
    dependencies: any[];
    alternateFileId: number;
    isServerPack: boolean;
    fileFingerprint: number;
    modules: {
      name: string;
      fingerprint: number;
    }[];
  }[];
  latestFilesIndexes: {
    gameVersion: string;
    fileId: number;
    filename: string;
    releaseType: number;
    gameVersionTypeId: number;
  }[];
  latestEarlyAccessFilesIndexes: any[];
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  allowModDistribution: boolean;
  gamePopularityRank: number;
  isAvailable: boolean;
  thumbsUpCount: number;
  featuredProjectTag: number;
}

function CurseforgePackItem({ pack }: { pack: CurseforgePack | CurseforgePack2 }) {
  const { addResource, isResourceInStore, removeResource, resources } =
    useResourcesStore();

  const normalized = {
    slug: (pack as CurseforgePack).slug ?? (pack as CurseforgePack2).slug,
    title: (pack as CurseforgePack).title ?? (pack as CurseforgePack2).name,
    author:
      (pack as CurseforgePack).author ??
      (pack as CurseforgePack2).authors?.map((a) => a.name).join(", ") ??
      "",
    downloads:
      (pack as CurseforgePack).downloads ?? (pack as CurseforgePack2).downloadCount,
    featured_gallery:
      (pack as CurseforgePack).featured_gallery ??
      (pack as CurseforgePack2).logo?.url ??
      "",
    id: (pack as CurseforgePack2).id ?? null,
  };

  const isIn = useMemo(
    () =>
      isResourceInStore({
        id: normalized.slug.toString(),
        source: "curseforge",
        image: normalized.featured_gallery,
        name: normalized.title,
      }),
    [resources]
  );

  const packObj = useMemo(
    () =>
      ({
        id: normalized.slug.toString(),
        source: "curseforge",
        image: normalized.featured_gallery,
        name: normalized.title,
      } as const),
    [normalized.slug]
  );

  if (!normalized.id) return null;

  return (
    <Item variant="outline" className="p-0 h-24 not-first:mt-2">
      <ItemMedia className="size-24" variant="image">
        <a
          href={"https://www.curseforge.com/minecraft/texture-packs/" + normalized.slug}
          target="_blank"
        >
          {normalized.featured_gallery ? (
            <img src={normalized.featured_gallery} alt={normalized.title} />
          ) : (
            <div className="size-full bg-black" />
          )}
        </a>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <a
            href={"https://www.curseforge.com/minecraft/texture-packs/" + normalized.slug}
            target="_blank"
          >
            {normalized.title}{" "}
            <span className="text-sm text-gray-500">{normalized.author}</span>
          </a>
        </ItemTitle>
        <ItemDescription className="flex items-center">
          {normalized.downloads.toLocaleString()}{" "}
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

export default function CurseforgeTab() {
  const versions = useVersions();
  const [version, setVersion] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const {
    data: packs,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(version ? ["cf" + version] : null, async () => {
    const res = await curseforge.searchMods({
      categoryId: 393,
      gameVersion: version,
      searchFilter: query,
    });
    return res.data.sort((a, b) => b.downloadCount - a.downloadCount);
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
          onKeyDown={(e) => e.key === "Enter" && mutate()}
        />
        <Select value={version} onValueChange={setVersion}>
          <SelectTrigger>
            <SelectValue placeholder="Select a version" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Versions</SelectLabel>
              {versions.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
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
      <div className="w-full h-[31rem] overflow-y-scroll">
        {(packs ?? []).map((p) => (
          <CurseforgePackItem key={p.slug} pack={p as any} />
        ))}
      </div>
    </CardContent>
  );
}
