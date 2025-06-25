import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavbarDB({ children }: { children?: React.ReactNode | undefined}) {
  return (
    <header className="flex w-full h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex">
            {children}
        </div>
    </header>
  )
}