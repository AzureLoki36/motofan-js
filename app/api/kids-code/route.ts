import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* Generuje losowy kod nagrody, np. MOTO-7F3K9Q */
function genCode() {
  return "MOTO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

/* POST /api/kids-code
   Wywolywane po ukonczeniu (wygraniu) mini-gry. Generuje losowy kod i probuje
   wyslac go mailem na adres wlasciciela. Wysylka dziala, gdy ustawiony jest
   sekret RESEND_API_KEY (Vercel -> Settings -> Environment Variables).
   Bez klucza endpoint nadal zwraca kod (po prostu bez maila). */
export async function POST() {
  const code = genCode();
  const to = process.env.KIDS_CODE_TO || "lylyly24@gmail.com";
  let emailed = false;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.KIDS_CODE_FROM || "MotoFun <onboarding@resend.dev>",
        to,
        subject: "🏍️ Nowy kod z mini-gry dla dzieci",
        text:
          `Ktoś ukończył mini-grę "Bezpieczna jazda" w Strefie Małego Motocyklisty!\n\n` +
          `Wygenerowany kod nagrody: ${code}\n\n` +
          `Data: ${new Date().toLocaleString("pl-PL")}`,
      });
      emailed = true;
    } catch {
      // Wysylka sie nie powiodla - kod i tak zwracamy uzytkownikowi.
    }
  }

  return NextResponse.json({ code, emailed });
}
