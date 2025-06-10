"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  FilePlus,
  BarChart2,
  ClipboardList,
  CheckCircle2,
  HelpCircle,
  Mail,
  Layers,
  Eye,
  Users,
  Settings,
} from "lucide-react";
import logo from "@/assets/basclogo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarData = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/administrator/home/dashboard",
          icon: Home,
        },
      ],
    },
    {
      title: "Scholarship Management",
      items: [
        {
          title: "Create Scholarship",
          url: "/administrator/home/scholarships/create",
          icon: FilePlus,
        },
        {
          title: "Manage Scholarships",
          url: "/administrator/home/scholarships/manage",
          icon: Layers,
        },
        {
          title: "Analytics & Reports",
          url: "/administrator/home/scholarships/analytics&reports",
          icon: BarChart2,
        },
      ],
    },
    {
      title: "Application Processing",
      items: [
        {
          title: "All Applications",
          url: "/administrator/home/applications/all",
          icon: ClipboardList,
        },
        {
          title: "Review Applications",
          url: "/administrator/home/applications/review",
          icon: Eye,
        },
        {
          title: "Track Status",
          url: "/administrator/home/applications/track",
          icon: CheckCircle2,
        },
      ],
    },
    {
      title: "User & Access Control",
      items: [
        {
          title: "Manage Students",
          url: "/administrator/home/users/students",
          icon: Users,
        },
        {
          title: "Admin Settings",
          url: "/administrator/home/users/admin-settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Help Center",
          url: "/administrator/home/support/help-center",
          icon: HelpCircle,
        },
        {
          title: "Contact Support",
          url: "/administrator/home/support/contact",
          icon: Mail,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img src={logo.src} alt="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="flex gap-1">
                  <p className="truncate font-medium text-2xl zxczxc tracking-[-5px]">
                    Edugrant
                  </p>
                  <p className="font-light mt-1">Admin</p>
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // Check if the current pathname matches the item url
                  // You can tweak this logic if you want partial matching or dynamic routes
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link
                          href={item.url}
                          prefetch={true}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
