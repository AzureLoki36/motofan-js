import { NextRequest, NextResponse } from "next/server";
import {
  isAdmin,
  verifyCredentialsPlain,
  getCurrentAdminUsername,
  COOKIE_NAME,
} from "@/lib/auth";
import {
  readStoredCredentials,
  updateCredentials,
} from "@/lib/auth-credentials";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/change-credentials
 * Body: { currentPassword: string; newUsername?: string; newPassword?: string }
 *
 * Zmienia login i/lub haslo. Wymaga:
 * - aktywnej sesji admina (cookie)
 * - poprawnego AKTUALNEGO hasla (re-auth, dla bezpieczenstwa)
 *
 * Po sukcesie czysci ciasteczko (admin musi zalogowac sie nowymi danymi).
 * Wszystkie inne aktywne ciasteczka (jesli admin loguje sie z wielu urzadzen)
 * sa uniewazniane automatycznie - isAdmin sprawdza iat vs updatedAt.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: string; newUsername?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidlowy format zadania" }, { status: 400 });
  }

  const currentPassword = (body.currentPassword || "").trim();
  const newUsername = body.newUsername?.trim();
  const newPassword = body.newPassword;

  if (!currentPassword) {
    return NextResponse.json({ error: "Podaj aktualne haslo" }, { status: 400 });
  }
  if (!newUsername && !newPassword) {
    return NextResponse.json(
      { error: "Nie zmieniasz ani loginu, ani hasla" },
      { status: 400 }
    );
  }

  const currentUsername = await getCurrentAdminUsername();

  if (!(await verifyCredentialsPlain(currentUsername, currentPassword))) {
    return NextResponse.json(
      { error: "Aktualne haslo niepoprawne" },
      { status: 401 }
    );
  }

  // Walidacja nowych wartosci
  if (newUsername !== undefined) {
    if (newUsername.length < 3) {
      return NextResponse.json({ error: "Login musi miec min. 3 znaki" }, { status: 400 });
    }
    if (newUsername.length > 64) {
      return NextResponse.json({ error: "Login max 64 znaki" }, { status: 400 });
    }
    if (!/^[A-Za-z0-9._@-]+$/.test(newUsername)) {
      return NextResponse.json(
        { error: "Login: dozwolone litery, cyfry, kropka, podkreslnik, mysl., @" },
        { status: 400 }
      );
    }
  }
  if (newPassword !== undefined) {
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Haslo musi miec min. 8 znakow" }, { status: 400 });
    }
    if (newPassword.length > 128) {
      return NextResponse.json({ error: "Haslo max 128 znakow" }, { status: 400 });
    }
  }

  // Pobierz biezace stored creds (do zachowania hash hasla jesli nie zmieniany)
  const stored = await readStoredCredentials();
  const currentForKeeping = stored ?? {
    username: currentUsername,
    // Brak hashu env-vars w blob - jesli admin nie zmienia hasla a uzywa env,
    // to musimy zhashowac biezace haslo (ktore wlasnie podal i potwierdzilismy).
    passwordHash: "",
  };

  // Jezeli admin nie zmienia hasla a my nie mamy hashu, zhashujemy aktualne
  // (ktore juz wlasnie zweryfikowalismy).
  let effectiveNewPassword = newPassword;
  if (!effectiveNewPassword && !currentForKeeping.passwordHash) {
    effectiveNewPassword = currentPassword;
  }

  try {
    await updateCredentials({
      newUsername,
      newPlainPassword: effectiveNewPassword,
      currentForKeeping: currentForKeeping.passwordHash
        ? { username: currentForKeeping.username, passwordHash: currentForKeeping.passwordHash }
        : undefined,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Blad zapisu";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  // Wyloguj — admin musi zalogowac sie nowymi danymi
  const res = NextResponse.json({
    ok: true,
    loggedOut: true,
    message: "Dane zmienione. Zaloguj sie nowymi.",
  });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return res;
}
