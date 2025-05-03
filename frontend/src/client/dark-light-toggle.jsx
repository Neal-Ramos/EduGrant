import { Moon, Settings2, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useTheme } from "@/components/ui/darkmode";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative h-8 w-8 flex justify-center items-center shadow-md rounded-full">
          <Sun
            size={25}
            className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            size={25}
            className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 space-y-3">
        <div
          className="flex items-center gap-2"
          onClick={() => setTheme("light")}
        >
          <Sun size={20} /> Light
        </div>
        <div
          className="flex items-center gap-2"
          onClick={() => setTheme("dark")}
        >
          <Moon size={20} /> Dark
        </div>
        <div
          className="flex items-center gap-2"
          onClick={() => setTheme("system")}
        >
          <Settings2 size={20} /> System
        </div>
      </PopoverContent>
    </Popover>
  );
}
