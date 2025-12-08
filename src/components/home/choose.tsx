"use client";

import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../ui/card";
import TabsNavigation from "../choose/tabs-navigation";
import ModrinthTab from "../choose/modrinth-tab";
import CurseforgeTab from "../choose/curseforge-tab";
import LocalTab from "../choose/local-tab";
import { Button } from "../ui/button";
import { scrollTo } from "@/lib/utils";
import GlareHover from "../glare-hover";
import useResourcesStore from "../stores/resources-store";

export function Choose() {
  const { resources } = useResourcesStore();

  return (
    <div id="choose" className="w-full h-screen flex justify-center items-center">
      <div className="w-full">
        <Button
          className="mb-6 mx-auto block pointer-events-auto cursor-pointer scale-100 hover:scale-110 px-0 bg-gray-400 hover:bg-gray-500 h-10 w-10"
          size={"lg"}
          onClick={() => scrollTo(1)}
        >
          ↑
        </Button>
        <h1 className="text-4xl font-[Monocraft] text-center mb-8">Choose your packs</h1>
        <Card className="max-w-2xl w-full h-[60vh] mx-auto rounded-none px-4">
          <Tabs defaultValue="modrinth" className="w-full h-full">
            <TabsNavigation />

            <TabsContent value="modrinth">
              <ModrinthTab />
            </TabsContent>

            <TabsContent value="curseforge">
              <CurseforgeTab />
            </TabsContent>

            <TabsContent value="local">
              <LocalTab />
            </TabsContent>
          </Tabs>
        </Card>
        <Button
          disabled={resources.length === 0}
          className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white hover:border-2 scale-100 hover:scale-110 px-0 w-48 disabled:cursor-not-allowed"
          size={"lg"}
          onClick={() => scrollTo(3)}
        >
          <GlareHover
            style={{
              position: "relative",
              maxWidth: "100%",
              height: "100%",
              borderRadius: "0",
              backgroundColor: "transparent",
            }}
          >
            next ↓
          </GlareHover>
        </Button>
      </div>
    </div>
  );
}
