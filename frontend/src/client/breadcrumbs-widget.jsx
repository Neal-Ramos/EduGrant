import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./dark-light-toggle";
import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Notification() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleOnclickLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("Logout!!!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-5">
      <Popover>
        <PopoverTrigger asChild>
          <div className=" h-8 w-8 flex justify-center items-center shadow-md rounded-full">
            <Bell size={25} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <div className="py-2 space-y-1">
            <p className=" font-medium">Scholarship Approved</p>
            <p className="text-sm text-muted-foreground">
              Your application for the Academic Excellence Scholarship has been
              approved.
            </p>
            <p className="text-[11px] text-right text-gray-500">2 hours ago</p>
          </div>
          <Separator />
          <div className="py-2 space-y-1">
            <p className=" font-medium">Scholarship Approved</p>
            <p className="text-sm text-muted-foreground">
              Your application for the Academic Excellence Scholarship has been
              approved.
            </p>
            <p className="text-[11px] text-right text-gray-500">2 hours ago</p>
          </div>
          {/* <p className="text-center py-2">No notifications</p> */}

          <p className="text-center underline text-sm">See more</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2">
            <div className=" h-8 w-8 flex justify-center items-center shadow-md  rounded-full">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <ChevronDown size={20} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-45 space-y-3">
          <div className="flex items-center gap-2">
            <UserRoundCog size={18} />
            Profile Settings
          </div>
          <div
            className="flex items-center gap-2"
            onClick={() => handleOnclickLogout}
          >
            <LogOut size={18} />
            Logout
          </div>
        </PopoverContent>
      </Popover>
      <ModeToggle />
    </div>
  );
}
//  <div className="relative">
//    <Bell size={28} />
//    <span className="absolute bottom-4 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//      3
//    </span>
//  </div>;
