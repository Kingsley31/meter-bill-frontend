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
import { routes } from "@/data/routes"

const items = [
  {
    title: routes.dashboard.title,
    url: routes.dashboard.path,
    icon: Home,
  },
  {
    title: routes.meters.title,
    url: routes.meters.path,
    icon: CircleGauge,
    subItems: [
      { title: routes.meters.title, url: routes.meters.path, icon: CircleGauge },
      { title: routes.createMeter.title, url: routes.createMeter.path, icon: CircleGauge },
    ],
  },
  {
    title: routes.areas.title,
    url: routes.areas.path,
    icon: LandPlot,
  },
  {
    title: routes.customers.title,
    url: routes.customers.path,
    icon: Users,
  },
  {
    title: routes.bills.title,
    url: routes.bills.path,
    icon: Receipt,
  },
  {
    title: routes.report.title,
    url: routes.report.path,
    icon: IconReport,
  },
]

export function SaSidebar() {
    const pathname = usePathname()
    const [metersOpen, setMetersOpen] = useState(false)

    return (
    <Sidebar collapsible="offcanvas" variant="inset">
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
                item.title === routes.meters.title ? (
                  <Collapsible key={item.title} open={metersOpen} onOpenChange={setMetersOpen}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.startsWith(routes.meters.path)}
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