import { Button } from "@/components/ui/button";
import NavbarDB from "../../components/navbar";
import Link from "next/link";
import { routes } from "@/data/routes";
import { PlusIcon } from "lucide-react";

export default function GenerateBillPage() {
    return (
        <main>
             <NavbarDB title="Generate Bills">
                <div className="flex space-x-2 md:space-x-6">
                    {/* <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button> */}
                    <Button size="sm" asChild><Link href={routes.generateBill.path}>Generate Bills<PlusIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
        </main>
    );
}