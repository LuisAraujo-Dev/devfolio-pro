import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Luís Araújo",
    default: "Luís Araújo | Engenheiro de Software", 
  },
  description:
    "Portfólio profissional de Luís Araújo. Desenvolvedor Fullstack especialista em Next.js, React e Ecossistema Web.",
  
  keywords: ["Next.js", "React", "TypeScript", "Desenvolvedor", "Portfólio", "Fullstack", "Luís Araújo"],
  authors: [{ name: "Luís Araújo" }],
  
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-background text-white`}
      >
        {children}
      </body>
    </html>
  );
}