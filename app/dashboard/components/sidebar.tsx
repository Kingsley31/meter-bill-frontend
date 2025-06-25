'use client'
import { 
    LandPlot, 
    Home, 
    CircleGauge, 
    Users, 
    Receipt, 
    User2,
    ChevronUp,
    LogOut,
    Settings,
    CircleUser,
 } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { IconInnerShadowTop, IconReport } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Meters",
    url: "/dashboard/meters",
    icon: CircleGauge,
  },
  {
    title: "Areas",
    url: "#",
    icon: LandPlot,
  },
  {
    title: "Customers",
    url: "#",
    icon: Users,
  },
  {
    title: "Bills",
    url: "#",
    icon: Receipt,
  },
  {
    title: "Report",
    url: "#",
    icon: IconReport,
  },
]

export function SaSidebar() {
    const pathname = usePathname()
    console.log(pathname);
  return (
    <Sidebar>
        <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Meter Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url.trim()==pathname.trim()}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                     <CircleUser/> Kingsley
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                >
                  <DropdownMenuItem>
                    <User2 /><span> Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings/><span> Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut/><span> Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}