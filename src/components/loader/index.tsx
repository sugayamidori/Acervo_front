import { cn } from "@acervo/lib/utils";
import { Loader2 } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
  return <Loader2 className={cn("h-16 w-16 animate-spin", className)} />;
};
