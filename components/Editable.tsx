"use client";

import { useRef, useCallback, useState, createElement } from "react";
import { useAdmin, useContentValue } from "./AdminProvider";

/* ── Editable Text ── */
interface EditableProps {
  id: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}

export function Editable({
  id,
  as: Tag = "span",
  className,
  children,
  multiline = false,
  style,
}: EditableProps) {
  const { editMode, updateContent } = useAdmin();
  const value = useContentValue(id, children);
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback(() => {
    if (ref.current) {
      const text = ref.current.innerText;
      if (text !== value) {
        updateContent(id, text);
      }
    }
  }, [id, value, updateContent]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
    },
    [multiline]
  );

  if (!editMode) {
    return createElement(Tag, { className, style }, value);
  }

  return createElement(Tag, {
    ref: ref as React.RefObject<never>,
    className: `${className || ""} editable-active`,
    style,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onClick: (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); },
    dangerouslySetInnerHTML: { __html: value },
  });
}

/* ── Editable HTML (preserves inner HTML like gradient-text spans) ── */
interface EditableHTMLProps {
  id: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  defaultHtml: string;
  style?: React.CSSProperties;
}

export function EditableHTML({
  id,
  as: Tag = "div",
  className,
  defaultHtml,
  style,
}: EditableHTMLProps) {
  const { editMode, content, updateContent } = useAdmin();
  const stored = getVal(content, id);
  const html = typeof stored === "string" ? stored : defaultHtml;
  const ref = useRef<HTMLElement>(null);

  const handleBlur = useCallback(() => {
    if (ref.current) {
      const newHtml = ref.current.innerHTML;
      if (newHtml !== html) {
        updateContent(id, newHtml);
      }
    }
  }, [id, html, updateContent]);

  if (!editMode) {
    return createElement(Tag, {
      className,
      style,
      dangerouslySetInnerHTML: { __html: html },
    });
  }

  return createElement(Tag, {
    ref: ref as React.RefObject<never>,
    className: `${className || ""} editable-active`,
    style,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onClick: (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); },
    dangerouslySetInnerHTML: { __html: html },
  });
}

/* ── Editable Image ── */
interface EditableImageProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EditableImage({
  id,
  src,
  alt,
  className,
  style,
}: EditableImageProps) {
  const { editMode, content, updateContent } = useAdmin();
  const stored = getVal(content, id);
  const currentSrc = typeof stored === "string" ? stored : src;
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (res.ok) {
        const data = await res.json();
        updateContent(id, data.url);
      }
      setUploading(false);
    },
    [id, updateContent]
  );

  if (!editMode) {
    return <img src={currentSrc} alt={alt} className={className} style={style} />;
  }

  return (
    <div className="editable-image-wrap" style={{ position: "relative", display: "inline-block" }}>
      <img src={currentSrc} alt={alt} className={className} style={style} />
      <div
        className="editable-image-overlay"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); inputRef.current?.click(); }}
      >
        {uploading ? (
          <span>Wgrywam...</span>
        ) : (
          <span>📷 Zmień zdjęcie</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}

/* ── Editable List (motorcycle cards, services, etc.) ── */
interface EditableListItem {
  [key: string]: unknown;
}

interface EditableListProps<T extends EditableListItem> {
  id: string;
  defaultItems: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEditor?: (item: T, index: number, onChange: (field: string, value: unknown) => void) => React.ReactNode;
  className?: string;
  itemLabel?: string;
}

export function EditableList<T extends EditableListItem>({
  id,
  defaultItems,
  renderItem,
  renderEditor,
  className,
  itemLabel = "element",
}: EditableListProps<T>) {
  const { editMode, content, updateContent } = useAdmin();
  const stored = getVal(content, id);
  const items: T[] = Array.isArray(stored) ? (stored as T[]) : defaultItems;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updateItem = useCallback(
    (index: number, field: string, value: unknown) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      updateContent(id, newItems);
    },
    [id, items, updateContent]
  );

  const addItem = useCallback(() => {
    const newItems = [...items, { ...defaultItems[0] } as T];
    updateContent(id, newItems);
    setEditingIndex(newItems.length - 1);
  }, [id, items, defaultItems, updateContent]);

  const removeItem = useCallback(
    (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      updateContent(id, newItems);
      setEditingIndex(null);
    },
    [id, items, updateContent]
  );

  if (!editMode) {
    return (
      <div className={className}>
        {items.map((item, i) => (
          <div key={i}>{renderItem(item, i)}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div key={i} className="editable-list-item">
          {renderItem(item, i)}
          <div className="editable-list-actions">
            {renderEditor && (
              <button
                className="admin-btn-sm"
                onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              >
                ✏️
              </button>
            )}
            <button className="admin-btn-sm admin-btn-danger" onClick={() => removeItem(i)}>
              🗑️
            </button>
          </div>
          {renderEditor && editingIndex === i && (
            <div className="editable-list-editor">
              {renderEditor(item, i, (field, value) => updateItem(i, field, value))}
              <button
                className="btn btn-primary"
                style={{ marginTop: 12, padding: "8px 16px", fontSize: ".85rem" }}
                onClick={() => setEditingIndex(null)}
              >
                Gotowe
              </button>
            </div>
          )}
        </div>
      ))}
      <button className="admin-add-btn" onClick={addItem}>
        + Dodaj {itemLabel}
      </button>
    </div>
  );
}

/* ── Helper ── */
function getVal(content: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, content);
}
