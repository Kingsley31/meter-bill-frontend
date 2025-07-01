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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { IconInnerShadowTop, IconReport } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
    subItems: [
      { title: "List", url: "/dashboard/meters", icon: CircleGauge },
      { title: "Create", url: "/dashboard/meters/create", icon: CircleGauge },
      { title: "Assign Area", url: "/dashboard/meters/area", icon: LandPlot },
      { title: "Assign Customer", url: "/dashboard/meters/customer", icon: Users },
    ],
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
    const [metersOpen, setMetersOpen] = useState(false)

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
              {items.map((item) =>
                item.title === "Meters" ? (
                  <Collapsible key={item.title} open={metersOpen} onOpenChange={setMetersOpen}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.startsWith("/dashboard/meters")}
                          className="flex items-center w-full"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronUp
                            className={`ml-auto transition-transform ${metersOpen ? "rotate-180" : ""}`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === sub.url}
                            >
                              <a href={sub.url} className="flex items-center">
                                <sub.icon className="mr-2 w-4 h-4" />
                                <span>{sub.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url.trim() === pathname.trim()}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
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