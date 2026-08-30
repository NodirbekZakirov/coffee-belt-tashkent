import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const fontSerif = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
});

const fontSans = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Coffee Belt — Спешелти Кофе & Бабл-Ти в Ташкенте (Oybek)',
  description: 'Кофейня The Coffee Belt в Ташкенте (ул. Ойбек 12). Спешелти кофе 100% арабика, авторский бабл-ти, фисташковые эклеры, настольные игры и уединенная атмосфера для работы.',
  keywords: [
    'кофейня Ташкент',
    'specialty coffee Tashkent',
    'The Coffee Belt',
    'бабл ти Ташкент',
    'кофейня Ойбек',
    'коворкинг кофейня Ташкент',
    'настольные игры кофейня',
  ],
  authors: [{ name: 'The Coffee Belt' }],
  openGraph: {
    title: 'The Coffee Belt — Specialty Coffee & Bubble Tea Tashkent',
    description: 'Спешелти кофе, корейский минимализм, настольные игры и живая зелень возле метро Oybek.',
    url: 'https://thecoffeebelt.uz',
    siteName: 'The Coffee Belt',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'The Coffee Belt Tashkent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Coffee Belt — Specialty Coffee & Bubble Tea Tashkent',
    description: 'Уютная кофейня в центре Ташкента с настольными играми и спешелти кофе.',
  },
};

// JSON-LD Structured Data for LocalBusiness / CafeOrCoffeeShop
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'The Coffee Belt',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
  '@id': 'https://thecoffeebelt.uz/#cafe',
  url: 'https://thecoffeebelt.uz',
  telephone: '+998771124054',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Oybek ko\'chasi 12',
    addressLocality: 'Tashkent',
    postalCode: '100101',
    addressCountry: 'UZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2974418,
    longitude: 69.2740486,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '07:30',
    closes: '22:00',
  },
  sameAs: ['https://instagram.com/thecoffeebelt_uz'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${fontSerif.variable} ${fontSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream-50 text-espresso-900 selection:bg-terracotta-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
