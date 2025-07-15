'use client';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarDB({ children, title, showBackBtn }: { children?: React.ReactNode | undefined; title?: string; showBackBtn?: boolean; }) {
   const router = useRouter()
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex ml-2 items-center">
          <SidebarTrigger />
          {showBackBtn && (<Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>)}
          <h1 className={`${children ? 'hidden':''} md:block text-sm md:text-base font-medium`}>{title}</h1>
        </div>
        <div className="ml-auto mr-2">
          {children}
        </div>
      </div>
        
    </header>
  )
}