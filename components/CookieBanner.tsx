"use client";

import { useEffect } from "react";
import { useLocale } from "./LocaleProvider";

export default function CookieBanner() {
  const { t } = useLocale();

  useEffect(() => {
    const banner = document.getElementById("cookieBanner");
    const btn = document.getElementById("acceptCookies");
    if (!banner || !btn) return;

    if (!localStorage.getItem("cookiesAccepted")) {
      setTimeout(() => banner.classList.add("show"), 1500);
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.classList.remove("show");
    });
  }, []);

  return (
    <div className="cookie-banner" id="cookieBanner">
      <div className="cookie-content">
        <div className="cookie-text">
          <strong>{t("cookie.title")}</strong>
          <p>{t("cookie.text")}</p>
        </div>
        <div className="cookie-actions">
          <button id="acceptCookies" className="btn btn-primary">
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
