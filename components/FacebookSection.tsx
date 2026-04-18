"use client";

import { Editable, EditableHTML } from "./Editable";

export default function FacebookSection() {
  return (
    <section className="news-section" id="news">
      <div className="container">
        <div className="section-header">
          <Editable id="home.fb.tag" as="span" className="section-tag">Aktualności</Editable>
          <EditableHTML id="home.fb.title" as="h2" className="section-title" defaultHtml='Ostatnie wpisy na <span class="gradient-text">Facebooku</span>' />
          <Editable id="home.fb.desc" as="p" className="section-desc">Najświeższe informacje, promocje i aktualności prosto z naszego profilu.</Editable>
        </div>
        <div className="fb-section-wrap">
          <div className="fb-feed-container" id="fbFeedWrap">
            <iframe
              id="fbIframe"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftomko.koko.9&tabs=timeline&width=500&height=820&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&locale=pl_PL"
              width="100%"
              height="820"
              style={{
                border: "none",
                overflow: "hidden",
                display: "block",
                flex: 1,
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Aktualności MotoFan na Facebooku"
            ></iframe>
          </div>

          {/* MOBILE CTA */}
          <div className="mobile-fb-cta">
            <img src="/pics/logo.jpg" alt="Motofan" className="mobile-cta-logo" />
            <Editable id="home.fb.mobile.title" as="h3">Jesteśmy na Facebooku!</Editable>
            <Editable id="home.fb.mobile.desc" as="p">Ze względów bezpieczeństwa na urządzeniach mobilnych zalecamy przeglądanie naszych aktualności bezpośrednio w aplikacji.</Editable>
            <a
              href="https://www.facebook.com/tomko.koko.9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 20, fontSize: "1.1rem", padding: "16px 30px" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginRight: 8 }}
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <Editable id="home.fb.mobile.btn" as="span">Odpal Motofan na Facebooku</Editable>
            </a>
          </div>

          <div className="fb-sidebar">
            <div className="fb-profile-card">
              <img
                src="/pics/logo.jpg"
                alt="Motofan Tomasz Kokoszka"
                className="fb-profile-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="fb-profile-info">
                <h4>Motofan Tomasz Kokoszka</h4>
                <span className="fb-handle">@tomko.koko.9</span>
                <div className="fb-stats-row">
                  <div className="fb-stat-item">
                    <strong>475</strong>
                    <Editable id="home.fb.followers" as="span">obserwujących</Editable>
                  </div>
                </div>
              </div>
            </div>

            <Editable id="home.fb.sidebar.heading" as="h3">Bądź na bieżąco</Editable>
            <div className="fb-reasons">
              <div className="fb-reason">
                <div className="fb-reason-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div>
                  <Editable id="home.fb.reason1.title" as="strong">Promocje i oferty</Editable>
                  <Editable id="home.fb.reason1.desc" as="p">Najnowsze oferty sprzedaży motocykli i akcesoriów.</Editable>
                </div>
              </div>
              <div className="fb-reason">
                <div className="fb-reason-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div>
                  <Editable id="home.fb.reason2.title" as="strong">Galeria pojazdów</Editable>
                  <Editable id="home.fb.reason2.desc" as="p">Zdjęcia nowych modeli Kawasaki, Benelli i Kymco.</Editable>
                </div>
              </div>
              <div className="fb-reason">
                <div className="fb-reason-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <Editable id="home.fb.reason3.title" as="strong">Imprezy motocyklowe</Editable>
                  <Editable id="home.fb.reason3.desc" as="p">Zloty, eventy i aktualności regionu opolskiego.</Editable>
                </div>
              </div>
            </div>
            <a
              href="https://www.facebook.com/tomko.koko.9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-fb"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <Editable id="home.fb.follow" as="span">Obserwuj na Facebooku</Editable>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
