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
    ChevronRight,
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
    subItems: [
      { title: routes.areas.title, url: routes.areas.path, icon: LandPlot },
      { title: routes.createArea.title, url: routes.createArea.path, icon: LandPlot },
    ],
  },
  {
    title: routes.bills.title,
    url: routes.bills.path,
    icon: Receipt,
    subItems: [
      { title: routes.bills.title, url: routes.bills.path, icon: Receipt },
      { title: routes.generateBill.title, url: routes.generateBill.path, icon: Receipt },
    ],
  },
  {
    title: routes.report.title,
    url: routes.report.path,
    icon: IconReport,
  },
  {
    title: routes.accessControll.title,
    url: routes.accessControll.path,
    icon: Users,
  },
]

export function SaSidebar() {
    const pathname = usePathname();

    const getIsActive = (path: string) => {
      if (pathname.startsWith(path)) return true;
      return false;
    }

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
                Object.hasOwn(item,"subItems") ? (
                  <Collapsible key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={getIsActive(item.url)}
                          className="group flex items-center w-full"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight
                            className="ml-auto transition-transform group-data-[state=open]:rotate-90"
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