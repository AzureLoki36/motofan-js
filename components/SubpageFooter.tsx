import Link from "next/link";

export default function SubpageFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">
                MOTO<span className="logo-accent">FAN</span>
              </span>
              <span className="logo-sub">Opole</span>
            </div>
            <p>
              Autoryzowany dealer i serwis Kawasaki, Benelli, Kymco. Od 1999
              roku służymy motocyklistom w Opolu.
            </p>
          </div>
          <div className="footer-links">
            <h4>Usługi</h4>
            <ul>
              <li><Link href="/serwis-motocyklowy">Serwis motocyklowy</Link></li>
              <li><Link href="/sklep">Sklep z odzieżą</Link></li>
              <li><Link href="/czesci">Sprzedaż części</Link></li>
              <li><Link href="/motocykle-nowe">Motocykle nowe</Link></li>
              <li><Link href="/motocykle-uzywane">Motocykle używane</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Przydatne linki</h4>
            <ul>
              <li><Link href="/transport-i-wynajem">Transport i wynajem przyczepy</Link></li>
              <li><Link href="/#contact">Kontakt</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p>
              ul. Partyzancka 85
              <br />
              45-801 Opole
            </p>
            <p>
              <a href="tel:601484242">601 48 42 42</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 MotoFan Opole. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
