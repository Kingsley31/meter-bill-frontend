import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-1 justify-center items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4">
         <Button asChild>
            <Link href="/dashboard">Super Admin Dashboard</Link>
          </Button>
          <Button asChild>
              <Link href="/dashboard">Area Admin Dashboard</Link>
          </Button>
          <Button asChild>
              <Link href="/dashboard">Meter Reader Dashboard</Link>
          </Button>
      </main>
     
    </div>
  );
}
