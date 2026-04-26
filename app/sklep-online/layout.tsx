import type { Metadata } from "next";
import "../globals.css";
import "../style.css";
import ShopNavbar from "./components/ShopNavbar";
import { CartProvider } from "./components/CartProvider";

export const metadata: Metadata = {
  title: "Sklep Online – Części Motocyklowe | MotoFan Opole",
  description:
    "Sklep internetowy z częściami motocyklowymi. Kawasaki, Benelli, Kymco i inne marki. Wysyłka w całej Polsce.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <ShopNavbar />
          <main style={{ minHeight: "100vh", paddingTop: "70px" }}>
            {children}
          </main>
          <footer style={{
            background: "#111",
            color: "#aaa",
            padding: "2rem",
            textAlign: "center",
            fontSize: "0.9rem",
            marginTop: "4rem"
          }}>
            <p>&copy; {new Date().getFullYear()} MotoFan Opole – Sklep Online z częściami motocyklowymi</p>
            <p style={{ marginTop: "0.5rem" }}>
              <a href="/" style={{ color: "#f60", textDecoration: "none" }}>← Powrót do strony głównej</a>
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
