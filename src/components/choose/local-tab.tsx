import { CardContent } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import JSZip from "jszip";
import useResourcesStore, { Resource } from "../stores/resources-store";

export default function LocalTab() {
  const { addResource, isResourceInStore } = useResourcesStore();
  function invalid(file: File) {
    return console.error(`Invalid file: ${file.name}`);
  }

  return (
    <CardContent className="w-full h-full px-0.5">
      <Dropzone
        onDrop={async (files) => {
          for (const file of files) {
            if (file.type !== "application/zip") {
              invalid(file);
              continue;
            }

            const zip = await new JSZip().loadAsync(file);
            const packpng = zip.file("pack.png")
              ? await zip.file("pack.png")!.async("base64")
              : null;
            const packmcmeta = zip.file("pack.mcmeta")
              ? await zip.file("pack.mcmeta")!.async("string")
              : null;
            if (!packmcmeta) {
              invalid(file);
              continue;
            }

            const obj: Resource = {
              id: file.name,
              name: file.name,
              source: "local",
              data: await file.arrayBuffer(),
              image:
                packpng ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
            };

            if (isResourceInStore(obj)) {
              console.error(`Duplicate resource: ${file.name}`);
              continue;
            }

            addResource(obj);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full h-full text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
            <div
              {...getRootProps()}
              className="w-full h-full cursor-pointer flex items-center justify-center"
            >
              <input {...getInputProps()} accept="application/zip" />

              <div className="flex flex-col items-center justify-center">
                <Upload className="size-12 text-white mx-auto mb-4" />
                <p>Upload some resource packs! Must be zipped.</p>
                <p className="text-sm text-gray-400">
                  Need to delete something you uploaded? Scroll below
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </CardContent>
  );
}
