"use client";

import { useAdmin } from "./AdminProvider";
import { useLocale } from "./LocaleProvider";

export default function AdminToolbar() {
  const { isAdmin, editMode, toggleEditMode, hasChanges, saveContent, discardChanges, logout, saving } = useAdmin();
  const { t } = useLocale();

  if (!isAdmin) return null;

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
        .admin-toolbar-btn:hover {
          background: rgba(255,255,255,.2);
        }
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
        .admin-toolbar-btn.save:hover {
          background: rgba(34,197,94,.35);
        }
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
        }
      `}</style>
    </>
  );
}
