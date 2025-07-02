import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavbarDB({ children }: { children?: React.ReactNode | undefined}) {
  return (
    <header className="flex w-full h-16 shrink-0 items-center justify-start gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex justify-between items-center w-full">
            {children}
        </div>
    </header>
  )
}