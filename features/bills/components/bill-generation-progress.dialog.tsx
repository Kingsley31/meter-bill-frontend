import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { routes } from "@/data/routes";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export type BillGenerationProgressDialogProps = {
    title: string;
    description: string;
    xRequestId: string;
    isOpen: boolean;
    onClose?: () => void;
};

export function BillGenerationProgressDialog({
    isOpen,
    title,
    description,
    xRequestId,
    onClose,
}: BillGenerationProgressDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin text-primary h-6 w-6" />
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription className="mt-2">{description}</DialogDescription>
                </DialogHeader>
                <div className="my-4 bg-muted rounded-md px-4 py-3">
                    <span className="font-medium text-muted-foreground">Request ID:</span>
                    <span className="ml-2 text-primary font-mono break-all">{xRequestId}</span>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button asChild>
                        <Link
                            href={`${routes.billGenerationStatus.path}?xRequestId=${xRequestId}`}
                            className="flex items-center gap-1"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            View Generation Status
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}