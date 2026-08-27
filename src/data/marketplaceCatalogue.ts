export interface SystemSubcategory {
  id: string;
  name: string;
  slug: string;
  url: string;
  productCount: number;
}

export interface SystemCategory {
  id: string;
  name: string;
  slug: string;
  url: string;
  icon: string;
  image?: string;
  description?: string;
  productCount: number;
  isFeatured?: boolean;
  popularity?: number;
  status?: 'active' | 'hidden';
  createdAt?: string;
  subcategories: SystemSubcategory[];
}

export interface SystemPage {
  id: string;
  title: string;
  url: string;
  category: 'Informacje' | 'Dla Sprzedawców' | 'Regulaminy & Pomoc';
}

export const SYSTEM_CATEGORIES: SystemCategory[] = [
  {
    id: 'cat_elektronika',
    name: 'Elektronika & IT',
    slug: 'elektronika',
    url: '/kategoria/elektronika',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80',
    description: 'Najnowsze smartfony, komputery, audio hi-fi oraz inteligentne gadżety do domu.',
    productCount: 1420,
    isFeatured: true,
    popularity: 98,
    status: 'active',
    subcategories: [
      { id: 'sub_smartfony', name: 'Smartfony i Akcesoria', slug: 'smartfony', url: '/kategoria/smartfony', productCount: 420 },
      { id: 'sub_laptopy', name: 'Laptopy i Komputery', slug: 'laptopy', url: '/kategoria/laptopy', productCount: 310 },
      { id: 'sub_sluchawki', name: 'Słuchawki & Audio Hi-Fi', slug: 'sluchawki', url: '/kategoria/sluchawki', productCount: 280 },
      { id: 'sub_smartwatche', name: 'Smartwatche i Zegarki', slug: 'smartwatche', url: '/kategoria/smartwatche', productCount: 190 },
      { id: 'sub_gaming', name: 'Strefa Gamingowa', slug: 'gaming', url: '/kategoria/gaming', productCount: 220 }
    ]
  },
  {
    id: 'cat_moda',
    name: 'Moda & Styl',
    slug: 'moda',
    url: '/kategoria/moda',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    description: 'Trendy odzieżowe, obuwie miejskie, torebki oraz ekskluzywne dodatki.',
    productCount: 2150,
    isFeatured: true,
    popularity: 95,
    status: 'active',
    subcategories: [
      { id: 'sub_meska', name: 'Kolekcja Męska', slug: 'odziez-meska', url: '/kategoria/odziez-meska', productCount: 780 },
      { id: 'sub_damska', name: 'Kolekcja Damska', slug: 'odziez-damska', url: '/kategoria/odziez-damska', productCount: 940 },
      { id: 'sub_obuwie', name: 'Obuwie i Sneakersy', slug: 'obuwie', url: '/kategoria/obuwie', productCount: 430 }
    ]
  },
  {
    id: 'cat_dom',
    name: 'Dom & Wnętrze',
    slug: 'dom-ogrod',
    url: '/kategoria/dom-ogrod',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    description: 'Designerskie meble, inteligentne oświetlenie LED, tekstylia i dekoracje.',
    productCount: 1680,
    isFeatured: true,
    popularity: 91,
    status: 'active',
    subcategories: [
      { id: 'sub_meble', name: 'Meble i Wyposażenie', slug: 'meble', url: '/kategoria/meble', productCount: 520 },
      { id: 'sub_oswietlenie', name: 'Oświetlenie Smart LED', slug: 'oswietlenie', url: '/kategoria/oswietlenie', productCount: 380 },
      { id: 'sub_dekoracje', name: 'Tekstylia i Dekoracje', slug: 'dekoracje', url: '/kategoria/dekoracje', productCount: 460 },
      { id: 'sub_ogrod', name: 'Ogród i Narzędzia', slug: 'ogrod', url: '/kategoria/ogrod', productCount: 320 }
    ]
  },
  {
    id: 'cat_uroda',
    name: 'Zdrowie & Uroda',
    slug: 'uroda',
    url: '/kategoria/uroda',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    description: 'Oryginalne perfumy, naturalne kosmetyki do pielęgnacji oraz witaminy.',
    productCount: 920,
    isFeatured: true,
    popularity: 88,
    status: 'active',
    subcategories: [
      { id: 'sub_perfumy', name: 'Perfumy i Zapachy', slug: 'perfumy', url: '/kategoria/perfumy', productCount: 340 },
      { id: 'sub_pielegnacja', name: 'Pielęgnacja Twarzy i Ciała', slug: 'pielegnacja', url: '/kategoria/pielegnacja', productCount: 410 },
      { id: 'sub_suplementy', name: 'Suplementy i Witaminy', slug: 'suplementy', url: '/kategoria/suplementy', productCount: 170 }
    ]
  },
  {
    id: 'cat_sport',
    name: 'Sport & Turystyka',
    slug: 'sport',
    url: '/kategoria/sport',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    description: 'Sprzęt na siłownię, rowery, odzież termoaktywna i akcesoria outdoorowe.',
    productCount: 840,
    isFeatured: true,
    popularity: 85,
    status: 'active',
    subcategories: [
      { id: 'sub_fitness', name: 'Siłownia i Fitness', slug: 'fitness', url: '/kategoria/fitness', productCount: 310 },
      { id: 'sub_rowery', name: 'Rowery i Hulajnogi', slug: 'rowery', url: '/kategoria/rowery', productCount: 260 },
      { id: 'sub_outdoor', name: 'Turystyka i Namioty', slug: 'outdoor', url: '/kategoria/outdoor', productCount: 270 }
    ]
  },
  {
    id: 'cat_motoryzacja',
    name: 'Motoryzacja',
    slug: 'motoryzacja',
    url: '/kategoria/motoryzacja',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&auto=format&fit=crop&q=80',
    description: 'Części samochodowe, elektronika pojazdowa, chemia detailingowa i narzędzia.',
    productCount: 650,
    isFeatured: false,
    popularity: 79,
    status: 'active',
    subcategories: [
      { id: 'sub_akcesoria_auto', name: 'Akcesoria Samochodowe', slug: 'akcesoria-samochodowe', url: '/kategoria/akcesoria-samochodowe', productCount: 380 },
      { id: 'sub_chemia_auto', name: 'Kosmetyki & Chemia', slug: 'chemia-samochodowa', url: '/kategoria/chemia-samochodowa', productCount: 270 }
    ]
  },
  {
    id: 'cat_komputery',
    name: 'Komputery & Gaming',
    slug: 'komputery-gaming',
    url: '/kategoria/komputery-gaming',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    description: 'Karty graficzne, laptopy gamingowe, fotele ergonomiczne i peryferia e-sportowe.',
    productCount: 1120,
    isFeatured: true,
    popularity: 94,
    status: 'active',
    subcategories: [
      { id: 'sub_laptopy_game', name: 'Laptopy Gamingowe', slug: 'laptopy-gamingowe', url: '/kategoria/laptopy-gamingowe', productCount: 340 },
      { id: 'sub_akcesoria_pc', name: 'Klawiatury & Myszy', slug: 'klawiatury-myszy', url: '/kategoria/klawiatury-myszy', productCount: 480 },
      { id: 'sub_monitory', name: 'Monitory 144Hz+', slug: 'monitory', url: '/kategoria/monitory', productCount: 300 }
    ]
  },
  {
    id: 'cat_telefony',
    name: 'Telefony & Zegarki',
    slug: 'telefony-smartwatche',
    url: '/kategoria/telefony-smartwatche',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02597?w=800&auto=format&fit=crop&q=80',
    description: 'Smartfony 5G, smartwatche sportowe, etui ochronne i ładowarki bezprzewodowe.',
    productCount: 780,
    isFeatured: true,
    popularity: 92,
    status: 'active',
    subcategories: [
      { id: 'sub_smartfony_5g', name: 'Smartfony 5G', slug: 'smartfony-5g', url: '/kategoria/smartfony-5g', productCount: 320 },
      { id: 'sub_smartwatch', name: 'Smartwatche', slug: 'smartwatche', url: '/kategoria/smartwatche', productCount: 260 },
      { id: 'sub_powerbanki', name: 'Powerbanki & Kable', slug: 'powerbanki', url: '/kategoria/powerbanki', productCount: 200 }
    ]
  },
  {
    id: 'cat_dziecko',
    name: 'Dziecko & Zabawki',
    slug: 'dziecko',
    url: '/kategoria/dziecko',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
    description: 'Klocki, gry edukacyjne, wózki dziecięce oraz artykuły pielęgnacyjne dla maluchów.',
    productCount: 540,
    isFeatured: false,
    popularity: 76,
    status: 'active',
    subcategories: [
      { id: 'sub_zabawki', name: 'Zabawki Edukacyjne', slug: 'zabawki', url: '/kategoria/zabawki', productCount: 290 },
      { id: 'sub_foteliki', name: 'Wózki i Foteliki', slug: 'wozki-foteliki', url: '/kategoria/wozki-foteliki', productCount: 250 }
    ]
  },
  {
    id: 'cat_ksiazki',
    name: 'Książki & Multimedia',
    slug: 'ksiazki',
    url: '/kategoria/ksiazki',
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80',
    description: 'Bestsellery literackie, e-booki, audiobooki, płyty winylowe oraz filmy.',
    productCount: 1890,
    isFeatured: false,
    popularity: 81,
    status: 'active',
    subcategories: [
      { id: 'sub_bestsellery', name: 'Bestsellery i Nowości', slug: 'bestsellery', url: '/kategoria/bestsellery', productCount: 650 },
      { id: 'sub_audiobooki', name: 'Audiobooki & E-booki', slug: 'audiobooki', url: '/kategoria/audiobooki', productCount: 840 },
      { id: 'sub_plyty', name: 'Winyle i Muzyka', slug: 'winyle', url: '/kategoria/winyle', productCount: 400 }
    ]
  },
  {
    id: 'cat_ogrod',
    name: 'Ogród & Majsterkowanie',
    slug: 'ogrod-narzedzia',
    url: '/kategoria/ogrod-narzedzia',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    description: 'Rośliny ogrodowe, meble tarasowe, kosiarki, elektronarzędzia i grille.',
    productCount: 620,
    isFeatured: false,
    popularity: 74,
    status: 'active',
    subcategories: [
      { id: 'sub_rosliny', name: 'Nasiona i Sadzonki', slug: 'rosliny', url: '/kategoria/rosliny', productCount: 280 },
      { id: 'sub_elektronarzedzia', name: 'Elektronarzędzia Pro', slug: 'narzedzia', url: '/kategoria/narzedzia', productCount: 340 }
    ]
  },
  {
    id: 'cat_sztuka',
    name: 'Sztuka & Rękodzieło',
    slug: 'sztuka-rekodzielo',
    url: '/kategoria/sztuka-rekodzielo',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80',
    description: 'Wyroby artystyczne, ceramika unikatowa, biżuteria handmade i malarstwo.',
    productCount: 380,
    isFeatured: false,
    popularity: 69,
    status: 'active',
    subcategories: [
      { id: 'sub_ceramika', name: 'Ceramika i Szkło', slug: 'ceramika', url: '/kategoria/ceramika', productCount: 190 },
      { id: 'sub_malarstwo', name: 'Obrazy i Grafiki', slug: 'obrazy', url: '/kategoria/obrazy', productCount: 190 }
    ]
  }
];

export const SYSTEM_PAGES: SystemPage[] = [
  { id: 'page_home', title: 'Strona Główna', url: '/', category: 'Informacje' },
  { id: 'page_about', title: 'O platformie MarketPlacePro', url: '/o-nas', category: 'Informacje' },
  { id: 'page_contact', title: 'Kontakt & Pomoc BOK', url: '/kontakt', category: 'Informacje' },
  { id: 'page_delivery', title: 'Dostawa i Płatności', url: '/dostawa', category: 'Informacje' },
  { id: 'page_returns', title: 'Zwroty i Reklamacje 30 dni', url: '/zwroty', category: 'Informacje' },
  { id: 'page_seller', title: 'Zostań Sprzedawcą (Rejestracja)', url: '/sprzedawaj', category: 'Dla Sprzedawców' },
  { id: 'page_b2b', title: 'Strefa Biznesowa B2B', url: '/b2b', category: 'Dla Sprzedawców' },
  { id: 'page_terms', title: 'Regulamin Platformy', url: '/regulamin', category: 'Regulaminy & Pomoc' },
  { id: 'page_privacy', title: 'Polityka Prywatności i RODO', url: '/polityka-prywatnosci', category: 'Regulaminy & Pomoc' }
];

export interface SystemProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'capacity';
  value: string;
  colorHex?: string;
  inStock?: boolean;
}

export interface SystemProduct {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  vendorName: string;
  vendorRating?: number;
  price: number;
  oldPrice?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  badge?: 'NOWOŚĆ' | 'PROMOCJA' | 'BESTSELLER' | 'POLECAY' | 'WYPRZEDAŻ' | 'HIT' | 'EKO' | 'BRAK W MAGAZYNIE' | string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  features: string[];
  variants?: SystemProductVariant[];
  sku?: string;
  isFeatured?: boolean;
  salesCount?: number;
  discountPercent?: number;
  createdAt?: string;
}

export const SYSTEM_PRODUCTS: SystemProduct[] = [
  {
    id: 'prod_1',
    name: 'Smartfon Galaxy Ultra 5G 256GB AI Edition',
    slug: 'smartfon-galaxy-ultra-5g-256gb',
    category: 'Elektronika & IT',
    categorySlug: 'elektronika',
    vendorName: 'ElectroStore PL',
    vendorRating: 4.9,
    price: 3499.00,
    oldPrice: 4299.00,
    discountPercent: 19,
    currency: 'zł',
    rating: 4.9,
    reviewsCount: 148,
    badge: 'HIT -19%',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 34,
    shortDescription: 'Flagowy smartfon z ekranem Dynamic AMOLED 120Hz, aparatem 200MP i procesorem nowej generacji Snapdragon AI.',
    features: ['Ekran 6.8" AMOLED 120Hz', 'Aparat 200 Mpx z Zoomem 100x', 'Bateria 5000 mAh + 45W', 'Wodoszczelność IP68'],
    variants: [
      { id: 'v1', name: 'Czarny Phantom', type: 'color', value: 'Czarny Phantom', colorHex: '#1e293b', inStock: true },
      { id: 'v2', name: 'Tytanowy Srebrny', type: 'color', value: 'Tytanowy Srebrny', colorHex: '#cbd5e1', inStock: true },
      { id: 'v3', name: 'Morski Błękit', type: 'color', value: 'Morski Błękit', colorHex: '#38bdf8', inStock: true }
    ],
    sku: 'GAL-S24U-256',
    isFeatured: true,
    salesCount: 420
  },
  {
    id: 'prod_2',
    name: 'Słuchawki Bezprzewodowe ANC Pro Studio Over-Ear',
    slug: 'sluchawki-bezprzewodowe-anc-pro-studio',
    category: 'Elektronika & IT',
    categorySlug: 'elektronika',
    vendorName: 'AudioMaster Poland',
    vendorRating: 4.8,
    price: 489.00,
    oldPrice: 649.00,
    discountPercent: 25,
    currency: 'zł',
    rating: 4.8,
    reviewsCount: 112,
    badge: 'BESTSELLER',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 82,
    shortDescription: 'Audiofilskie brzmienie z aktywną redukcją hałasu ANC do -40dB, przetwornikami 40mm i czasem pracy do 55h.',
    features: ['Hybrydowe ANC z trybem otoczenia', 'Do 55h na jednym ładowaniu', 'Kodeki LDAC i Hi-Res Audio', 'Ergonomiczne nauszniki z pianki memory'],
    variants: [
      { id: 'v4', name: 'Matowy Grafit', type: 'color', value: 'Matowy Grafit', colorHex: '#334155', inStock: true },
      { id: 'v5', name: 'Kremowa Kość Słoniowa', type: 'color', value: 'Kremowy', colorHex: '#fef3c7', inStock: true }
    ],
    sku: 'AUDIO-ANC-PRO',
    isFeatured: true,
    salesCount: 890
  },
  {
    id: 'prod_3',
    name: 'Klawiatura Mechaniczna RGB Custom Switch Hot-Swap',
    slug: 'klawiatura-mechaniczna-rgb-custom-switch',
    category: 'Elektronika & IT',
    categorySlug: 'komputery-gaming',
    vendorName: 'TechGaming Hub',
    vendorRating: 5.0,
    price: 329.00,
    oldPrice: 429.00,
    discountPercent: 23,
    currency: 'zł',
    rating: 5.0,
    reviewsCount: 230,
    badge: 'POLECANY',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 19,
    shortDescription: 'Turniejowa klawiatura mechaniczna 75% z wymiennymi przełącznikami Hot-Swap, smarowanymi stabilizatorami i RGB.',
    features: ['Układ 75% ze scrollem głośności', 'Gniazda Hot-Swap 5-pin', 'Aluminiowa płyta wzmacniająca', 'Łączność Tri-Mode (2.4GHz/BT/USB)'],
    sku: 'KB-RGB-75PRO',
    isFeatured: true,
    salesCount: 512
  },
  {
    id: 'prod_4',
    name: 'Smartwatch Titan Ultra GPS Dual-Band Sapphire',
    slug: 'smartwatch-titan-ultra-gps-dual-band',
    category: 'Elektronika & IT',
    categorySlug: 'telefony-smartwatche',
    vendorName: 'SmartWear Tech',
    vendorRating: 4.7,
    price: 599.00,
    oldPrice: 799.00,
    discountPercent: 25,
    currency: 'zł',
    rating: 4.7,
    reviewsCount: 89,
    badge: 'NOWOŚĆ',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 45,
    shortDescription: 'Pancerny zegarek sportowy z tytanową kopertą, szafirowym szkłem, mapami offline i pomiarem EKG/SpO2.',
    features: ['Tytanowa koperta grade 5', 'Czas pracy do 14 dni', 'Dwuzakresowy GPS L1+L5', 'Wodoszczelność 10 ATM'],
    sku: 'WATCH-TITAN-U',
    isFeatured: true,
    salesCount: 310
  },
  {
    id: 'prod_5',
    name: 'Laptop Ultrabook 16" OLED AI Core Ultra 7 32GB',
    slug: 'laptop-ultrabook-16-oled-ai-core-ultra-7',
    category: 'Elektronika & IT',
    categorySlug: 'elektronika',
    vendorName: 'ElectroStore PL',
    vendorRating: 4.9,
    price: 4899.00,
    oldPrice: 5599.00,
    discountPercent: 12,
    currency: 'zł',
    rating: 4.9,
    reviewsCount: 42,
    badge: 'PREMIUM',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 12,
    shortDescription: 'Lekki i potężny ultrabook z matrycą OLED 3.2K 120Hz, jednostką NPU do sztucznej inteligencji i baterią na 18h.',
    features: ['Matryca OLED 3.2K 100% DCI-P3', 'Intel Core Ultra 7 + NPU AI', '32GB LPDDR5X + 1TB PCIe 4.0', 'Waga zaledwie 1.39 kg'],
    sku: 'LAP-OLED-16AI',
    isFeatured: true,
    salesCount: 180
  },
  {
    id: 'prod_6',
    name: 'Skórzany Plecak Miejski Vintage Premium Handmade',
    slug: 'skorzany-plecak-miejski-vintage-premium',
    category: 'Moda & Styl',
    categorySlug: 'moda',
    vendorName: 'LeatherCraft Masters',
    vendorRating: 4.8,
    price: 249.00,
    oldPrice: 349.00,
    discountPercent: 28,
    currency: 'zł',
    rating: 4.8,
    reviewsCount: 76,
    badge: 'WYPRZEDAŻ',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 28,
    shortDescription: 'Ręcznie szyty plecak z naturalnej skóry licowej z dedykowaną przegrodą na laptopa 15.6" i mosiężnymi okuciami.',
    features: ['100% Skóra bydlęca Crazy Horse', 'Wodoodporna podszewka bawełniana', 'Kieszeń na laptopa do 15.6"', 'Gwarancja 5 lat na szwy'],
    variants: [
      { id: 'v6', name: 'Koniakowy Brąz', type: 'color', value: 'Koniakowy Brąz', colorHex: '#78350f', inStock: true },
      { id: 'v7', name: 'Ciemna Czekolada', type: 'color', value: 'Ciemna Czekolada', colorHex: '#451a03', inStock: true },
      { id: 'v8', name: 'Klasyczna Czerń', type: 'color', value: 'Klasyczna Czerń', colorHex: '#18181b', inStock: true }
    ],
    sku: 'BAG-LEA-VIN-01',
    isFeatured: false,
    salesCount: 340
  },
  {
    id: 'prod_7',
    name: 'Kurtka Przejściowa Wodoodporna Windstopper 15K',
    slug: 'kurtka-przejsciowa-wodoodporna-windstopper',
    category: 'Moda & Styl',
    categorySlug: 'moda',
    vendorName: 'Outdoorsmen Wear',
    vendorRating: 4.6,
    price: 389.00,
    oldPrice: 489.00,
    discountPercent: 20,
    currency: 'zł',
    rating: 4.6,
    reviewsCount: 58,
    badge: 'NOWOŚĆ',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 60,
    shortDescription: 'Trójwarstwowa membrana z membraną 15 000 mm, podklejanymi szwami i zamkami YKK Aquaguard.',
    features: ['Membrana wodoodporna 15000/15000', 'Zamki wodoszczelne YKK', 'Regulowany kaptur ze stoperami', 'Wywietrzniki pod pachami'],
    variants: [
      { id: 'v9', name: 'S', type: 'size', value: 'S', inStock: true },
      { id: 'v10', name: 'M', type: 'size', value: 'M', inStock: true },
      { id: 'v11', name: 'L', type: 'size', value: 'L', inStock: true },
      { id: 'v12', name: 'XL', type: 'size', value: 'XL', inStock: true }
    ],
    sku: 'JKT-WIND-15K',
    isFeatured: false,
    salesCount: 220
  },
  {
    id: 'prod_8',
    name: 'Lampa Designerska Smart LED Amber Glass WiFi',
    slug: 'lampa-designerska-smart-led-amber-glass',
    category: 'Dom & Wnętrze',
    categorySlug: 'dom-ogrod',
    vendorName: 'LumiArt Living',
    vendorRating: 4.9,
    price: 199.00,
    oldPrice: 269.00,
    discountPercent: 26,
    currency: 'zł',
    rating: 4.9,
    reviewsCount: 94,
    badge: 'HIT',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 54,
    shortDescription: 'Ręcznie dmuchane bursztynowe szkło połączone z inteligentnym modułem Zigbee/WiFi, płynnym ściemnianiem i 16mln kolorów.',
    features: ['Bursztynowe szkło vintage', 'Zgodność z Apple HomeKit, Alexa, Google', 'Płynna regulacja temperatury barwowej', 'Stylowy przewód w oplocie tekstylnym'],
    sku: 'LAMP-AMB-SMART',
    isFeatured: true,
    salesCount: 670
  },
  {
    id: 'prod_9',
    name: 'Zestaw Kosmetyków Naturalnych Bio Glow Spa',
    slug: 'zestaw-kosmetykow-naturalnych-bio-glow-spa',
    category: 'Zdjęcie & Uroda',
    categorySlug: 'uroda',
    vendorName: 'Botanica Organics',
    vendorRating: 4.9,
    price: 159.00,
    oldPrice: 219.00,
    discountPercent: 27,
    currency: 'zł',
    rating: 4.9,
    reviewsCount: 165,
    badge: 'EKO',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 110,
    shortDescription: 'Luksusowy rytuał regeneracyjny z kwasem hialuronowym, olejem z opuncji figowej i witaminą C w szklanych opakowaniach.',
    features: ['99.4% składników pochodzenia naturalnego', 'Formuła wegańska i cruelty-free', 'Certyfikaty ECOCERT & COSMOS', 'Ekologiczne opakowanie prezentowe'],
    sku: 'COSM-BIO-GLOW',
    isFeatured: true,
    salesCount: 940
  },
  {
    id: 'prod_10',
    name: 'Ekspres Ciśnieniowy Barista Touch 19 Bar Pro',
    slug: 'ekspres-cisnieniowy-barista-touch-19-bar',
    category: 'Dom & Wnętrze',
    categorySlug: 'dom-ogrod',
    vendorName: 'CaffeLover PL',
    vendorRating: 4.8,
    price: 1899.00,
    oldPrice: 2399.00,
    discountPercent: 20,
    currency: 'zł',
    rating: 4.8,
    reviewsCount: 88,
    badge: 'POLECANY',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 18,
    shortDescription: 'Włoska pompa 19 bar, wbudowany młynek żarnowy z 30 stopniami mielenia i system spieniania mleka MicroFoam.',
    features: ['Włoska pompa Ulka 19 bar', 'Młynek żarnowy ze stali nierdzewnej', 'System podwójnego termobloku', 'Kolorowy dotykowy ekran OLED'],
    sku: 'EXP-BARISTA-19',
    isFeatured: false,
    salesCount: 290
  },
  {
    id: 'prod_11',
    name: 'Fotel Ergonomiczny Mesh Pro z Podparciem Lędźwi',
    slug: 'fotel-ergonomiczny-mesh-pro-podparcie-ledzwi',
    category: 'Komputery & Gaming',
    categorySlug: 'komputery-gaming',
    vendorName: 'ErgoWorkspace',
    vendorRating: 4.7,
    price: 899.00,
    oldPrice: 1199.00,
    discountPercent: 25,
    currency: 'zł',
    rating: 4.7,
    reviewsCount: 130,
    badge: 'BESTSELLER',
    images: [
      'https://images.unsplash.com/photo-1580481077195-72ff9f68801d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 22,
    shortDescription: 'Certyfikowany fotel biurowy z oddychającą siatką KOREA MESH, podłokietnikami 4D i samopoziomującym mechanizmem synchronicznym.',
    features: ['Oddychająca siatka elastyczna', 'Regulacja lędźwiowa 3D', 'Podłokietniki 4D Soft-Touch', 'Udźwig do 150 kg (klasa 4)'],
    sku: 'CHAIR-ERGO-PRO',
    isFeatured: true,
    salesCount: 410
  },
  {
    id: 'prod_12',
    name: 'Dron Zwiadowczy 4K HDR GPS 3-Osiowy Gimbal',
    slug: 'dron-zwiadowczy-4k-hdr-gps-gimbal',
    category: 'Elektronika & IT',
    categorySlug: 'elektronika',
    vendorName: 'SkyVision Drones',
    vendorRating: 4.9,
    price: 1699.00,
    oldPrice: 2099.00,
    discountPercent: 19,
    currency: 'zł',
    rating: 4.9,
    reviewsCount: 72,
    badge: 'HIT',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: false,
    stockCount: 0,
    shortDescription: 'Kamera 4K 60fps z mechanicznym gimbalem 3-osiowym, zasięg transmisji wideo do 10km i automatyczny powrót Return to Home.',
    features: ['Sensor 1/2" 48 Mpx 4K HDR', 'Czas lotu do 34 minut', 'Wielokierunkowe sensory omijania przeszkód', 'Waga < 249g (bez licencji)'],
    sku: 'DRONE-4K-GIMB',
    isFeatured: false,
    salesCount: 160
  }
];


