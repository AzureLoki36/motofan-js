import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readMotorcycles, writeMotorcycles, Motorcycle } from "@/lib/motorcycles";

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
  const existing = await readMotorcycles();
  if (existing.length > 0) {
    return NextResponse.json({ error: "Database not empty, skipping seed" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const seed: Motorcycle[] = [
    {
      id: crypto.randomUUID(), type: "nowe", brand: "Kawasaki", model: "Z650",
      year: 2025, mileage: 0, displacement: 649, power: 68, price: 34900,
      description: "Bestsellerowy naked bike. Doskonały zarówno dla początkujących, jak i doświadczonych motocyklistów.",
      status: "available", category: "naked",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "nowe", brand: "Kawasaki", model: "Ninja 650",
      year: 2025, mileage: 0, displacement: 649, power: 68, price: 37900,
      description: "Sportowy charakter w przystępnej formie. Ikoniczny design Ninja z komfortową pozycją jazdy.",
      status: "available", category: "sport",
      images: [
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "nowe", brand: "Benelli", model: "TRK 502 X",
      year: 2025, mileage: 0, displacement: 500, power: 47.5, price: 27990,
      description: "Wszechstronny adventure z włoskim sznytem. Idealny na asfalt i lekki teren. Bestseller marki.",
      status: "available", category: "touring",
      images: [
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "nowe", brand: "Kymco", model: "X-Town 300i ABS",
      year: 2025, mileage: 0, displacement: 276, power: 25, price: 21900,
      description: "Komfortowy maxiskuter miejski z ABS. Pojemny schowek pod siedzeniem, niskie spalanie.",
      status: "available", category: "skuter",
      images: [
        "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "uzywane", brand: "Kawasaki", model: "Z650",
      year: 2021, mileage: 8500, displacement: 649, power: 68, price: 29900,
      description: "Świetny motocykl dla początkujących i zaawansowanych. Pierwszy właściciel, serwisowany w ASO.",
      status: "available", category: "naked",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "uzywane", brand: "Benelli", model: "TRK 502 X",
      year: 2022, mileage: 4200, displacement: 500, power: 47.5, price: 26500,
      description: "Adventure w wersji X z podniesionymi końcówkami. Idealny do jazdy po asfalcie i lekkim terenie.",
      status: "available", category: "touring",
      images: [
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "uzywane", brand: "Kawasaki", model: "Ninja 650",
      year: 2020, mileage: 12800, displacement: 649, power: 68, price: 32900,
      description: "Sportowy wygląd, komfortowa pozycja. Nowe opony, świeży przegląd. Kolor zielony Kawasaki.",
      status: "reserved", category: "sport",
      images: [
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
    {
      id: crypto.randomUUID(), type: "uzywane", brand: "Kymco", model: "X-Town 300i ABS",
      year: 2023, mileage: 2100, displacement: 276, power: 25, price: 18900,
      description: "Praktyczny skuter miejski z ABS. Pojemny bagażnik, niskie spalanie. Jak nowy!",
      status: "available", category: "skuter",
      images: [
        "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
      ],
      createdAt: now, updatedAt: now,
    },
  ];

  await writeMotorcycles(seed);
  return NextResponse.json({ success: true, count: seed.length });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
