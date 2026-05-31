import type { Part } from "./parts";

/* Przykładowe części używane — wyświetlane gdy magazyn jest pusty (blob).
   Po pierwszym zapisie z panelu admina dane z blob mają pierwszeństwo. */
const placeholder = "/pics/latajace/cogwheel.svg";

const seedRaw: Omit<Part, "createdAt" | "updatedAt">[] = [
  {
    id: "seed-1",
    name: "Gaźnik Mikuni VM26",
    brand: "Mikuni",
    category: "silnik",
    condition: "stan-bdb",
    price: 180,
    description:
      "Sprawdzony, zregenerowany gaźnik VM26 do skuterów i motocykli 125–200 ccm. Czysty po pełnym serwisie, regulowany przed wydaniem.",
    fits: "Skutery i motocykle 125–200 ccm",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-2",
    name: "Tłumik wydechowy nierdzewny",
    brand: "Uniwersalny",
    category: "silnik",
    condition: "stan-db",
    price: 220,
    description:
      "Tłumik ze stali nierdzewnej, ślady używania, w pełni sprawny. Sportowy ton, atest wewnętrzny po przeglądzie.",
    fits: "Mocowanie uniwersalne 38–45 mm",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-3",
    name: "Amortyzator tylny YSS",
    brand: "YSS",
    category: "zawieszenie",
    condition: "stan-bdb",
    price: 320,
    description:
      "Tylni amortyzator YSS z regulacją sprężyny. Bez wycieków, działa miękko, nadaje się do dalszej eksploatacji.",
    fits: "Naked / Sport 600–900 ccm",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-4",
    name: "Lampa przednia LED",
    brand: "—",
    category: "oswietlenie",
    condition: "stan-bdb",
    price: 95,
    description:
      "Owalna lampa przednia z modułem LED, sprawna, czysta soczewka. Mocowanie boczne.",
    fits: "Naked / cafe racer, mocowanie M8",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-5",
    name: "Tarcza hamulcowa przednia 280 mm",
    brand: "Brembo",
    category: "hamulce",
    condition: "stan-db",
    price: 110,
    description:
      "Tarcza 280 mm, grubość w normie, lekkie ślady eksploatacji. Bez bicia, bez pęknięć.",
    fits: "Wiele modeli klasy średniej",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-6",
    name: "Klocki hamulcowe – komplet (przód + tył)",
    brand: "EBC",
    category: "hamulce",
    condition: "nowa",
    price: 80,
    description:
      "Nowy komplet klocków organicznych EBC. Końcówki serii — sprzedaż detaliczna.",
    fits: "Sprawdź numer EBC dla swojego modelu",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-7",
    name: 'Felga aluminiowa 17"',
    brand: "Uniwersalna",
    category: "kola-opony",
    condition: "stan-db",
    price: 250,
    description:
      'Felga 17" 3,5", sprawdzona po centrowaniu, bez pęknięć. Bez opony.',
    fits: "Wymaga sprawdzenia rozstawu",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-8",
    name: "Łańcuch napędowy DID 520",
    brand: "DID",
    category: "silnik",
    condition: "stan-db",
    price: 140,
    description:
      "Łańcuch DID 520, 110 ogniw, pozostałość żywotności ok. 70%. Sprawdzony pod kątem rozciągu.",
    fits: "Średnie motocykle 250–600 ccm",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-9",
    name: "Komplet owiewek (czarny)",
    brand: "—",
    category: "owiewki",
    condition: "stan-db",
    price: 280,
    description:
      "Owiewki w komplecie, kolor czarny. Drobne ślady eksploatacji, bez pęknięć. Komplet mocowań w cenie.",
    fits: "Skuter klasy 125",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-10",
    name: "Akumulator 12V YTX9-BS",
    brand: "Yuasa",
    category: "elektryka",
    condition: "stan-bdb",
    price: 95,
    description:
      "Akumulator po teście pojemności — trzyma napięcie. Idealny jako zapasowy lub do sezonowej maszyny.",
    fits: "12V, mocowanie standardowe",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-11",
    name: "Manetka gazu z linkami",
    brand: "Domino",
    category: "akcesoria",
    condition: "stan-db",
    price: 35,
    description:
      "Manetka gazu Domino z dwiema linkami. Pełna obsługa, ślady normalnej eksploatacji.",
    fits: "Uniwersalna, 22 mm",
    images: [placeholder],
    available: true,
  },
  {
    id: "seed-12",
    name: "Sprzęgło kompletne (tarcze + sprężyny)",
    brand: "—",
    category: "silnik",
    condition: "stan-db",
    price: 220,
    description:
      "Komplet tarcz sprzęgła z presjami, sprawdzone na grubość. Bez przepalenia.",
    fits: "Sprawdź model — sprzedaż wg dopasowania",
    images: [placeholder],
    available: true,
  },
];

export const PARTS_SEED: Part[] = seedRaw.map((p) => ({
  ...p,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}));
