import Image from "next/image";

export function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[900px]">
      {/* Moldura da Tela */}
      <div className="relative rounded-t-xl bg-[#202020] px-2 pt-2 shadow-2xl ring-1 ring-white/10">
        {/* Câmera */}
        <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black/80 ring-1 ring-white/20"></div>
        
        {/* Tela (Conteúdo) */}
        <div className="overflow-hidden rounded-lg bg-black aspect-16/10 relative">
           <Image 
             src={src} 
             alt={alt} 
             fill 
             className="object-cover object-top"
             unoptimized // Para aceitar URLs externas
           />
        </div>
      </div>
      
      {/* Base do Laptop */}
      <div className="relative z-10 h-3.5 w-full rounded-b-xl bg-[#2f2f2f] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-[100px] -translate-x-1/2 rounded-b-md bg-[#1a1a1a]"></div>
      </div>
    </div>
  );
}