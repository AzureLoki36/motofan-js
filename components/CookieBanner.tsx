"use client";

import { useEffect } from "react";

export default function CookieBanner() {
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
          <strong>Ta strona używa plików cookies 🍪</strong>
          <p>
            Korzystamy z plików cookies, aby zapewnić najlepsze doświadczenia,
            analizować ruch na stronie i ułatwić działanie funkcji
            społecznościowych (np. wtyczka Facebook). Pozostając na stronie
            akceptujesz ich użycie.
          </p>
        </div>
        <div className="cookie-actions">
          <button id="acceptCookies" className="btn btn-primary">
            Akceptuję i zamykam
          </button>
        </div>
      </div>
    </div>
  );
}
