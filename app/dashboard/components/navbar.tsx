import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavbarDB({ children, title }: { children?: React.ReactNode | undefined; title?: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex ml-2 items-center">
          <SidebarTrigger />
          <h1 className={`${children ? 'hidden':''} md:block text-sm md:text-base font-medium`}>{title}</h1>
        </div>
        <div className="ml-auto mr-2">
          {children}
        </div>
      </div>
        
    </header>
  )
}