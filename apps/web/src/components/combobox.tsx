import { Check, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Combobox = ({
  array,
  placeholder,
  value,
  setValue,
  loading,
}: {
  array: Array<string>;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={(props) => (
          <Button
            {...props}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-50 justify-between"
            disabled={loading}
          >
            {value ? array.find((item) => item === value) : placeholder}
            <HugeiconsIcon icon={UnfoldMoreIcon} className="opacity-50" />
          </Button>
        )}
      ></PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}`} className="h-9" />
          <CommandList>
            <CommandEmpty>Try a different search</CommandEmpty>
            <CommandGroup>
              {array.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item}
                  <HugeiconsIcon
                    icon={Check}
                    className={cn("ml-auto", value === item ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
