import type { Locale } from "./i18n";

type Dict = Record<string, string>;

export const translations: Record<Locale, Dict> = {
  /* ─── Polski (domyślny) ─── */
  pl: {
    // Navbar
    "nav.start": "Start",
    "nav.about": "O nas",
    "nav.brands": "Marki",
    "nav.services": "Usługi",
    "nav.news": "Aktualności",
    "nav.contact": "Kontakt",

    // Contact form
    "form.title": "Wyślij nam wiadomość",
    "form.name": "Imię i nazwisko",
    "form.name.ph": "Jan Kowalski",
    "form.email": "E-mail",
    "form.email.ph": "jan@example.pl",
    "form.subject": "Temat",
    "form.subject.default": "Wybierz temat...",
    "form.subject.service": "Serwis motocyklowy",
    "form.subject.kawasaki": "Kawasaki – zapytanie o model",
    "form.subject.benelli": "Benelli – zapytanie o model",
    "form.subject.kymco": "Kymco – zapytanie o model",
    "form.subject.clothes": "Odzież i akcesoria",
    "form.subject.transport": "Transport / przyczepa",
    "form.subject.other": "Inne",
    "form.message": "Wiadomość",
    "form.message.ph": "Opisz czego potrzebujesz...",
    "form.sending": "Wysyłanie...",
    "form.error": "Wystąpił błąd, spróbuj ponownie",
    "form.submit": "Wyślij wiadomość",
    "form.success": "✅ Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.",

    // Cookie banner
    "cookie.title": "Ta strona używa plików cookies 🍪",
    "cookie.text":
      "Korzystamy z plików cookies, aby zapewnić najlepsze doświadczenia, analizować ruch na stronie i ułatwić działanie funkcji społecznościowych (np. wtyczka Facebook). Pozostając na stronie akceptujesz ich użycie.",
    "cookie.accept": "Akceptuję i zamykam",

    // Admin toolbar
    "admin.badge": "🔧 Admin",
    "admin.editOn": "✏️ Edycja ON",
    "admin.preview": "👁️ Podgląd",
    "admin.save": "💾 Zapisz",
    "admin.saving": "Zapisuję...",
    "admin.discard": "↩️ Cofnij",
    "admin.logout": "🚪 Wyloguj",

    // Editable UI
    "edit.uploading": "Wgrywam...",
    "edit.changeImage": "📷 Zmień zdjęcie",
    "edit.done": "Gotowe",
    "edit.add": "Dodaj",

    // Footer links
    "footer.service": "Serwis motocyklowy",
    "footer.shop": "Sklep z odzieżą",
    "footer.parts": "Sprzedaż części",
    "footer.newBikes": "Motocykle nowe",
    "footer.usedBikes": "Motocykle używane",
    "footer.transport": "Transport i wynajem przyczepy",
    "footer.contact": "Kontakt",
  },

  /* ─── English ─── */
  en: {
    "nav.start": "Home",
    "nav.about": "About",
    "nav.brands": "Brands",
    "nav.services": "Services",
    "nav.news": "News",
    "nav.contact": "Contact",

    "form.title": "Send us a message",
    "form.name": "Full name",
    "form.name.ph": "John Smith",
    "form.email": "Email",
    "form.email.ph": "john@example.com",
    "form.subject": "Subject",
    "form.subject.default": "Choose a subject...",
    "form.subject.service": "Motorcycle service",
    "form.subject.kawasaki": "Kawasaki – model inquiry",
    "form.subject.benelli": "Benelli – model inquiry",
    "form.subject.kymco": "Kymco – model inquiry",
    "form.subject.clothes": "Clothing & accessories",
    "form.subject.transport": "Transport / trailer",
    "form.subject.other": "Other",
    "form.message": "Message",
    "form.message.ph": "Describe what you need...",
    "form.sending": "Sending...",
    "form.error": "An error occurred, please try again",
    "form.submit": "Send message",
    "form.success": "✅ Thank you! Your message has been sent. We will be in touch soon.",

    "cookie.title": "This website uses cookies 🍪",
    "cookie.text":
      "We use cookies to ensure the best experience, analyze site traffic and support social features (e.g. Facebook plugin). By staying on the site you accept their use.",
    "cookie.accept": "Accept and close",

    "admin.badge": "🔧 Admin",
    "admin.editOn": "✏️ Edit ON",
    "admin.preview": "👁️ Preview",
    "admin.save": "💾 Save",
    "admin.saving": "Saving...",
    "admin.discard": "↩️ Undo",
    "admin.logout": "🚪 Logout",

    "edit.uploading": "Uploading...",
    "edit.changeImage": "📷 Change image",
    "edit.done": "Done",
    "edit.add": "Add",

    "footer.service": "Motorcycle service",
    "footer.shop": "Clothing shop",
    "footer.parts": "Parts sales",
    "footer.newBikes": "New motorcycles",
    "footer.usedBikes": "Used motorcycles",
    "footer.transport": "Transport & trailer rental",
    "footer.contact": "Contact",
  },

  /* ─── Українська ─── */
  uk: {
    "nav.start": "Головна",
    "nav.about": "Про нас",
    "nav.brands": "Бренди",
    "nav.services": "Послуги",
    "nav.news": "Новини",
    "nav.contact": "Контакти",

    "form.title": "Надішліть нам повідомлення",
    "form.name": "Ім\u2019я та прізвище",
    "form.name.ph": "Іван Петренко",
    "form.email": "Ел. пошта",
    "form.email.ph": "ivan@example.com",
    "form.subject": "Тема",
    "form.subject.default": "Оберіть тему...",
    "form.subject.service": "Сервіс мотоциклів",
    "form.subject.kawasaki": "Kawasaki – запит про модель",
    "form.subject.benelli": "Benelli – запит про модель",
    "form.subject.kymco": "Kymco – запит про модель",
    "form.subject.clothes": "Одяг та аксесуари",
    "form.subject.transport": "Транспорт / причіп",
    "form.subject.other": "Інше",
    "form.message": "Повідомлення",
    "form.message.ph": "Опишіть, що вам потрібно...",
    "form.sending": "Надсилання...",
    "form.error": "Сталася помилка, спробуйте ще раз",
    "form.submit": "Надіслати повідомлення",
    "form.success": "✅ Дякуємо! Ваше повідомлення надіслано. Ми зв\u2019яжемося з вами найближчим часом.",

    "cookie.title": "Цей сайт використовує файли cookies 🍪",
    "cookie.text":
      "Ми використовуємо файли cookies для забезпечення найкращого досвіду, аналізу трафіку та підтримки соціальних функцій (напр. плагін Facebook). Залишаючись на сайті, ви приймаєте їх використання.",
    "cookie.accept": "Приймаю і закриваю",

    "admin.badge": "🔧 Адмін",
    "admin.editOn": "✏️ Редагування ВКЛ",
    "admin.preview": "👁️ Перегляд",
    "admin.save": "💾 Зберегти",
    "admin.saving": "Зберігаю...",
    "admin.discard": "↩️ Скасувати",
    "admin.logout": "🚪 Вийти",

    "edit.uploading": "Завантаження...",
    "edit.changeImage": "📷 Змінити фото",
    "edit.done": "Готово",
    "edit.add": "Додати",

    "footer.service": "Сервіс мотоциклів",
    "footer.shop": "Магазин одягу",
    "footer.parts": "Продаж запчастин",
    "footer.newBikes": "Нові мотоцикли",
    "footer.usedBikes": "Вживані мотоцикли",
    "footer.transport": "Транспорт та оренда причепа",
    "footer.contact": "Контакти",
  },
};
