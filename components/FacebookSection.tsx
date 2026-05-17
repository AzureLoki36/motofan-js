"use client";

import { Editable, EditableHTML } from "./Editable";

export default function FacebookSection() {
  return (
    <section className="news-section" id="news">
      <div className="container">
        <div className="section-header">
          <Editable id="home.fb.tag" as="span" className="section-tag">Aktualności</Editable>
          <EditableHTML id="home.fb.title" as="h2" className="section-title" defaultHtml='Co nowego <span class="gradient-text">u nas</span>' />
          <Editable id="home.fb.desc" as="p" className="section-desc">Najświeższe informacje, promocje i aktualności prosto z naszych profili na Facebooku i Instagramie.</Editable>
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
              title="Aktualności MotoFun na Facebooku"
            ></iframe>
          </div>

          {/* MOBILE CTA */}
          <div className="mobile-fb-cta">
            <img src="/pics/logo.jpg" alt="MotoFun" className="mobile-cta-logo" />
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
              <Editable id="home.fb.mobile.btn" as="span">Odpal MotoFun na Facebooku</Editable>
            </a>
            <a
              href="https://www.instagram.com/motofanmotocykle/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ig"
              style={{ marginTop: 12, fontSize: "1.1rem", padding: "16px 30px", width: "auto" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginRight: 8 }}
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85C2.295 5.785 2.569 4.517 3.544 3.542c.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.522.012-4.764.069-1.05.048-1.612.225-1.989.373-.5.194-.857.426-1.232.801-.375.375-.607.732-.801 1.232-.148.377-.325.94-.373 1.989-.057 1.242-.069 1.615-.069 4.764s.012 3.522.069 4.764c.048 1.05.225 1.612.373 1.989.194.5.426.857.801 1.232.375.375.732.607 1.232.801.377.148.94.325 1.989.373 1.242.057 1.615.069 4.764.069s3.522-.012 4.764-.069c1.05-.048 1.612-.225 1.989-.373.5-.194.857-.426 1.232-.801.375-.375.607-.732.801-1.232.148-.377.325-.94.373-1.989.057-1.242.069-1.615.069-4.764s-.012-3.522-.069-4.764c-.048-1.05-.225-1.612-.373-1.989-.194-.5-.426-.857-.801-1.232-.375-.375-.732-.607-1.232-.801-.377-.148-.94-.325-1.989-.373C15.522 4.013 15.149 4.001 12 4.001zm0 3.063A4.936 4.936 0 1 1 7.064 12 4.942 4.942 0 0 1 12 7.064zm0 8.135A3.199 3.199 0 1 0 8.801 12 3.2 3.2 0 0 0 12 15.199zm6.281-8.345a1.153 1.153 0 1 1-1.153-1.153 1.153 1.153 0 0 1 1.153 1.153z" />
              </svg>
              <Editable id="home.ig.mobile.btn" as="span">Odpal MotoFun na Instagramie</Editable>
            </a>
          </div>

          <div className="fb-sidebar">
            <div className="fb-profile-card">
              <img
                src="/pics/logo.jpg"
                alt="MotoFun Tomasz Kokoszka"
                className="fb-profile-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="fb-profile-info">
                <h4>MotoFun Tomasz Kokoszka</h4>
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
            <a
              href="https://www.instagram.com/motofanmotocykle/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ig"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85C2.295 5.785 2.569 4.517 3.544 3.542c.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.522.012-4.764.069-1.05.048-1.612.225-1.989.373-.5.194-.857.426-1.232.801-.375.375-.607.732-.801 1.232-.148.377-.325.94-.373 1.989-.057 1.242-.069 1.615-.069 4.764s.012 3.522.069 4.764c.048 1.05.225 1.612.373 1.989.194.5.426.857.801 1.232.375.375.732.607 1.232.801.377.148.94.325 1.989.373 1.242.057 1.615.069 4.764.069s3.522-.012 4.764-.069c1.05-.048 1.612-.225 1.989-.373.5-.194.857-.426 1.232-.801.375-.375.607-.732.801-1.232.148-.377.325-.94.373-1.989.057-1.242.069-1.615.069-4.764s-.012-3.522-.069-4.764c-.048-1.05-.225-1.612-.373-1.989-.194-.5-.426-.857-.801-1.232-.375-.375-.732-.607-1.232-.801-.377-.148-.94-.325-1.989-.373C15.522 4.013 15.149 4.001 12 4.001zm0 3.063A4.936 4.936 0 1 1 7.064 12 4.942 4.942 0 0 1 12 7.064zm0 8.135A3.199 3.199 0 1 0 8.801 12 3.2 3.2 0 0 0 12 15.199zm6.281-8.345a1.153 1.153 0 1 1-1.153-1.153 1.153 1.153 0 0 1 1.153 1.153z" />
              </svg>
              <Editable id="home.ig.follow" as="span">Obserwuj na Instagramie</Editable>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
