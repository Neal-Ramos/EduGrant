"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import SpotlightBorderWrapper from "./border";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <SpotlightBorderWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <span className="bg-white h-3 w-5 rounded-full"></span> Light +
            Green
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <span className="bg-green-600 h-3 w-5 rounded-full"></span> Dark +
            Green
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("blue")}>
            <span className="bg-blue-600 h-3 w-5 rounded-full"></span> Dark +
            Blue
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <span className="bg-black h-3 w-5 rounded-full"></span> System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SpotlightBorderWrapper>
  );
}
