import { useEffect, useRef } from "react";
import useResourcesStore from "../stores/resources-store";
import { Button } from "../ui/button";
import { scrollTo } from "@/lib/utils";
import GlareHover from "../glare-hover";
import { Card } from "../ui/card";
import { PackItem } from "../pack-item";
import usePackStore from "../stores/pack-store";

export function Reorder() {
  const { resources } = useResourcesStore();
  const { description, setDescription } = usePackStore();
  const reorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resources.length === 0 && window.scrollY !== 0) scrollTo(2);
  }, [resources, reorderRef]);

  return (
    <div
      id="reorder"
      className="w-full h-dvh flex justify-center items-center"
      ref={reorderRef}
    >
      <div className="w-full">
        <Button
          className="mb-6 mx-auto block pointer-events-auto cursor-pointer scale-100 hover:scale-110 px-0 bg-gray-400 hover:bg-gray-500 h-10 w-10"
          size={"lg"}
          onClick={() => scrollTo(2)}
        >
          ↑
        </Button>
        <h1 className="text-4xl font-[Monocraft] text-center mb-8">Final touches</h1>

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
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="h-28 w-full pl-4 font-[Monocraft] flex items-center"
              maxLength={32}
            />
          </div>
          <div className="h-[32rem] overflow-scroll">
            {resources.map((e, idx) => (
              <PackItem key={e.id} pack={e} index={idx} />
            ))}
          </div>
        </Card>
        <Button
          className="mt-6 mx-auto block pointer-events-auto cursor-pointer border-white hover:border-2 scale-100 hover:scale-110 px-0 w-48"
          size={"lg"}
          onClick={() => scrollTo(4)}
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
