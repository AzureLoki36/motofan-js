"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

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
      <h3>Wyślij nam wiadomość</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fname">Imię i nazwisko</label>
            <input
              type="text"
              id="fname"
              name="name"
              placeholder="Jan Kowalski"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="femail">E-mail</label>
            <input
              type="email"
              id="femail"
              name="email"
              placeholder="jan@example.pl"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fsubject">Temat</label>
          <select id="fsubject" name="subject">
            <option value="">Wybierz temat...</option>
            <option>Serwis motocyklowy</option>
            <option>Kawasaki – zapytanie o model</option>
            <option>Benelli – zapytanie o model</option>
            <option>Kymco – zapytanie o model</option>
            <option>Odzież i akcesoria</option>
            <option>Transport / przyczepa</option>
            <option>Inne</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fmessage">Wiadomość</label>
          <textarea
            id="fmessage"
            name="message"
            rows={5}
            placeholder="Opisz czego potrzebujesz..."
            required
          ></textarea>
        </div>
        {status !== "sent" && (
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Wysyłanie..." : status === "error" ? "Wystąpił błąd, spróbuj ponownie" : "Wyślij wiadomość"}
          </button>
        )}
        {status === "sent" && (
          <div className="form-success" style={{ display: "block" }}>
            ✅ Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się
            wkrótce.
          </div>
        )}
      </form>
    </div>
  );
}
