import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex size-16 items-center justify-center">
           <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
           <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
           <Loader2 className="size-8 text-primary animate-pulse" />
        </div>
        
        <p className="text-sm font-medium text-muted animate-pulse">
          Carregando experiências...
        </p>
      </div>
    </div>
  );
}