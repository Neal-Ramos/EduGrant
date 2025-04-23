import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notification() {
  return (
    <div className="flex gap-5 pr-5">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Bell size={28} />
            <span className="absolute bottom-4 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-120 mr-3">
          <h4 className="font-medium mb-2">Notifications</h4>
          <ul className="space-y-2 text-sm">
            <li className="border-b pb-2">
              ✅ Your scholar application has been{" "}
              <span className="font-semibold text-green-600">approved</span>.
            </li>
            <li className="border-b pb-2">
              ⏳ Your scholar application is still{" "}
              <span className="font-semibold text-yellow-600">pending</span>.
            </li>
            <li className="pb-2">
              ❌ Your scholar application has been{" "}
              <span className="font-semibold text-red-600">rejected</span>.
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <UserRound size={28} />
        </PopoverTrigger>
        <PopoverContent className="w-48 text-sm">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              👤 Profile
            </Button>
            <Button variant="ghost" className="justify-start text-red-600">
              🚪 Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
