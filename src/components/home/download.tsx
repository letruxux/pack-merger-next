import { useEffect, useState } from "react";
import useResourcesStore from "../stores/resources-store";
import { Button } from "../ui/button";
import { scrollTo } from "@/lib/utils";
import GlareHover from "../glare-hover";
import { Card } from "../ui/card";
import { PackItem } from "../pack-item";
import usePackStore from "../stores/pack-store";
import * as merger from "@letruxux/merge-packs";
import { log } from "console";
import { Loader } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";
import { useWindowSize } from "react-use";

const colors = {
  reset: "\x1b[0m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
};

export function Download() {
  const { resources, version } = useResourcesStore();
  const { description } = usePackStore();
  const [logs, setLogs] = useState<string[]>(["Click download to start!"]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isConfetti, setIsConfetti] = useState(false);
  const { width, height } = useWindowSize();

  async function startDownload() {
    setIsDownloading(true);
    setLogs([]);
    try {
      const modrinthPacks = resources.filter((e) => e.source === "modrinth");
      const curseforgePacks = resources.filter((e) => e.source === "curseforge");
      const localPacks = resources.filter((e) => e.source === "local");

      const mcmeta = {
        pack: {
          ...merger.defaultMcmeta.pack,
          description: description + "\n§l§6pack.ltrx.lol",
        },
      };

      const logger = (...args: any[]) => setLogs((logs) => [...logs, args.join(" ")]);

      const arraybufs = await Promise.all([
        merger.modrinthMerge(
          modrinthPacks.map((e) => e.id),
          version,
          mcmeta,
          logger
        ),
        /* merger.curseforgeMerge(
          curseforgePacks.map((e) => parseInt(e.id)),
          version,
          mcmeta
        ), */
      ]).then((e) => e.flat());

      const buf = arraybufs[0];
      logger(`Merged ${localPacks.length + arraybufs.length} files`);

      logger("Done! Downloading now...");

      const blob = new Blob([buf], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${description
        .replace(/[<>:"/\\|?*]/g, "_")
        .replace(/[\x00-\x1F\x7F]/g, "")
        .replace(/^\.+/, "")
        .replace(/^ +| +$/g, "")
        .replace(/(^COM[0-9]|^LPT[0-9]|^CON|^PRN|^AUX|^NUL)/i, "_$1")}.zip`;
      a.click();
      setIsConfetti(true);
      setInterval(() => {
        setIsConfetti(false);
      }, 2200);
    } catch (e) {
      console.error(e);
      setLogs((logs) => [...logs, (e as Error).message]);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div id="reorder" className="w-full h-dvh flex justify-center items-center">
      <div className="w-full">
        <Button
          className="mb-6 mx-auto block pointer-events-auto cursor-pointer scale-100 hover:scale-110 px-0 bg-gray-400 hover:bg-gray-500 h-10 w-10"
          size={"lg"}
          onClick={() => scrollTo(3)}
        >
          ↑
        </Button>
        <h1 className="text-4xl font-[Monocraft] text-center mb-8">
          Ready for download!
        </h1>

        <Card className="max-w-2xl w-full h-[60dvh] mx-auto rounded-none px-4">
          <div
            className="w-full h-28 -mb-2 flex"
            style={{ backgroundImage: "url(/dirt.png)" }}
          >
            <img
              src="https://packpng.com/static/pack.png"
              alt="pack.png"
              className="size-28"
            />
            <p className="h-28 w-full pl-4 font-[Monocraft] flex items-center">
              {description}
            </p>
          </div>
          <div>
            <Button
              className="mx-auto block pointer-events-auto cursor-pointer border-white hover:border-2 scale-100 hover:scale-110 px-0 w-56 mb-4"
              size={"lg"}
              onClick={() => startDownload()}
              disabled={isDownloading}
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
                {isDownloading ? (
                  <p className="flex items-center">
                    <Loader className="size-4 animate-spin inline-block mr-1" />{" "}
                    downloading...
                  </p>
                ) : (
                  "download!!"
                )}
                {isConfetti && (
                  <ConfettiExplosion
                    force={0.4}
                    duration={2200}
                    particleCount={30}
                    width={400}
                  />
                )}
              </GlareHover>
            </Button>
            <pre className="bg-black/20 h-[calc(60vh-128px-86px-16px)] p-3 py-2 overflow-y-scroll">
              {logs.map((e, i) => (
                <span key={i} className="block">
                  {e
                    .replaceAll(colors.reset, "")
                    .replaceAll(colors.fgGreen, "")
                    .replaceAll(colors.fgYellow, "")
                    .replaceAll(colors.fgBlue, "")}
                </span>
              ))}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
