"use client";

import CurseForgeTab from "@/components/choose/curseforge-tab";
import LocalTab from "@/components/choose/local-tab";
import ModrinthTab from "@/components/choose/modrinth-tab";
import TabsNavigation from "@/components/choose/tabs-navigation";
import Dither from "@/components/dither";
import GlareHover from "@/components/glare-hover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dropzone from "react-dropzone";

function Hero() {
  return (
    <div id="hero" className="w-full h-screen relative">
      <Dither
        waveColor={[0.4, 0.6, 0.4]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.2}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />

      <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center pointer-events-none">
        <div>
          <h1 className="text-7xl font-[Monocraft] text-center">Merge your packs</h1>
          <Button
            className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white border-2 scale-100 hover:scale-110 px-0 w-48"
            size={"lg"}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
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
              let's goo ↓
            </GlareHover>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Choose() {
  return (
    <div id="choose" className="w-full h-screen flex justify-center items-center">
      <div className="w-full">
        <h1 className="text-4xl font-[Monocraft] text-center mb-8">Choose your packs</h1>

        <Card className="max-w-2xl w-full h-[60vh] mx-auto rounded-none px-4">
          <Tabs defaultValue="modrinth" className="w-full h-full">
            <TabsNavigation />

            <TabsContent value="modrinth">
              <ModrinthTab />
            </TabsContent>

            <TabsContent value="curseforge">
              <CurseForgeTab />
            </TabsContent>

            <TabsContent value="local">
              <LocalTab />
            </TabsContent>
          </Tabs>
        </Card>
        <Button
          className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white hover:border-2 scale-100 hover:scale-110 px-0 w-48"
          size={"lg"}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" })
          }
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

function Reorder() {
  return (
    <div id="reorder" className="w-full h-screen flex justify-center items-center">
      <div className="w-full">
        <Button
          className="mb-6 mx-auto block pointer-events-auto cursor-pointer scale-100 hover:scale-110 px-0 w-48 bg-gray-400 hover:bg-gray-500"
          size={"lg"}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
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
            go back ↑
          </GlareHover>
        </Button>
        <h1 className="text-4xl font-[Monocraft] text-center mb-8">Reorder your packs</h1>

        <Card className="max-w-2xl w-full h-[60vh] mx-auto rounded-none px-4">Lol</Card>
        <Button
          className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white hover:border-2 scale-100 hover:scale-110 px-0 w-48"
          size={"lg"}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" })
          }
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

export default function Home() {
  return (
    <main>
      <Hero />
      <Choose />
      <Reorder />
    </main>
  );
}
