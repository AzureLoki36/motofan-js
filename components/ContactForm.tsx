"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const { t } = useLocale();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await res.json();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-wrap">
      <h3>{t("form.title")}</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fname">{t("form.name")}</label>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder={t("form.name.ph")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="femail">{t("form.email")}</label>
            <input
              type="email"
              id="femail"
              name="email"
              placeholder={t("form.email.ph")}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fsubject">{t("form.subject")}</label>
          <select id="fsubject" name="subject">
            <option value="">{t("form.subject.default")}</option>
            <option>{t("form.subject.service")}</option>
            <option>{t("form.subject.kawasaki")}</option>
            <option>{t("form.subject.benelli")}</option>
            <option>{t("form.subject.kymco")}</option>
            <option>{t("form.subject.clothes")}</option>
            <option>{t("form.subject.transport")}</option>
            <option>{t("form.subject.other")}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fmessage">{t("form.message")}</label>
          <textarea
            id="fmessage"
            name="message"
            rows={5}
            placeholder={t("form.message.ph")}
            required
          ></textarea>
        </div>
        {status !== "sent" && (
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? t("form.sending") : status === "error" ? t("form.error") : t("form.submit")}
          </button>
        )}
        {status === "sent" && (
          <div className="form-success" style={{ display: "block" }}>
            {t("form.success")}
          </div>
        )}
      </form>
    </div>
  );
}
