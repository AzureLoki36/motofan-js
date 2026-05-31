"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "./AdminProvider";
import { useLocale } from "./LocaleProvider";
import { scopeForPath } from "@/lib/page-prefixes";

export default function AdminToolbar() {
  const { isAdmin, editMode, toggleEditMode, hasChanges, saveContent, discardChanges, logout, saving } = useAdmin();
  const { t } = useLocale();
  const pathname = usePathname();
  const scope = scopeForPath(pathname || "/");
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Zamknij menu przy klikniciu poza nim
  useEffect(() => {
    if (!restoreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setRestoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [restoreOpen]);

  if (!isAdmin) return null;

  const doRestore = async (kind: "all" | "page" | "undo") => {
    setRestoreOpen(false);
    let confirmText = "";
    let url = "";
    const body: { prefixes?: string[] } = {};
    if (kind === "all") {
      confirmText = "Przywrócić CAŁY serwis do stanu domyślnego? Wszystkie edycje tekstów i obrazków zostaną cofnięte na wszystkich podstronach.";
      url = "/api/content/restore-defaults";
    } else if (kind === "page") {
      if (!scope) {
        alert("Nie potrafię ustalić, których kluczy dotyczy ta podstrona — użyj 'Przywróć cały serwis' albo daj znać, dodam mapowanie.");
        return;
      }
      confirmText = `Przywrócić podstronę „${scope.label}" do stanu domyślnego? Edycje na innych podstronach zostaną nietknięte.`;
      url = "/api/content/restore-defaults";
      body.prefixes = scope.prefixes;
    } else {
      confirmText = scope
        ? `Cofnąć ostatnią zapisaną zmianę dla „${scope.label}"?`
        : "Cofnąć ostatnią zapisaną zmianę?";
      url = "/api/content/undo";
      if (scope) body.prefixes = scope.prefixes;
    }
    if (!confirm(confirmText)) return;
    setBusy(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        // Pełne przeładowanie - pobierze świeży content, zresetuje hasChanges
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({} as { error?: string }));
        alert("Nie udało się: " + (data?.error || `HTTP ${res.status}`));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <span className="admin-badge">{t("admin.badge")}</span>
          <button
            className={`admin-toolbar-btn ${editMode ? "active" : ""}`}
            onClick={toggleEditMode}
          >
            {editMode ? t("admin.editOn") : t("admin.preview")}
          </button>
        </div>
        <div className="admin-toolbar-right">
          {hasChanges && (
            <>
              <button className="admin-toolbar-btn save" onClick={saveContent} disabled={saving}>
                {saving ? t("admin.saving") : t("admin.save")}
              </button>
              <button className="admin-toolbar-btn discard" onClick={discardChanges}>
                {t("admin.discard")}
              </button>
            </>
          )}

          {/* Menu Przywracanie */}
          <div className="restore-wrap" ref={menuRef}>
            <button
              className="admin-toolbar-btn restore-trigger"
              onClick={() => setRestoreOpen((v) => !v)}
              disabled={busy}
              title="Przywracanie / cofanie zmian"
            >
              {busy ? "Pracuję…" : "↻ Przywracanie ▾"}
            </button>
            {restoreOpen && (
              <div className="restore-menu" role="menu">
                <button className="restore-item" onClick={() => doRestore("undo")}>
                  <span className="ri-ico">↶</span>
                  <span className="ri-txt">
                    <strong>Cofnij ostatnią zmianę</strong>
                    <em>{scope ? `na podstronie „${scope.label}"` : "(brak zakresu dla tej ścieżki)"}</em>
                  </span>
                </button>
                <button className="restore-item" onClick={() => doRestore("page")} disabled={!scope}>
                  <span className="ri-ico">⟳</span>
                  <span className="ri-txt">
                    <strong>Przywróć tę podstronę</strong>
                    <em>{scope ? `„${scope.label}" → stan domyślny` : "(brak zakresu)"}</em>
                  </span>
                </button>
                <button className="restore-item restore-item--danger" onClick={() => doRestore("all")}>
                  <span className="ri-ico">⟲</span>
                  <span className="ri-txt">
                    <strong>Przywróć CAŁY serwis</strong>
                    <em>wszystkie podstrony → stan domyślny</em>
                  </span>
                </button>
              </div>
            )}
          </div>

          <button className="admin-toolbar-btn logout" onClick={logout}>
            {t("admin.logout")}
          </button>
        </div>
      </div>
      <style>{`
        .admin-toolbar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          background: #1a1a2e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          font-family: 'Inter', sans-serif;
          font-size: .85rem;
          box-shadow: 0 -4px 24px rgba(0,0,0,.25);
          gap: 12px;
        }
        .admin-toolbar-left, .admin-toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-badge {
          background: rgba(230,57,70,.2);
          color: #e63946;
          padding: 4px 12px;
          border-radius: 100px;
          font-weight: 700;
          font-size: .78rem;
        }
        .admin-toolbar-btn {
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.15);
          color: #fff;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: .82rem;
          font-weight: 600;
          transition: all .2s;
          font-family: 'Inter', sans-serif;
        }
        .admin-toolbar-btn:hover { background: rgba(255,255,255,.2); }
        .admin-toolbar-btn:disabled { opacity: .55; cursor: progress; }
        .admin-toolbar-btn.active {
          background: rgba(230,57,70,.3);
          border-color: rgba(230,57,70,.5);
          color: #ff6b6b;
        }
        .admin-toolbar-btn.save {
          background: rgba(34,197,94,.2);
          border-color: rgba(34,197,94,.4);
          color: #4ade80;
        }
        .admin-toolbar-btn.save:hover { background: rgba(34,197,94,.35); }
        .admin-toolbar-btn.discard {
          background: rgba(251,191,36,.15);
          border-color: rgba(251,191,36,.3);
          color: #fbbf24;
        }
        .admin-toolbar-btn.logout {
          background: rgba(255,255,255,.05);
          border-color: rgba(255,255,255,.1);
          color: rgba(255,255,255,.6);
        }
        .admin-toolbar-btn.logout:hover {
          color: #ff6b6b;
          border-color: rgba(230,57,70,.3);
        }

        /* === Menu Przywracanie === */
        .restore-wrap { position: relative; }
        .restore-trigger {
          background: rgba(96,165,250,.15);
          border-color: rgba(96,165,250,.35);
          color: #93c5fd;
        }
        .restore-trigger:hover { background: rgba(96,165,250,.28); }
        .restore-menu {
          position: absolute;
          bottom: calc(100% + 10px);
          right: 0;
          min-width: 320px;
          background: #1a1a2e;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 -10px 32px rgba(0,0,0,.5);
          display: flex; flex-direction: column; gap: 2px;
          z-index: 10001;
        }
        .restore-item {
          background: transparent;
          border: none;
          color: #fff;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .restore-item:hover { background: rgba(255,255,255,.08); }
        .restore-item:disabled { opacity: .4; cursor: not-allowed; }
        .restore-item .ri-ico {
          font-size: 1.05rem; line-height: 1.2; padding-top: 1px;
        }
        .restore-item .ri-txt { display: flex; flex-direction: column; gap: 2px; }
        .restore-item strong { font-size: .88rem; font-weight: 700; }
        .restore-item em {
          font-style: normal; font-size: .76rem;
          color: rgba(255,255,255,.55);
        }
        .restore-item--danger strong { color: #ff8a8a; }
        .restore-item--danger:hover { background: rgba(230,57,70,.18); }

        /* Editable element styles */
        .editable-active {
          outline: 2px dashed rgba(230,57,70,.4) !important;
          outline-offset: 4px;
          cursor: text;
          border-radius: 4px;
          transition: outline-color .2s;
          min-width: 20px;
          min-height: 1em;
        }
        .editable-active:hover {
          outline-color: rgba(230,57,70,.7) !important;
        }
        .editable-active:focus {
          outline: 2px solid #e63946 !important;
          outline-offset: 4px;
          background: rgba(230,57,70,.04);
        }

        /* Editable image overlay */
        .editable-image-wrap {
          position: relative;
        }
        .editable-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .2s;
          cursor: pointer;
          border-radius: inherit;
          color: #fff;
          font-weight: 700;
          font-size: .9rem;
        }
        .editable-image-wrap:hover .editable-image-overlay {
          opacity: 1;
        }

        /* Editable list actions */
        .editable-list-item {
          position: relative;
        }
        .editable-list-actions {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          gap: 4px;
          z-index: 10;
          opacity: 0;
          transition: opacity .2s;
        }
        .editable-list-item:hover .editable-list-actions {
          opacity: 1;
        }
        .admin-btn-sm {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(0,0,0,.7);
          color: #fff;
          cursor: pointer;
          font-size: .9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s;
        }
        .admin-btn-sm:hover {
          background: rgba(0,0,0,.9);
        }
        .admin-btn-danger:hover {
          background: rgba(230,57,70,.8);
        }
        .editable-list-editor {
          background: var(--surface);
          border: 1.5px solid var(--primary);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .editable-list-editor label {
          font-size: .78rem;
          font-weight: 700;
          color: var(--text-m);
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .editable-list-editor input,
        .editable-list-editor textarea {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: .88rem;
          width: 100%;
        }
        .admin-add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 16px;
          margin-top: 12px;
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-m);
          font-family: 'Inter', sans-serif;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
        }
        .admin-add-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(230,57,70,.04);
        }

        /* Push page content up so toolbar doesn't overlap */
        body:has(.admin-toolbar) {
          padding-bottom: 56px;
        }

        @media (max-width: 640px) {
          .admin-toolbar {
            flex-direction: column;
            gap: 8px;
            padding: 10px 16px;
          }
          .restore-menu { right: auto; left: 0; }
        }
      `}</style>
    </>
  );
}
