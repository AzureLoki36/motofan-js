export type Locale = "pl" | "en" | "uk";

export const LOCALES: Locale[] = ["pl", "en", "uk"];
export const DEFAULT_LOCALE: Locale = "pl";
export const LOCALE_COOKIE = "motofan-locale";

export const LOCALE_NAMES: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  uk: "Українська",
};
