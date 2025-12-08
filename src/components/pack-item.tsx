import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Button } from "./ui/button";
import useResourcesStore, { Resource } from "./stores/resources-store";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

export function PackItem({ pack, index }: { pack: Resource; index: number }) {
  const { removeResource, reorderResource, resources } = useResourcesStore();

  return (
    <Item variant="outline" className="p-0 h-24 not-first:mt-2">
      <ItemMedia className="size-24" variant="image">
        <a className="size-full bg-black">
          {pack.image ? (
            <img src={pack.image} alt={pack.name} />
          ) : (
            <div className="size-full bg-black"></div>
          )}
        </a>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{pack.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <div className="grid grid-rows-2">
          <button>
            {index !== 0 && (
              <ArrowUp
                onClick={() => reorderResource(pack, index - 1)}
                className="cursor-pointer"
              />
            )}
          </button>
          <button>
            {index !== resources.length - 1 && (
              <ArrowDown
                onClick={() => reorderResource(pack, index + 1)}
                className="cursor-pointer"
              />
            )}
          </button>
        </div>
        <Button
          size="sm"
          variant="destructive"
          className="mr-4 cursor-pointer"
          onClick={() => removeResource(pack)}
        >
          Remove <Minus className="inline-block ml-1" />
        </Button>
      </ItemActions>
    </Item>
  );
}
