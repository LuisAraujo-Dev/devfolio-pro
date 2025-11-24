import Image from "next/image";

export function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Moldura Externa */}
      <div className="relative rounded-[3rem] border-8 border-[#202020] bg-[#202020] shadow-2xl ring-1 ring-white/10">
        
        {/* Ilha Dinâmica / Notch */}
        <div className="absolute left-1/2 top-4 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black"></div>

        {/* Tela */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-black aspect-[9/19.5]">
          <Image 
             src={src} 
             alt={alt} 
             fill 
             className="object-cover object-top"
             unoptimized
           />
        </div>

        {/* Botões Laterais (CSS puro) */}
        <div className="absolute -right-3 top-20 h-10 w-1 rounded-r-md bg-[#1a1a1a]"></div>
        <div className="absolute -left-3 top-20 h-[25px] w-1 rounded-l-md bg-[#1a1a1a]"></div>
        <div className="absolute -left-3 top-[120px] h-10 w-1 rounded-l-md bg-[#1a1a1a]"></div>
      </div>
    </div>
  );
}