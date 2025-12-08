import { CardContent } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import Dropzone from "react-dropzone";

export default function LocalTab() {
  return (
    <CardContent className="w-full h-full px-0.5">
      <Dropzone onDrop={(files) => console.log(files)}>
        {({ getRootProps, getInputProps }) => (
          <section className="w-full h-full text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
            <div
              {...getRootProps()}
              className="w-full h-full cursor-pointer flex items-center justify-center"
            >
              <input {...getInputProps()} accept="application/zip" />

              <div>
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
