// seed-products.mjs – uruchom: node scripts/seed-products.mjs
import { config } from "dotenv";
import { list, put, del } from "@vercel/blob";

config({ path: ".env.local" });

const now = new Date().toISOString();

function id() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
    .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
    .replace(/ś/g, "s").replace(/ź|ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const products = [
  {
    name: "Klocki hamulcowe przednie Kawasaki Z650",
    brand: "Kawasaki",
    category: "Hamulce",
    condition: "new",
    price: 8900,
    comparePrice: 11900,
    stock: 15,
    sku: "KAW-Z650-KB-F01",
    description: "Oryginalne klocki hamulcowe przednie do Kawasaki Z650 (2017-2024). Zapewniają doskonałe hamowanie w każdych warunkach. Materiał: organiczny. Zestaw na jeden zacisk.",
    compatibility: ["Kawasaki Z650 2017-2024", "Kawasaki Z650RS 2021-2024"],
    images: [],
    tags: ["hamulce", "kawasaki", "z650", "klocki"],
  },
  {
    name: "Filtr oleju Kawasaki Ninja 400 / Z400",
    brand: "Kawasaki",
    category: "Silnik",
    condition: "new",
    price: 3500,
    stock: 30,
    sku: "KAW-FILTER-OIL-01",
    description: "Oryginalny filtr oleju Kawasaki pasujący do modeli Ninja 400 i Z400. Gwarantuje czystość oleju i długą żywotność silnika. Wkręcany, gwint M20x1,5.",
    compatibility: ["Kawasaki Ninja 400 2018-2024", "Kawasaki Z400 2019-2024"],
    images: [],
    tags: ["silnik", "filtr", "olej", "kawasaki"],
  },
  {
    name: "Tarcza hamulcowa tylna Kawasaki Versys 650",
    brand: "Kawasaki",
    category: "Hamulce",
    condition: "new",
    price: 24900,
    stock: 8,
    sku: "KAW-VER650-DISC-R",
    description: "Oryginalna tarcza hamulcowa tylna do Kawasaki Versys 650 (2015-2024). Średnica 220mm, grubość 5mm. Stalowa, szlifowana.",
    compatibility: ["Kawasaki Versys 650 2015-2024"],
    images: [],
    tags: ["hamulce", "tarcza", "kawasaki", "versys"],
  },
  {
    name: "Świeca zapłonowa NGK CR9EH-9 – Kawasaki / Benelli",
    brand: "NGK",
    category: "Elektryka",
    condition: "new",
    price: 1800,
    comparePrice: 2200,
    stock: 50,
    sku: "NGK-CR9EH9",
    description: "Świeca zapłonowa NGK CR9EH-9. Pasuje do wielu modeli Kawasaki, Benelli i Kymco. Doskonała iskra, długa trwałość. Sprzedawana sztuka.",
    compatibility: ["Kawasaki Z650 2017+", "Kawasaki Ninja 650 2017+", "Benelli Leoncino 500", "Benelli TRK 502"],
    images: [],
    tags: ["elektryka", "świeca", "ngk", "zapłon"],
  },
  {
    name: "Łańcuch napędowy DID 525ZVM-X 108 ogniw",
    brand: "DID",
    category: "Układ napędowy",
    condition: "new",
    price: 34900,
    stock: 12,
    sku: "DID-525ZVM-X-108",
    description: "Łańcuch napędowy DID 525ZVM-X o długości 108 ogniw. X-ring, wzmocniony, z zapinką. Idealny do sportowych i turystycznych motocykli 600-1000cc.",
    compatibility: ["Kawasaki Z650", "Kawasaki Ninja 650", "Kawasaki Versys 650", "Kawasaki Z900"],
    images: [],
    tags: ["łańcuch", "napęd", "did", "525"],
  },
  {
    name: "Zestaw koronka + zębatka Kawasaki Z650",
    brand: "Kawasaki",
    category: "Układ napędowy",
    condition: "new",
    price: 18500,
    comparePrice: 22000,
    stock: 6,
    sku: "KAW-Z650-SPROCKET-SET",
    description: "Komplet koronka + zębatka (tył + przód) do Kawasaki Z650. Przód 15T, tył 41T. Stal hartowana. Sprzedawane jako zestaw.",
    compatibility: ["Kawasaki Z650 2017-2024", "Kawasaki Ninja 650 2017-2024"],
    images: [],
    tags: ["koronka", "zębatka", "kawasaki", "napęd"],
  },
  {
    name: "Amortyzator tylny Kawasaki Z900 – używany 15 000km",
    brand: "Kawasaki",
    category: "Zawieszenie",
    condition: "used",
    price: 29900,
    comparePrice: 89900,
    stock: 1,
    sku: "KAW-Z900-SHOCK-USED",
    description: "Używany amortyzator tylny do Kawasaki Z900 (2017-2020). Przebieg 15 000 km, sprawny, bez wycieków. Regulacja sprężyny wstępnego naprężenia. Stan dobry.",
    compatibility: ["Kawasaki Z900 2017-2020"],
    images: [],
    tags: ["zawieszenie", "amortyzator", "kawasaki", "z900", "używane"],
  },
  {
    name: "Lusterko boczne prawe Benelli TRK 502",
    brand: "Benelli",
    category: "Nadwozie",
    condition: "new",
    price: 12900,
    stock: 4,
    sku: "BEN-TRK502-MIRROR-R",
    description: "Oryginalne lusterko boczne prawe do Benelli TRK 502 i TRK 502X. Elektryczne podgrzewanie lusterka, regulacja manualna. Homologowane.",
    compatibility: ["Benelli TRK 502 2017-2024", "Benelli TRK 502X 2019-2024"],
    images: [],
    tags: ["lusterko", "benelli", "trk502", "nadwozie"],
  },
  {
    name: "Filtr powietrza Kymco AK550",
    brand: "Kymco",
    category: "Silnik",
    condition: "new",
    price: 5500,
    stock: 10,
    sku: "KYMCO-AK550-AIR",
    description: "Oryginalny filtr powietrza do Kymco AK550. Papierowy, suchy. Zalecana wymiana co 12 000 km lub co 24 miesiące.",
    compatibility: ["Kymco AK550 2017-2024"],
    images: [],
    tags: ["filtr", "powietrze", "kymco", "ak550"],
  },
  {
    name: "Opona Michelin Pilot Road 5 120/70 ZR17",
    brand: "Michelin",
    category: "Opony i koła",
    condition: "new",
    price: 49900,
    comparePrice: 59900,
    stock: 7,
    sku: "MICH-PR5-120-70-17",
    description: "Opona Michelin Pilot Road 5 w rozmiarze 120/70 ZR17. Przednia opona turystyczno-sportowa. Doskonała przyczepność na mokrej i suchej nawierzchni. XST+ rzeźba bieżnika.",
    compatibility: ["Kawasaki Z650", "Kawasaki Ninja 650", "Kawasaki Z900", "Kawasaki Versys 650", "Benelli TRK 502"],
    images: [],
    tags: ["opona", "michelin", "przód", "120/70", "17"],
  },
  {
    name: "Kabel przepustnicy Kawasaki Ninja 300 – używany",
    brand: "Kawasaki",
    category: "Silnik",
    condition: "used",
    price: 4900,
    stock: 2,
    sku: "KAW-NIN300-THROTTLE-USED",
    description: "Używany kabel przepustnicy do Kawasaki Ninja 300 (2013-2017). Stan bardzo dobry, bez przetarć. Pasuje do obu wersji silnika.",
    compatibility: ["Kawasaki Ninja 300 2013-2017"],
    images: [],
    tags: ["przepustnica", "kawasaki", "ninja300", "używane"],
  },
  {
    name: "Osłona silnika dolna Benelli Leoncino 500",
    brand: "Benelli",
    category: "Nadwozie",
    condition: "new",
    price: 16500,
    stock: 3,
    sku: "BEN-LEON500-BELLY",
    description: "Oryginalna osłona dolna silnika (belly pan) do Benelli Leoncino 500 i Trail. Tworzywo ABS, kolor czarny. Montaż na śruby, bez wiercenia.",
    compatibility: ["Benelli Leoncino 500 2017-2024", "Benelli Leoncino 500 Trail 2018-2024"],
    images: [],
    tags: ["osłona", "benelli", "leoncino", "nadwozie"],
  },
];

async function seed() {
  const PRODUCTS_KEY = "shop/products.json";

  console.log("Sprawdzam istniejące produkty...");
  const { blobs } = await list({ prefix: PRODUCTS_KEY });
  for (const b of blobs) {
    await del(b.url);
    console.log("Usunięto stary plik:", b.url);
  }

  const now2 = new Date().toISOString();
  const finalProducts = products.map((p) => ({
    id: id(),
    slug: slug(p.name),
    name: p.name,
    description: p.description,
    brand: p.brand,
    category: p.category,
    compatibility: p.compatibility,
    condition: p.condition,
    price: p.price,
    comparePrice: p.comparePrice ?? null,
    stock: p.stock,
    sku: p.sku,
    status: "active",
    images: p.images,
    tags: p.tags,
    weight: null,
    marketplaceIds: {},
    createdAt: now2,
    updatedAt: now2,
  }));

  await put(PRODUCTS_KEY, JSON.stringify(finalProducts), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  console.log(`\n✅ Dodano ${finalProducts.length} produktów:\n`);
  finalProducts.forEach((p) => console.log(`  - ${p.name} (${(p.price / 100).toFixed(2)} zł)`));
}

seed().catch((e) => {
  console.error("Błąd:", e);
  process.exit(1);
});
