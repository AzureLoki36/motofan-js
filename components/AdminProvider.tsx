"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useLocale } from "./LocaleProvider";

type ContentData = Record<string, unknown>;

interface AdminContextType {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  content: ContentData;
  updateContent: (path: string, value: unknown) => void;
  hasChanges: boolean;
  saveContent: () => Promise<void>;
  discardChanges: () => void;
  logout: () => Promise<void>;
  saving: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  editMode: false,
  toggleEditMode: () => {},
  content: {},
  updateContent: () => {},
  hasChanges: false,
  saveContent: async () => {},
  discardChanges: () => {},
  logout: async () => {},
  saving: false,
});

export function useAdmin() {
  return useContext(AdminContext);
}

function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: unknown): Record<string, unknown> {
  const keys = keyPath.split(".");
  const result = JSON.parse(JSON.stringify(obj));
  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current) || typeof current[keys[i]] !== "object") {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

export function useContentValue(path: string, defaultValue: string): string {
  const { content } = useAdmin();
  const { locale } = useLocale();
  if (locale !== "pl") {
    const localized = getNestedValue(content, `${locale}.${path}`);
    if (typeof localized === "string" && localized !== "") return localized;
  }
  const val = getNestedValue(content, path);
  return typeof val === "string" ? val : defaultValue;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<ContentData>({});
  const [savedContent, setSavedContent] = useState<ContentData>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/check", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/content", { cache: "no-store" }).then((r) => r.json()),
    ]).then(([auth, data]) => {
      setIsAdmin(auth.admin === true);
      setContent(data || {});
      setSavedContent(data || {});
      setChecked(true);
    });
  }, []);

  const updateContent = useCallback((path: string, value: unknown) => {
    setContent((prev) => {
      const next = setNestedValue(prev, path, value);
      setHasChanges(true);
      return next;
    });
  }, []);

  const saveContent = useCallback(async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSavedContent(content);
    setHasChanges(false);
    setSaving(false);
  }, [content]);

  const discardChanges = useCallback(() => {
    setContent(savedContent);
    setHasChanges(false);
  }, [savedContent]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAdmin(false);
    setEditMode(false);
    window.location.reload();
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  if (!checked) return <>{children}</>;

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        editMode,
        toggleEditMode,
        content,
        updateContent,
        hasChanges,
        saveContent,
        discardChanges,
        logout,
        saving,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
