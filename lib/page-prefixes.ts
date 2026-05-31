/**
 * Mapowanie sciezki podstrony -> prefiksy kluczy Editable, ktore do niej naleza.
 * Uzywane przez panel admina przy "Przywroc te podstrone" / "Cofnij ostatnia zmiane".
 */

export interface PageScope {
  /** Dokladna sciezka (pathname) - dla / patrz fallback. */
  path: string;
  /** Prefiksy kluczy Editable, ktore admin chce przywrocic per ta podstrona. */
  prefixes: string[];
  /** Ludzka nazwa do dialogow potwierdzajacych. */
  label: string;
}

export const PAGE_SCOPES: PageScope[] = [
  { path: "/dla-dzieci",         prefixes: ["kids"],                                       label: "Strefa Małego Motocyklisty" },
  { path: "/czesci-uzywane",     prefixes: ["czesci-uzywane"],                             label: "Części używane" },
  { path: "/czesci",             prefixes: ["czesci"],                                     label: "Sprzedaż części" },
  { path: "/motocykle-uzywane",  prefixes: ["uzywane"],                                    label: "Motocykle używane" },
  { path: "/motocykle-nowe",     prefixes: ["nowe"],                                       label: "Motocykle nowe" },
  { path: "/serwis-motocyklowy", prefixes: ["serwis"],                                     label: "Serwis motocyklowy" },
  { path: "/transport-i-wynajem",prefixes: ["transport"],                                  label: "Transport i wynajem" },
  { path: "/historia",           prefixes: ["historia"],                                   label: "Historia" },
  { path: "/sklep",              prefixes: ["sklep"],                                      label: "Sklep" },
  { path: "/",                   prefixes: ["home", "nav", "tag", "hours", "contact", "footer.home"], label: "Strona główna" },
];

/** Zwraca scope dla danej sciezki lub null jesli nie znaleziono. */
export function scopeForPath(pathname: string): PageScope | null {
  for (const s of PAGE_SCOPES) {
    if (s.path === pathname) return s;
  }
  return null;
}
