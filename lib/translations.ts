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

    // Breadcrumbs
    "bc.home": "Strona główna",
    "bc.services": "Usługi",
    "bc.about": "O nas",
    "bc.serwis": "Serwis motocyklowy",
    "bc.czesci": "Sprzedaż części",
    "bc.sklep": "Sklep z odzieżą i akcesoriami",
    "bc.transport": "Transport i wynajem przyczepy",
    "bc.historia": "Historia",
    "bc.nowe": "Motocykle nowe",
    "bc.uzywane": "Motocykle używane",

    // Section tags
    "tag.about": "O nas",
    "tag.brands": "Autoryzacje",
    "tag.offer": "Oferta",
    "tag.contact": "Dojazd i kontakt",

    // Hero buttons
    "hero.brands": "Poznaj nasze marki",
    "hero.contact": "Kontakt z nami",
    "hero.history": "Historia firmy",

    // Brand links
    "brand.link.kawasaki": "Oficjalna strona Kawasaki →",
    "brand.link.benelli": "Oficjalna strona Benelli Polska →",
    "brand.link.kymco": "Oficjalna strona Kymco Polska →",
    "brand.featured": "⭐ Polecana",

    // Spec labels
    "spec.year": "Rok",
    "spec.mileage": "Przebieg",
    "spec.displacement": "Pojemność",
    "spec.power": "Moc",

    // Badges
    "badge.new": "Nowy",
    "badge.available": "Dostępny",
    "badge.reserved": "Rezerwacja",

    // Buttons
    "btn.contactForm": "Formularz kontaktowy",
    "btn.contactDetails": "Zobacz dane kontaktowe",

    // Sklep banner categories
    "cat.sportHelmets": "Kaski sportowe",
    "cat.jackets": "Kurtki motocyklowe",
    "cat.touringHelmets": "Kaski turystyczne",
    "cat.oils": "Oleje silnikowe",
    "cat.boots": "Buty motocyklowe",
    "cat.fullface": "Kaski fullface",
    "cat.protectors": "Ochraniacze D3O",
    "cat.flipHelmets": "Kaski szczękowe",
    "cat.gloves": "Rękawice",
    "cat.pants": "Spodnie",

    // Filters
    "filter.brand": "Marka",
    "filter.category": "Kategoria",
    "filter.yearFrom": "Rok od",
    "filter.yearTo": "Rok do",
    "filter.priceFrom": "Cena od",
    "filter.priceTo": "Cena do",
    "filter.displacementFrom": "Poj. od (cm³)",
    "filter.displacementTo": "Poj. do (cm³)",
    "filter.powerFrom": "Moc od (KM)",
    "filter.powerTo": "Moc do (KM)",
    "filter.clear": "Wyczyść filtry",
    "filter.results": "Znaleziono",
    "filter.noResults": "Brak motocykli spełniających kryteria",
    "moto.askAbout": "Zapytaj o ten motocykl",
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

    "bc.home": "Home",
    "bc.services": "Services",
    "bc.about": "About",
    "bc.serwis": "Motorcycle service",
    "bc.czesci": "Parts sales",
    "bc.sklep": "Clothing & accessories shop",
    "bc.transport": "Transport & trailer rental",
    "bc.historia": "History",
    "bc.nowe": "New motorcycles",
    "bc.uzywane": "Used motorcycles",

    "tag.about": "About us",
    "tag.brands": "Authorizations",
    "tag.offer": "Offer",
    "tag.contact": "Directions & contact",

    "hero.brands": "Discover our brands",
    "hero.contact": "Contact us",
    "hero.history": "Company history",

    "brand.link.kawasaki": "Official Kawasaki website →",
    "brand.link.benelli": "Official Benelli Poland website →",
    "brand.link.kymco": "Official Kymco Poland website →",
    "brand.featured": "⭐ Recommended",

    "spec.year": "Year",
    "spec.mileage": "Mileage",
    "spec.displacement": "Displacement",
    "spec.power": "Power",

    "badge.new": "New",
    "badge.available": "Available",
    "badge.reserved": "Reserved",

    "btn.contactForm": "Contact form",
    "btn.contactDetails": "See contact details",

    "cat.sportHelmets": "Sport helmets",
    "cat.jackets": "Motorcycle jackets",
    "cat.touringHelmets": "Touring helmets",
    "cat.oils": "Engine oils",
    "cat.boots": "Motorcycle boots",
    "cat.fullface": "Full-face helmets",
    "cat.protectors": "D3O protectors",
    "cat.flipHelmets": "Flip-up helmets",
    "cat.gloves": "Gloves",
    "cat.pants": "Pants",

    // Filters
    "filter.brand": "Brand",
    "filter.category": "Category",
    "filter.yearFrom": "Year from",
    "filter.yearTo": "Year to",
    "filter.priceFrom": "Price from",
    "filter.priceTo": "Price to",
    "filter.displacementFrom": "Displ. from (cm³)",
    "filter.displacementTo": "Displ. to (cm³)",
    "filter.powerFrom": "Power from (HP)",
    "filter.powerTo": "Power to (HP)",
    "filter.clear": "Clear filters",
    "filter.results": "Found",
    "filter.noResults": "No motorcycles match your criteria",
    "moto.askAbout": "Ask about this motorcycle",
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

    "bc.home": "Головна",
    "bc.services": "Послуги",
    "bc.about": "Про нас",
    "bc.serwis": "Сервіс мотоциклів",
    "bc.czesci": "Продаж запчастин",
    "bc.sklep": "Магазин одягу та аксесуарів",
    "bc.transport": "Транспорт та оренда причепа",
    "bc.historia": "Історія",
    "bc.nowe": "Нові мотоцикли",
    "bc.uzywane": "Вживані мотоцикли",

    "tag.about": "Про нас",
    "tag.brands": "Авторизації",
    "tag.offer": "Пропозиція",
    "tag.contact": "Як дістатися та контакти",

    "hero.brands": "Дізнатися про наші бренди",
    "hero.contact": "Зв\u2019язатися з нами",
    "hero.history": "Історія компанії",

    "brand.link.kawasaki": "Офіційний сайт Kawasaki →",
    "brand.link.benelli": "Офіційний сайт Benelli Polska →",
    "brand.link.kymco": "Офіційний сайт Kymco Polska →",
    "brand.featured": "⭐ Рекомендовано",

    "spec.year": "Рік",
    "spec.mileage": "Пробіг",
    "spec.displacement": "Об\u2019єм",
    "spec.power": "Потужність",

    "badge.new": "Новий",
    "badge.available": "В наявності",
    "badge.reserved": "Резервація",

    "btn.contactForm": "Контактна форма",
    "btn.contactDetails": "Дивитися контактні дані",

    "cat.sportHelmets": "Спортивні шоломи",
    "cat.jackets": "Мотоциклетні куртки",
    "cat.touringHelmets": "Туристичні шоломи",
    "cat.oils": "Моторні масла",
    "cat.boots": "Мотоциклетне взуття",
    "cat.fullface": "Шоломи інтеграл",
    "cat.protectors": "Протектори D3O",
    "cat.flipHelmets": "Модульні шоломи",
    "cat.gloves": "Рукавиці",
    "cat.pants": "Штани",

    // Filters
    "filter.brand": "Марка",
    "filter.category": "Категорія",
    "filter.yearFrom": "Рік від",
    "filter.yearTo": "Рік до",
    "filter.priceFrom": "Ціна від",
    "filter.priceTo": "Ціна до",
    "filter.displacementFrom": "Об'єм від (см³)",
    "filter.displacementTo": "Об'єм до (см³)",
    "filter.powerFrom": "Пот. від (к.с.)",
    "filter.powerTo": "Пот. до (к.с.)",
    "filter.clear": "Очистити фільтри",
    "filter.results": "Знайдено",
    "filter.noResults": "Немає мотоциклів за вашими критеріями",
    "moto.askAbout": "Запитати про цей мотоцикл",
  },
};
