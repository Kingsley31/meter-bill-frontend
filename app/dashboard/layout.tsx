import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SaSidebar } from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <SidebarProvider className="bg-blue-400">
          <SaSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
      </SidebarProvider>
    </div>
  )
}