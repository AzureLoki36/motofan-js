import type { Metadata } from "next";
import ShopNavbar from "./components/ShopNavbar";
import { CartProvider } from "./components/CartProvider";

export const metadata: Metadata = {
  title: "Sklep Online – Części Motocyklowe | MotoFan Opole",
  description:
    "Sklep internetowy z częściami motocyklowymi. Kawasaki, Benelli, Kymco i inne marki. Wysyłka w całej Polsce.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
