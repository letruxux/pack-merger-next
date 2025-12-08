import { scrollTo } from "@/lib/utils";
import Dither from "../dither";
import GlareHover from "../glare-hover";
import { Button } from "../ui/button";
import { Github, Globe } from "lucide-react";

export function Hero() {
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
      <div className="absolute left-0 top-0 w-full h-screen pointer-events-none">
        <div className="absolute bottom-4 h-8 px-4 w-full flex justify-between items-center gap-4">
          <a href="https://github.com/letruxux" target="_blank">
            <Github className="size-8 pointer-events-auto cursor-pointer scale-100 hover:scale-110 transition-transform" />
          </a>

          <p className="pointer-events-auto group">
            powered by{" "}
            <a href="https://www.npmjs.com/package/@letruxux/merge-packs" target="_blank">
              <code className="inline text-green-300 group-hover:underline">
                @letruxux/merge-packs
              </code>
            </a>
          </p>

          <a href="https://ltrx.lol" target="_blank">
            <Globe className="size-8 pointer-events-auto cursor-pointer scale-100 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center pointer-events-none">
        <div>
          <h1 className="text-7xl font-[Monocraft] text-center">Merge your packs</h1>
          <Button
            className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white border-2 scale-100 hover:scale-110 px-0 w-48"
            size={"lg"}
            onClick={() => scrollTo(2)}
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
