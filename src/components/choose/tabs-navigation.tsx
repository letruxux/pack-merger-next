"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import useResourcesStore from "../stores/resources-store";
import useTabStore from "../stores/tab-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function TabsNavigation() {
  const { resources } = useResourcesStore();
  const { setSelectedTab } = useTabStore();
  return (
    <div className="flex items-center h-8">
      <TabsList className="grid grid-cols-2 gap-4 mb-4 mr-2">
        <TabsTrigger
          onClick={() => setSelectedTab("modrinth")}
          value="modrinth"
          className="cursor-pointer"
        >
          <span className="md:hidden">Modrinth{" "}</span>
          <img
            src="https://raw.githubusercontent.com/gabrielvicenteYT/modrinth-icons/refs/heads/main/Branding/Favicon/favicon.svg"
            className="size-4"
          />
        </TabsTrigger>

        {/*<Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              onClick={() => setSelectedTab("curseforge")}
              value="curseforge"
              className="cursor-pointer"
              disabled
            >
              CurseForge{" "}
              <img src="https://curseforge.com/favicon.ico" className="size-4" />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Termporarily disabled</p>
          </TooltipContent>
        </Tooltip>*/}

        <TabsTrigger
          onClick={() => setSelectedTab("local")}
          value="local"
          className="cursor-pointer"
        >
          Local
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
          >
            <path d="M12 3v12" />
            <path d="m17 8-5-5-5 5" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          </svg>
        </TabsTrigger>
      </TabsList>
      <div className="flex flex-1"></div>
      <span className="mb-4 truncate block">
        <span className="text-green-500">{resources.length} </span>texture packs selected
      </span>
    </div>
  );
}
