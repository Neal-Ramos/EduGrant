import { useContext, useState } from "react";
import {
  GalleryVerticalEnd,
  Settings2,
  ChevronsUpDown,
  Plus,
  Sparkles,
  BadgeCheck,
  CreditCard,
  Bell,
  LogOut,
  Gauge,
  ListOrdered,
  Send,
  SquareUserRound,
  CircleHelp,
  GraduationCap,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import bascLogo from "@/assets/basclogo.png";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "@/context/AuthContext";

const data = {
  user: {
    name: "Tecson, Jerome L.",
    email: "jerometecson.basc@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BASC EDUGRANT",
      logo: GraduationCap,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/home/dashboard",
      icon: Gauge,
    },
    {
      title: "Scholarships",
      url: "/home/scholarships",
      icon: ListOrdered,
    },
    {
      title: "My Applications",
      url: "/home/applications",
      icon: Send,
    },
    {
      title: "Notification",
      url: "/home/notification",
      icon: Bell,
    },
  ],
  projects: [
    {
      name: "Profile",
      url: "/home/profile",
      icon: SquareUserRound,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Help",
      url: "#",
      icon: CircleHelp,
    },
  ],
};

function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname === item.url;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={isActive}
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavProjects({ projects }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>User Settings</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild data-active={isActive}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function TeamSwitcher({ teams }) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center   text-sidebar-primary-foreground">
           <img src={bascLogo} alt="" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-white">
              {activeTeam.name}
            </span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUser({ user }) {
  const contextUser = useContext(AuthContext)
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const handleLogoutButton = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast("Logout Success!!")
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    } catch (error) {
      toast("Logout Failed!!")
      console.log(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{`${contextUser.user.firstName} ${contextUser.user.middleName} ${contextUser.user.lastName}`}</span>
                <span className="truncate text-xs">{contextUser.user.userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${contextUser.user.firstName} ${contextUser.user.middleName} ${contextUser.user.lastName}`}</span>
                  <span className="truncate text-xs">{contextUser.user.userEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutButton}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function SidebarLeft(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
