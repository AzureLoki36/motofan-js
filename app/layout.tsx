import type { Metadata } from "next";
import "./style.css";
import "./subpage.css";
import { AdminProvider } from "@/components/AdminProvider";
import AdminToolbar from "@/components/AdminToolbar";
import { LocaleProvider } from "@/components/LocaleProvider";

export const metadata: Metadata = {
  title: "MotoFan Opole – Kawasaki · Benelli · Kymco",
  description:
    "MotoFan Opole – autoryzowany dealer i serwis Kawasaki, Benelli, Kymco. Serwis motocyklowy, sklep, odzież, części. ul. Partyzancka 85, Opole. Tel. 601 48 42 42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider>
          <AdminProvider>
            {children}
            <AdminToolbar />
          </AdminProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
