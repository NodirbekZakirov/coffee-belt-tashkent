export type Language = 'ru' | 'uz' | 'en';

export interface Translations {
  nav: {
    about: string;
    menu: string;
    gallery: string;
    games: string;
    location: string;
    reserve: string;
    signIn: string;
    signOut: string;
    adminPanel: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    viewMenu: string;
    getDirections: string;
    hours: string;
    wifi: string;
    rating: string;
  };
  about: {
    badge: string;
    title: string;
    desc1: string;
    desc2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  menu: {
    previewBadge: string;
    previewTitle: string;
    allMenuTitle: string;
    allMenuSub: string;
    searchPlaceholder: string;
    allCategories: string;
    viewFullMenu: string;
    priceFormat: (price: number) => string;
    available: string;
    soldOut: string;
  };
  gallery: {
    badge: string;
    title: string;
    sub: string;
  };
  reservation: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    guestsLabel: string;
    dateLabel: string;
    timeLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    errorText: string;
    loginToBookTitle: string;
    loginToBookDesc: string;
    signInWithGoogle: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    addReviewTitle: string;
    ratingLabel: string;
    commentPlaceholder: string;
    submitReview: string;
    submitting: string;
    mustLoginText: string;
    noReviewsYet: string;
  };
  location: {
    badge: string;
    title: string;
    addressLabel: string;
    addressValue: string;
    hoursLabel: string;
    hoursValue: string;
    phoneLabel: string;
    chatTitle: string;
    whatsapp: string;
    telegram: string;
    instagram: string;
    openInMaps: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    success: string;
  };
  footer: {
    copyright: string;
    reviewGoogle: string;
    privacy: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      about: 'О нас',
      menu: 'Меню',
      gallery: 'Галерея',
      games: 'Игры & Бронь',
      location: 'Контакты',
      reserve: 'Забронировать',
      signIn: 'Войти',
      signOut: 'Выйти',
      adminPanel: 'Админ-панель',
    },
    hero: {
      tagline: 'Спешелти кофе & Корейский минимализм в Ташкенте',
      headline: 'Пространство вдохновения, вкуса и уютных встреч',
      subheadline: 'Свежеобжаренный кофе, авторский бабл-ти, домашние десерты и душевные настольные игры возле метро Oybek.',
      viewMenu: 'Смотреть меню',
      getDirections: 'Проложить маршрут',
      hours: '07:30 – 22:00 ежедневно',
      wifi: 'Wi-Fi для работы',
      rating: 'Рейтинг гостей',
    },
    about: {
      badge: 'Атмосфера The Coffee Belt',
      title: 'Больше, чем просто кофейня',
      desc1: 'Мы создали светлое, просторное пространство в эстетике современных корейских кофеен, где много живых растений и тепла.',
      desc2: 'Здесь приятно начать утро с капли эспрессо, поработать за ноутбуком в тишине или провести вечер с друзьями за настольными играми.',
      feature1Title: 'Спешелти Кофе',
      feature1Desc: '100% арабика спешелти обжарки, идеальные пропорции и овсяное молоко на выбор.',
      feature2Title: 'Настольные Игры',
      feature2Desc: 'Большая коллекция настолок для компаний любого размера абсолютно бесплатно.',
      feature3Title: 'Комфорт для Работы',
      feature3Desc: 'Быстрый Wi-Fi, удобные диваны и розетки у каждого столика.',
    },
    menu: {
      previewBadge: 'Избранные Позиции',
      previewTitle: 'Хиты нашего меню',
      allMenuTitle: 'Полное Меню The Coffee Belt',
      allMenuSub: 'Выбирайте любимые классические и авторские напитки, бабл-ти и свежие десерты',
      searchPlaceholder: 'Поиск по названию...',
      allCategories: 'Все категории',
      viewFullMenu: 'Посмотреть всё меню',
      priceFormat: (price) => `${price.toLocaleString('ru-RU')} сум`,
      available: 'В наличии',
      soldOut: 'Временно нет',
    },
    gallery: {
      badge: 'Интерьер & Детали',
      title: 'Вайб The Coffee Belt',
      sub: 'Уютные уголки, зелень и эстетика каждой чашки',
    },
    reservation: {
      badge: 'Забронировать Стол',
      title: 'Забронируйте столик для работы или игр',
      subtitle: 'Авторизуйтесь через Google, чтобы мгновенно забронировать столик.',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Алишер',
      phoneLabel: 'Номер телефона',
      phonePlaceholder: '+998 90 123 45 67',
      guestsLabel: 'Количество гостей',
      dateLabel: 'Дата',
      timeLabel: 'Время',
      noteLabel: 'Пожелания (необязательно)',
      notePlaceholder: 'Хотим стол с настольными играми / возле окна / нужна розетка...',
      submitButton: 'Отправить заявку на бронь',
      submitting: 'Отправка заявки...',
      successTitle: 'Бронь успешно отправлена!',
      successDesc: 'Мы свяжемся с вами в течение 10 минут для подтверждения.',
      errorText: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам.',
      loginToBookTitle: 'Авторизуйтесь для бронирования',
      loginToBookDesc: 'Войдите через ваш аккаунт Google, чтобы забронировать стол.',
      signInWithGoogle: 'Войти через Google',
    },
    reviews: {
      title: 'Отзывы наших гостей',
      subtitle: 'Реальные впечатления посетителей кофейни The Coffee Belt',
      addReviewTitle: 'Оставить отзыв',
      ratingLabel: 'Ваша оценка',
      commentPlaceholder: 'Поделитесь вашими впечатлениями о кофе, десертах и атмосфере...',
      submitReview: 'Опубликовать отзыв',
      submitting: 'Публикация...',
      mustLoginText: 'Войдите через Google, чтобы оставить свой отзыв.',
      noReviewsYet: 'Пока нет отзывов. Будьте первым, кто оставит впечатление!',
    },
    location: {
      badge: 'Где мы находимся',
      title: 'Ждём вас в гости каждый день',
      addressLabel: 'Адрес',
      addressValue: 'Ташкент, ул. Ойбек 12 (м. Oybek)',
      hoursLabel: 'Часы работы',
      hoursValue: 'Ежедневно с 07:30 до 22:00',
      phoneLabel: 'Телефон',
      chatTitle: 'Быстрая связь в мессенджерах',
      whatsapp: 'Написать в WhatsApp',
      telegram: 'Написать в Telegram',
      instagram: 'Наш Instagram',
      openInMaps: 'Открыть в Google Картах',
    },
    newsletter: {
      title: 'Будьте в курсе новинок и акций',
      subtitle: 'Подпишитесь на новости The Coffee Belt и получайте спецпредложения первыми',
      placeholder: 'Введите ваш e-mail',
      button: 'Подписаться',
      success: 'Спасибо! Вы успешно подписаны.',
    },
    footer: {
      copyright: '© 2026 The Coffee Belt (Tashkent). Все права защищены.',
      reviewGoogle: 'Оставить отзыв в Google',
      privacy: 'Политика конфиденциальности',
    },
  },
  uz: {
    nav: {
      about: 'Biz haqimizda',
      menu: 'Menyu',
      gallery: 'Galereya',
      games: 'O‘yinlar & Band qilish',
      location: 'Kontaktlar',
      reserve: 'Joy band qilish',
      signIn: 'Kirish',
      signOut: 'Chiqish',
      adminPanel: 'Admin paneli',
    },
    hero: {
      tagline: 'Toshkentda Specialty kofe & Koreys minimalizmi',
      headline: 'Ilhom, mazza va shinam uchrashuvlar makoni',
      subheadline: 'Yangi qovurilgan kofe, mualliflik babl-ti, uy shirinliklari va Oybek metrosi yaqinida qiziqarli stol o‘yinlari.',
      viewMenu: 'Menyuni ko‘rish',
      getDirections: 'Xaritada ochish',
      hours: 'Har kuni 07:30 – 22:00',
      wifi: 'Ishlash uchun Wi-Fi',
      rating: 'Mehmonlar bahosi',
    },
    about: {
      badge: 'The Coffee Belt muhiti',
      title: 'Oddiy kofexonadan ko‘ra ko‘proq',
      desc1: 'Biz zamonaviy Koreya kofexonalari uslubida jonli o‘simliklar va issiq muhitga ega keng va yorug‘ makon yaratdik.',
      desc2: 'Bu yerda ertalabni espresso bilan boshlash, noutbukda tinchgina ishlash yoki do‘stlar bilan stol o‘yinlari o‘ynash juda yoqimli.',
      feature1Title: 'Specialty Kofe',
      feature1Desc: '100% arabika specialty qovurish, mukammal nisbatlar va suli suti variantlari.',
      feature2Title: 'Stol O‘yinlari',
      feature2Desc: 'Katta va kichik kompaniyalar uchun bepul stol o‘yinlari to‘plami.',
      feature3Title: 'Ishlash uchun qulaylik',
      feature3Desc: 'Tezkor Wi-Fi, qulay divanlar va har bir stol yaqinida rozetkalar.',
    },
    menu: {
      previewBadge: 'Tanlangan Ichimliklar',
      previewTitle: 'Menyumiz hitlari',
      allMenuTitle: 'The Coffee Belt To‘liq Menyusi',
      allMenuSub: 'Klassik va mualliflik ichimliklari, babl-ti va yangi shirinliklardan bahramand bo‘ling',
      searchPlaceholder: 'Nomi bo‘yicha qidiruv...',
      allCategories: 'Barcha kategoriyalar',
      viewFullMenu: 'To‘liq menyuni ko‘rish',
      priceFormat: (price) => `${price.toLocaleString('ru-RU')} so‘m`,
      available: 'Mavjud',
      soldOut: 'Vaqtincha yo‘q',
    },
    gallery: {
      badge: 'Interyer & Tafsilotlar',
      title: 'The Coffee Belt kayfiyati',
      sub: 'Shinam burchaklar, yashillik va har bir finjon estetikasi',
    },
    reservation: {
      badge: 'Joy Band Qilish',
      title: 'Ishlash yoki o‘yinlar uchun stol band qiling',
      subtitle: 'Joy band qilish uchun Google orqali kiring.',
      nameLabel: 'Ismingiz',
      namePlaceholder: 'Alisher',
      phoneLabel: 'Telefon raqamingiz',
      phonePlaceholder: '+998 90 123 45 67',
      guestsLabel: 'Mehmonlar soni',
      dateLabel: 'Sana',
      timeLabel: 'Vaqt',
      noteLabel: 'Istaklar (ixtiyoriy)',
      notePlaceholder: 'Stol o‘yinlari bor joy / deraza yonida / rozetka kerak...',
      submitButton: 'Bort so‘rovini yuborish',
      submitting: 'Yuborilmoqda...',
      successTitle: 'Joy muvaffaqiyatli band qilindi!',
      successDesc: 'Tasdiqlash uchun 10 daqiqa ichida siz bilan bog‘lanamiz.',
      errorText: 'Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring yoki telefon qiling.',
      loginToBookTitle: 'Band qilish uchun tizimga kiring',
      loginToBookDesc: 'Stol band qilish uchun Google hisobingiz orqali kiring.',
      signInWithGoogle: 'Google orqali kirish',
    },
    reviews: {
      title: 'Mehmonlarimiz sharhlari',
      subtitle: 'The Coffee Belt kofexonasining haqiqiy mehmonlari taassurotlari',
      addReviewTitle: 'Sharh qoldirish',
      ratingLabel: 'Sizning bahoingiz',
      commentPlaceholder: 'Kofe, shirinliklar va muhit haqidagi taassurotlaringiz bilan o‘rtoqlashing...',
      submitReview: 'Sharhni chop etish',
      submitting: 'Chop etilmoqda...',
      mustLoginText: 'Sharh qoldirish uchun Google orqali kiring.',
      noReviewsYet: 'Hali sharhlar yo‘q. Birinchi bo‘lib taassurot qoldiring!',
    },
    location: {
      badge: 'Joylashuvimiz',
      title: 'Har kuni sizni kutib qolamiz',
      addressLabel: 'Manzil',
      addressValue: 'Toshkent, Oybek ko‘chasi 12 (m. Oybek)',
      hoursLabel: 'Ish vaqti',
      hoursValue: 'Har kuni 07:30 dan 22:00 gacha',
      phoneLabel: 'Telefon',
      chatTitle: 'Messenjerlarda tezkor aloqa',
      whatsapp: 'WhatsApp da yozish',
      telegram: 'Telegram da yozish',
      instagram: 'Bizning Instagram',
      openInMaps: 'Google Maps da ochish',
    },
    newsletter: {
      title: 'Yangi mahsulotlar va takliflardan xabardor bo‘ling',
      subtitle: 'The Coffee Belt yangiliklariga obuna bo‘ling va birinchilardan bo‘lib chegirmalar oling',
      placeholder: 'E-mail manzilingizni kiriting',
      button: 'Obuna bo‘lish',
      success: 'Rahmat! Obuna muvaffaqiyatli amalga oshirildi.',
    },
    footer: {
      copyright: '© 2026 The Coffee Belt (Tashkent). Barcha huquqlar himoyalangan.',
      reviewGoogle: 'Google da fikr qoldirish',
      privacy: 'Maxfiylik siyosati',
    },
  },
  en: {
    nav: {
      about: 'About Us',
      menu: 'Menu',
      gallery: 'Gallery',
      games: 'Games & Booking',
      location: 'Location',
      reserve: 'Book a Table',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      adminPanel: 'Admin Panel',
    },
    hero: {
      tagline: 'Specialty Coffee & Korean Minimalism in Tashkent',
      headline: 'A Space for Inspiration, Taste & Warm Encounters',
      subheadline: 'Freshly roasted specialty coffee, signature bubble tea, artisanal pastries & board games near Oybek metro station.',
      viewMenu: 'View Menu',
      getDirections: 'Get Directions',
      hours: '07:30 – 22:00 daily',
      wifi: 'High-speed Wi-Fi',
      rating: 'Guest Rating',
    },
    about: {
      badge: 'The Coffee Belt Vibe',
      title: 'More Than Just a Coffee Shop',
      desc1: 'We created a spacious, sunlit oasis inspired by modern Korean cafe aesthetic with live greenery and organic textures.',
      desc2: 'Perfect to kickstart your morning with an espresso, focus on work in peace, or gather with friends for board games.',
      feature1Title: 'Specialty Coffee',
      feature1Desc: '100% specialty grade Arabica beans, precise extractions & oat milk options.',
      feature2Title: 'Board Games',
      feature2Desc: 'Curated collection of tabletop games for groups of any size, free to play.',
      feature3Title: 'Work-Friendly Space',
      feature3Desc: 'Fast Wi-Fi, comfortable sofas, and power outlets at every table.',
    },
    menu: {
      previewBadge: 'Featured Items',
      previewTitle: 'Customer Favorites',
      allMenuTitle: 'The Coffee Belt Full Menu',
      allMenuSub: 'Explore our coffee classics, refreshing bubble teas, matcha, and freshly baked pastries',
      searchPlaceholder: 'Search by item name...',
      allCategories: 'All Categories',
      viewFullMenu: 'Explore Full Menu',
      priceFormat: (price) => `${price.toLocaleString('en-US')} UZS`,
      available: 'In Stock',
      soldOut: 'Sold Out',
    },
    gallery: {
      badge: 'Interior & Moments',
      title: 'Atmosphere & Details',
      sub: 'Cozy nooks, green plants, and artisanal coffee craftsmanship',
    },
    reservation: {
      badge: 'Table Reservation',
      title: 'Reserve a table for work or board games',
      subtitle: 'Sign in with Google to reserve your table instantly.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Alex',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+998 90 123 45 67',
      guestsLabel: 'Number of Guests',
      dateLabel: 'Date',
      timeLabel: 'Time',
      noteLabel: 'Special Requests (Optional)',
      notePlaceholder: 'Board games table / near window / power socket needed...',
      submitButton: 'Send Reservation Request',
      submitting: 'Submitting...',
      successTitle: 'Reservation Requested!',
      successDesc: 'We will confirm your booking via phone/Telegram within 10 minutes.',
      errorText: 'An error occurred while submitting. Please try again or call us directly.',
      loginToBookTitle: 'Sign In to Reserve',
      loginToBookDesc: 'Sign in with your Google account to book a table.',
      signInWithGoogle: 'Sign In with Google',
    },
    reviews: {
      title: 'Guest Reviews',
      subtitle: 'Real impressions from visitors at The Coffee Belt cafe',
      addReviewTitle: 'Write a Review',
      ratingLabel: 'Your Rating',
      commentPlaceholder: 'Share your thoughts on our coffee, pastries, and vibe...',
      submitReview: 'Post Review',
      submitting: 'Posting...',
      mustLoginText: 'Sign in with Google to leave your review.',
      noReviewsYet: 'No reviews yet. Be the first to share your impression!',
    },
    location: {
      badge: 'Find Us',
      title: 'We look forward to welcoming you daily',
      addressLabel: 'Address',
      addressValue: 'Tashkent, 12 Oybek Street (m. Oybek)',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Daily from 07:30 to 22:00',
      phoneLabel: 'Phone',
      chatTitle: 'Instant Messenger Support',
      whatsapp: 'Chat on WhatsApp',
      telegram: 'Chat on Telegram',
      instagram: 'Follow on Instagram',
      openInMaps: 'Open in Google Maps',
    },
    newsletter: {
      title: 'Stay updated with seasonal brews & perks',
      subtitle: 'Subscribe to The Coffee Belt club for exclusive updates and special offers',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      success: 'Thank you! You have successfully subscribed.',
    },
    footer: {
      copyright: '© 2026 The Coffee Belt (Tashkent). All rights reserved.',
      reviewGoogle: 'Leave a review on Google',
      privacy: 'Privacy Policy',
    },
  },
};

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
  const langLower = browserLang.toLowerCase();
  if (langLower.startsWith('uz')) return 'uz';
  if (langLower.startsWith('en')) return 'en';
  return 'ru';
}
