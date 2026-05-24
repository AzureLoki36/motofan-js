# Redesign strony „Dla dzieci" (Strefa Małego Motocyklisty)

**Data:** 2026-05-24
**Plik docelowy:** `app/dla-dzieci/page.tsx` (Next.js, client component)
**Typ:** Pełny redesign istniejącej podstrony

## Cel

Przeprojektować podstronę dla dzieci na **wesoły, komiksowy** styl w **pastelowych
kolorach**, utrzymując prostą, czytelną strukturę. Zachować trzy sygnaturowe
elementy obecnego projektu oraz całą treść, dodając nową sekcję dla rodziców.

## Zachowane sygnatury (wymóg użytkownika)

1. **Kafelki** — białe karty z grubą obwódką i twardym offsetowym cieniem.
2. **Napisy w przekrzywionych prostokątach** — wyróżnione słowo w nagłówkach jako
   kolorowy prostokąt z obwódką, obrócony o ±2°.
3. **Baner wideo z tytułem** — hero z `banner.mp4` i tytułem strony.

## Decyzje projektowe (zatwierdzone)

- **Podejście:** „Komiksowa plansza" — ciąg pełnoszerokościowych, kolorowych
  paneli, każdy w innym pastelu, łączonych gładkim przejściem koloru.
- **Jadący motocyklista w hero ZOSTAJE** (animacja `HeroRider` + kręcące się koła).
- **Bez efektów hover** na kafelkach/kartach — elementy statyczne. Zostają tylko
  stany dostępności (focus) oraz kolory poprawnej/błędnej odpowiedzi w quizie.
- **Strefa rodzica** — wizualnie spokojniejsza (cieńsze ramki, miękki cień),
  sygnalizuje treść „dla dorosłych".
- **Bez doodli** — żadnych dekoracyjnych ilustracji `doodle-*.svg`. Przejścia
  między panelami = gładki gradient koloru (bez SVG, bez obrazków).

## Układ strony (góra → dół)

1. `Navbar` (`activeSection="Usługi"`)
2. **Baner wideo (hero)** — `banner.mp4`, breadcrumb (Strona główna / Dla dzieci),
   tytuł „Strefa Małego Motocyklisty! 🏍️" z komiksowym obrysem, podtytuł w
   pigułce, jadący motocyklista na dole.
3. **Quick-nav (5 kafelków)** — Produkty · RXF · Quiz · Strefa rodzica · Marki;
   kolor tła kafelka = kolor docelowej sekcji; klikalne kotwice `#`.
4. 🟧 **Produkty** — H2 „Kaski, zbroje i `[kurtki dla dzieci]`"; 6 kafelków.
5. *gradientowe przejście koloru*
6. 🟥 **RXF** — H2 „Motocykle `[RXF dla dzieci]`"; 4 kafelki (Mini 60 / Open 90 /
   Freeride 125 / Racing 150) z chipami `cm³` i wiek.
7. *gradientowe przejście koloru*
8. 🟩 **Quiz / mini-gra** — H2 „Mini-gra: `[Bezpieczna jazda]`"; interaktywna karta
   quizu (logika bez zmian, nowe style).
9. *gradientowe przejście koloru*
10. ⬜ **Strefa rodzica (NOWA)** — spokojny jasny panel; H2 „Strefa `[rodzica]`";
    4 rzeczowe info-kafelki (patrz niżej).
11. *gradientowe przejście koloru*
12. 🟪 **Marki** — H2 „Współpracujemy `[z najlepszymi]`"; 8 bąbelków marek.
13. ⬛ **CTA** — ciemny panel, żółta karta, przycisk „Zadzwoń: 601 48 42 42".
14. `SubpageFooter`

## System wizualny (pastelowo-komiksowy)

- **Obwódka komiksowa:** `--k-ink #1b2748` (granatowy „tusz") — ramki 3–4 px,
  twarde cienie offsetowe `0 8px 0 ink`.
- **Tła paneli:** brzoskwinia `#ffe3c7` · róż `#ffdbe0` · mięta `#d2f3df` ·
  strefa rodzica jasny `#eef2f8` · lawenda `#e6dbfb` · CTA ciemny `#1b2748`.
- **Akcenty:** słońce `#ffc24d` · pomidor `#ff7a66` · niebo `#5aa6f0` ·
  mięta `#3fcf97` · śliwka `#9b78ec`.
- **Typografia:** `Outfit` (nagłówki, etykiety) — bez zmian względem projektu.

### Specyfikacja sygnatur

- **Kafelek:** tło `#fff`, `border: 4px solid var(--k-ink)`, `border-radius`
  24–28px, `box-shadow: 0 8px 0 var(--k-ink)`. **Brak** transform/box-shadow na hover.
- **Przekrzywiony prostokąt (`.rainbow`):** kolorowe tło, biały tekst,
  `border: 3px solid var(--k-ink)`, `box-shadow: 4px 4px 0 var(--k-ink)`,
  `transform: rotate(-2deg)` (naprzemiennie ±2°). Wstawiany jako `<span>` w H2.
- **Hero baner:** `<video src="/pics/dzieci/banner.mp4" autoPlay loop muted
  playsInline>`, tytuł z wielowarstwowym `text-shadow` (obrys ink).

## Strefa rodzica — treść (nowa sekcja)

Tablica `PARENT_TIPS` (4 elementy), każdy: tytuł + krótki opis:

1. **Bezpieczeństwo przede wszystkim** — kask i zbroja zawsze, nawet na podwórku.
2. **Jak dobrać kask** — pomiar obwodu główki, właściwe dopasowanie.
3. **Od jakiego wieku?** — modele RXF wg wieku; jazda tylko na zamkniętych torach
   pod okiem dorosłego.
4. **Doradzimy w salonie** — zaproszenie do salonu w Opolu + telefon.

Panel: jasne tło `#eef2f8`, kafelki z cieńszą ramką (2px) i miękkim cieniem
(nie offsetowym), więcej tekstu, ton rzeczowy.

## Integracja techniczna

- **Komponenty (bez zmian):** `Navbar`, `SubpageFooter`, `Editable`/`EditableHTML`
  (edytowalne teksty), `useLocale` → `t()` dla breadcrumb (`bc.home`, `bc.kids`).
- **Dane w pliku:** `PRODUCTS`, `RXF_MOTOS`, `BRAND_LOGOS`, `QUESTIONS` zostają;
  nowa `PARENT_TIPS`.
- **Quiz:** logika `useState` bez zmian; tylko nowe klasy/style.
- **Hero:** zachowany komponent `HeroRider` (`rider.svg` + koła) + klatki
  `heroRide` / `wheelSpin`.
- **Tryb ciemny:** zachowane nadpisania `[data-theme="dark"]` dla paneli i tekstu.
- **Style:** inline `<style>{...}` w pliku (zgodnie z obecną konwencją strony).
- **Usuwane:** komponent `ZoneSep` z falą SVG i pomocnicze `easedGradient`/`hexToRgb`
  zastąpione prostym, lekkim separatorem gradientowym (lub gradientami na górze
  paneli); wszystkie reguły `:hover` z transform/box-shadow na kafelkach.
- **Assety używane:** `banner.mp4`, `product-*.svg`, `rxf-*.svg`, `rider.svg`.
  `doodle-*.svg` — nieużywane.

## Weryfikacja

Projekt nie ma testów automatycznych (statyczna strona marketingowa). Weryfikacja:

- `npm run build` (oraz lint) — bez błędów TypeScript/ESLint.
- Sprawdzenie ręczne (`npm run dev`): desktop / tablet / mobile (responsywność
  siatek), tryb ciemny, pełne przejście quizu, brak rozjechania w trybie edycji
  (`Editable`).

## Poza zakresem (YAGNI)

- Brak nowych assetów graficznych (korzystamy z istniejących).
- Brak nowych tłumaczeń poza istniejącym `bc.kids` (treść PL przez `Editable`,
  jak w obecnej wersji strony).
- Brak zmian w innych podstronach ani we wspólnych komponentach.
