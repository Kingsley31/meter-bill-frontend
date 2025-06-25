import { SidebarProvider } from "@/components/ui/sidebar";
import { SaSidebar } from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SaSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}