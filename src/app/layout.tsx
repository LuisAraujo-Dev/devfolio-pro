import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFolio Pro",
  description: "Portfólio Profissional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}