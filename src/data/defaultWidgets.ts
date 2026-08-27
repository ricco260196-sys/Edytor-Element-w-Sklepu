import {
  WidgetInstance,
  WidgetsManagerConfig,
  WidgetCategory,
  WidgetType,
  WidgetShapeConfig,
  WidgetBackgroundConfig,
  WidgetBorderConfig,
  WidgetShadowConfig,
  WidgetTypographyConfig,
  WidgetSpacingConfig,
  WidgetButtonConfig,
  WidgetIconConfig,
  WidgetHoverConfig,
  WidgetAnimationConfig,
  WidgetResponsiveConfig,
  WidgetInternalLayoutConfig,
  WidgetSizeConfig
} from '../types/widgetEditor';

export const defaultShape: WidgetShapeConfig = {
  preset: 'rounded_rectangle',
  borderRadius: 16,
  individualCorners: false,
  corners: {
    topLeft: 16,
    topRight: 16,
    bottomRight: 16,
    bottomLeft: 16,
    unit: 'px'
  },
  clipPathPreset: 'none'
};

export const defaultSize: WidgetSizeConfig = {
  width: '100%',
  height: 'auto',
  minWidth: 'auto',
  maxWidth: '1280px',
  minHeight: 'auto',
  maxHeight: 'none',
  containerPreset: 'standard_1200'
};

export const defaultInternalLayout: WidgetInternalLayoutConfig = {
  layoutType: 'grid',
  columns: 4,
  gap: 24,
  rowGap: 24,
  columnGap: 24,
  alignItems: 'stretch',
  justifyContent: 'start',
  direction: 'row',
  flexWrap: 'wrap'
};

export const defaultBackground: WidgetBackgroundConfig = {
  type: 'color',
  color: '#ffffff',
  opacity: 100,
  gradient: {
    type: 'linear',
    color1: '#3b82f6',
    color2: '#1d4ed8',
    color3: '#0f172a',
    direction: '135deg',
    position: 'center',
    opacity: 100
  },
  image: {
    url: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1600&q=80',
    position: 'center',
    size: 'cover',
    repeat: 'no-repeat',
    opacity: 100
  },
  glassmorphism: {
    blurPx: 16,
    opacity: 80,
    tintColor: 'rgba(255, 255, 255, 0.1)',
    borderHighlight: true
  },
  overlay: {
    enabled: false,
    type: 'color',
    color: '#000000',
    opacity: 40,
    blendMode: 'normal'
  }
};

export const defaultBorder: WidgetBorderConfig = {
  style: 'solid',
  width: 1,
  color: '#e2e8f0',
  opacity: 100,
  individualSides: false,
  sides: {
    top: { enabled: true, width: 1, style: 'solid', color: '#e2e8f0' },
    right: { enabled: true, width: 1, style: 'solid', color: '#e2e8f0' },
    bottom: { enabled: true, width: 1, style: 'solid', color: '#e2e8f0' },
    left: { enabled: true, width: 1, style: 'solid', color: '#e2e8f0' }
  }
};

export const defaultShadow: WidgetShadowConfig = {
  preset: 'md',
  custom: {
    x: 0,
    y: 4,
    blur: 14,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.06)',
    opacity: 100,
    inset: false
  }
};

export const defaultTypography: WidgetTypographyConfig = {
  fontFamily: 'Inter, system-ui, sans-serif',
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    textAlign: 'left',
    textTransform: 'none',
    textDecoration: 'none'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    textAlign: 'left',
    textTransform: 'none'
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: '#334155',
    lineHeight: 1.6,
    letterSpacing: 'normal',
    textAlign: 'left'
  }
};

export const defaultSpacing: WidgetSpacingConfig = {
  margin: { top: 32, right: 0, bottom: 32, left: 0, unit: 'px' },
  padding: { top: 32, right: 32, bottom: 32, left: 32, unit: 'px' },
  gap: 20
};

export const defaultButton: WidgetButtonConfig = {
  text: 'Sprawdź ofertę',
  icon: 'ArrowRight',
  iconPosition: 'right',
  textColor: '#ffffff',
  bgColor: '#2563eb',
  width: 'auto',
  heightPx: 44,
  paddingX: 22,
  paddingY: 11,
  borderRadius: 10,
  borderWidth: 0,
  borderColor: '#2563eb',
  shadow: 'sm',
  hoverBgColor: '#1d4ed8',
  hoverTextColor: '#ffffff',
  hoverBorderColor: '#1d4ed8',
  hoverScale: 1.02
};

export const defaultIcon: WidgetIconConfig = {
  iconName: 'Sparkles',
  sizePx: 24,
  color: '#3b82f6',
  position: 'left',
  gapPx: 12,
  animation: 'none'
};

export const defaultHover: WidgetHoverConfig = {
  enabled: true,
  scale: 1.01,
  translateY: -3,
  opacity: 100,
  glow: false,
  glowColor: 'rgba(59, 130, 246, 0.3)',
  transitionDurationMs: 250
};

export const defaultAnimation: WidgetAnimationConfig = {
  type: 'fade',
  durationMs: 350,
  delayMs: 0,
  easing: 'ease-out',
  direction: 'up'
};

export const defaultResponsive: WidgetResponsiveConfig = {
  desktop: { columns: 4, gap: 24, paddingY: 32, paddingX: 32, fontSizeScale: 1 },
  tablet: { columns: 2, gap: 16, paddingY: 24, paddingX: 20, fontSizeScale: 0.95, visible: true },
  mobile: { columns: 1, gap: 12, paddingY: 16, paddingX: 16, fontSizeScale: 0.9, visible: true, stackOnMobile: true }
};

// 1. Featured Products Widget
export const defaultFeaturedProductsWidget: WidgetInstance = {
  id: 'widget-featured-products',
  type: 'featured_products',
  name: 'Polecane produkty',
  displayName: 'Polecane produkty i Bestsellery',
  category: 'products',
  enabled: true,
  description: 'Wyróżniona sekcja z najlepszymi produktami pobieranymi z katalogu marketplace z odznakami, ocenami i przyciskiem szybkiego zakupu.',
  badgeTag: 'Katalog Marketplace',
  shape: { ...defaultShape, borderRadius: 20 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'grid', columns: 4 },
  background: { ...defaultBackground, color: '#f8fafc' },
  border: { ...defaultBorder, color: '#e2e8f0' },
  shadow: { ...defaultShadow, preset: 'md' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, fontSize: 26, color: '#0f172a' },
    subtitle: { ...defaultTypography.subtitle, fontSize: 14, color: '#64748b' }
  },
  spacing: { ...defaultSpacing, padding: { top: 36, right: 32, bottom: 36, left: 32, unit: 'px' } },
  elements: {
    header: { id: 'header', label: 'Nagłówek sekcji', visible: true },
    subtitle: { id: 'subtitle', label: 'Podtytuł / Opis', visible: true },
    badge: { id: 'badge', label: 'Etykieta sekcji', visible: true },
    productImage: { id: 'productImage', label: 'Zdjęcie produktu', visible: true },
    productTitle: { id: 'productTitle', label: 'Nazwa produktu', visible: true },
    productPrice: { id: 'productPrice', label: 'Cena i stara cena', visible: true },
    productRating: { id: 'productRating', label: 'Ocena gwiazdkowa', visible: true },
    productBadge: { id: 'productBadge', label: 'Odznaka rabatu/nowości', visible: true },
    addToCartBtn: { id: 'addToCartBtn', label: 'Przycisk dodania do koszyka', visible: true },
    wishlistIcon: { id: 'wishlistIcon', label: 'Ikona ulubionych', visible: true },
    seeAllLink: { id: 'seeAllLink', label: 'Link "Zobacz wszystkie"', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Do koszyka',
    icon: 'ShoppingBag',
    bgColor: '#2563eb'
  },
  icon: { ...defaultIcon, iconName: 'Flame', color: '#f97316' },
  hover: { ...defaultHover, scale: 1.00, translateY: -2 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 4, gap: 20 },
    tablet: { columns: 2, gap: 16, visible: true },
    mobile: { columns: 1, gap: 12, visible: true }
  },
  content: {
    title: 'Wyjątkowe okazje i Polecane Produkty',
    subtitle: 'Rekomendowane oferty specjalne wybrane przez nasz zespół',
    badgeText: 'HIT TYGODNIA',
    targetUrl: '/kategoria/promocje',
    maxProductsCount: 4,
    secondaryButtonText: 'Zobacz wszystkie (48)',
    secondaryButtonUrl: '/produkty'
  }
};

// 2. Promotions Widget
export const defaultPromotionsWidget: WidgetInstance = {
  id: 'widget-promotions',
  type: 'promotions',
  name: 'Promocje',
  displayName: 'Gorące Promocje i Wyprzedaże',
  category: 'products',
  enabled: true,
  description: 'Dynamiczna siatka zniżek z kalkulacją procentu rabatu i zegarem czasu trwania promocji.',
  badgeTag: 'Promocje',
  shape: { ...defaultShape, borderRadius: 24 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'grid', columns: 3 },
  background: {
    ...defaultBackground,
    type: 'gradient',
    gradient: {
      type: 'linear',
      color1: '#fdf4ff',
      color2: '#fae8ff',
      direction: '135deg',
      position: 'center',
      opacity: 100
    }
  },
  border: { ...defaultBorder, color: '#f0abfc', width: 1 },
  shadow: { ...defaultShadow, preset: 'lg' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, color: '#86198f', fontSize: 26 },
    subtitle: { ...defaultTypography.subtitle, color: '#a21caf' }
  },
  spacing: { ...defaultSpacing, padding: { top: 40, right: 36, bottom: 40, left: 36, unit: 'px' } },
  elements: {
    header: { id: 'header', label: 'Nagłówek sekcji', visible: true },
    subtitle: { id: 'subtitle', label: 'Podtytuł', visible: true },
    discountBadge: { id: 'discountBadge', label: 'Etykieta zniżki (-30%)', visible: true },
    countdown: { id: 'countdown', label: 'Licznik pozostałego czasu', visible: true },
    productCards: { id: 'productCards', label: 'Karty produktów', visible: true },
    buyNowBtn: { id: 'buyNowBtn', label: 'Przycisk Kup teraz', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Kup teraz ze zniżką',
    bgColor: '#c026d3',
    hoverBgColor: '#a21caf'
  },
  icon: { ...defaultIcon, iconName: 'Percent', color: '#c026d3' },
  hover: { ...defaultHover, scale: 1.01 },
  animation: { ...defaultAnimation, type: 'scale' },
  responsive: {
    desktop: { columns: 3, gap: 24 },
    tablet: { columns: 2, gap: 16, visible: true },
    mobile: { columns: 1, gap: 12, visible: true }
  },
  content: {
    title: 'Błyskawiczne Wyprzedaże do -50%',
    subtitle: 'Oferty ograniczone czasowo – tylko do wyczerpania zapasów',
    badgeText: 'WYPRZEDAŻ SEZONOWA',
    timerEndDate: '2026-09-01T23:59:59',
    maxProductsCount: 3
  }
};

// 3. Newsletter Widget
export const defaultNewsletterWidget: WidgetInstance = {
  id: 'widget-newsletter',
  type: 'newsletter',
  name: 'Newsletter',
  displayName: 'Klub Zakupowy i Newsletter',
  category: 'marketing',
  enabled: true,
  description: 'Atrakcyjny boks zapisu do newslettera z kodem rabatowym na pierwsze zakupy, ikoną i polem adresu e-mail.',
  badgeTag: 'Marketing',
  shape: { ...defaultShape, borderRadius: 24 },
  size: { ...defaultSize, maxWidth: '1180px' },
  layout: { ...defaultInternalLayout, layoutType: 'split', columns: 2, alignItems: 'center' },
  background: {
    ...defaultBackground,
    type: 'gradient',
    gradient: {
      type: 'linear',
      color1: '#1e293b',
      color2: '#0f172a',
      direction: '135deg',
      position: 'center',
      opacity: 100
    }
  },
  border: { ...defaultBorder, color: '#334155', width: 1 },
  shadow: { ...defaultShadow, preset: 'xl' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, color: '#ffffff', fontSize: 28 },
    subtitle: { ...defaultTypography.subtitle, color: '#94a3b8', fontSize: 15 },
    body: { ...defaultTypography.body, color: '#cbd5e1' }
  },
  spacing: { ...defaultSpacing, padding: { top: 48, right: 48, bottom: 48, left: 48, unit: 'px' } },
  elements: {
    badge: { id: 'badge', label: 'Odznaka rabatowa (-10%)', visible: true },
    title: { id: 'title', label: 'Tytuł zachęcający', visible: true },
    description: { id: 'description', label: 'Opis korzyści', visible: true },
    emailInput: { id: 'emailInput', label: 'Pole wpisywania adresu e-mail', visible: true },
    submitButton: { id: 'submitButton', label: 'Przycisk "Zapisz się"', visible: true },
    gdprConsent: { id: 'gdprConsent', label: 'Zgoda marketingowa / RODO', visible: true },
    guaranteeNotice: { id: 'guaranteeNotice', label: 'Gwarancja braku spamu', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Odbierz rabat -10%',
    bgColor: '#3b82f6',
    hoverBgColor: '#2563eb',
    heightPx: 48,
    borderRadius: 12
  },
  icon: { ...defaultIcon, iconName: 'Mail', color: '#60a5fa' },
  hover: { ...defaultHover, scale: 1.00 },
  animation: { ...defaultAnimation, type: 'reveal' },
  responsive: {
    desktop: { columns: 2, paddingX: 48, paddingY: 48 },
    tablet: { columns: 1, paddingX: 32, paddingY: 36, visible: true },
    mobile: { columns: 1, paddingX: 20, paddingY: 28, visible: true }
  },
  content: {
    title: 'Dołącz do klubu i zyskaj -10% na start!',
    subtitle: 'Zapisz się do bezpłatnego newslettera, aby otrzymywać unikalne kody zniżkowe, wcześniejszy dostęp do wyprzedaży i poradniki.',
    badgeText: 'KOD: START10',
    voucherCode: 'START10',
    discountPercent: 10
  }
};

// 4. Trust Badges Widget
export const defaultTrustBadgesWidget: WidgetInstance = {
  id: 'widget-trust-badges',
  type: 'trust_badges',
  name: 'Trust Badges',
  displayName: 'Odznaki Zaufania i Gwarancje',
  category: 'trust',
  enabled: true,
  description: 'Pasek ikon zaufania: darmowa wysyłka, 30 dni na zwrot, bezpieczne płatności SSL i wsparcie doradców.',
  badgeTag: 'Zaufanie',
  shape: { ...defaultShape, borderRadius: 16 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'grid', columns: 4, gap: 20 },
  background: { ...defaultBackground, color: '#ffffff' },
  border: { ...defaultBorder, color: '#e2e8f0', width: 1 },
  shadow: { ...defaultShadow, preset: 'sm' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, fontSize: 16, fontWeight: '700', color: '#0f172a' },
    subtitle: { ...defaultTypography.subtitle, fontSize: 13, color: '#64748b' }
  },
  spacing: { ...defaultSpacing, padding: { top: 24, right: 28, bottom: 24, left: 28, unit: 'px' } },
  elements: {
    iconWrapper: { id: 'iconWrapper', label: 'Kolorowe tło ikony', visible: true },
    itemTitle: { id: 'itemTitle', label: 'Tytuł korzyści', visible: true },
    itemSubtitle: { id: 'itemSubtitle', label: 'Podtytuł / Szczegóły', visible: true },
    divider: { id: 'divider', label: 'Pionowe linie rozdzielające', visible: true }
  },
  button: { ...defaultButton, text: 'Więcej informacji' },
  icon: { ...defaultIcon, iconName: 'ShieldCheck', color: '#10b981', sizePx: 28 },
  hover: { ...defaultHover, scale: 1.01, translateY: -2 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 4, gap: 20 },
    tablet: { columns: 2, gap: 16, visible: true },
    mobile: { columns: 1, gap: 12, visible: true }
  },
  content: {
    title: 'Gwarancje bezpiecznych zakupów',
    subtitle: 'Dlaczego warto zaufać naszemu marketplace',
    customItems: [
      {
        id: 'tb-1',
        title: 'Błyskawiczna wysyłka 24h',
        subtitle: 'Darmowa dostawa od 150 zł',
        icon: 'Truck'
      },
      {
        id: 'tb-2',
        title: '30 dni na bezpłatny zwrot',
        subtitle: 'Wygodny zwrot w paczkomacie',
        icon: 'RotateCcw'
      },
      {
        id: 'tb-3',
        title: 'Bezpieczne płatności SSL',
        subtitle: 'BLIK, PayU, Karty, Raty 0%',
        icon: 'ShieldCheck'
      },
      {
        id: 'tb-4',
        title: 'Wsparcie 7 dni w tygodniu',
        subtitle: 'Pomoc ekspertów na czacie',
        icon: 'Headphones'
      }
    ]
  }
};

// 5. Promo 1 Widget (Single Promo Banner / Deal Highlight)
export const defaultPromo1Widget: WidgetInstance = {
  id: 'widget-promo-1',
  type: 'promo_1',
  name: 'Promocja 1',
  displayName: 'Baner Promocyjny: Mega Rabat z Kodem',
  category: 'marketing',
  enabled: true,
  description: 'Duży baner graficzny z przyciskiem skopiowania kodu kuponu, zdjęciem produktu i wyrazistą typografią.',
  badgeTag: 'Promocja Główna',
  shape: { ...defaultShape, borderRadius: 24 },
  size: { ...defaultSize, height: 'auto' },
  layout: { ...defaultInternalLayout, layoutType: 'split', columns: 2, alignItems: 'center' },
  background: {
    ...defaultBackground,
    type: 'gradient',
    gradient: {
      type: 'linear',
      color1: '#1e1b4b',
      color2: '#312e81',
      direction: '120deg',
      position: 'center',
      opacity: 100
    }
  },
  border: { ...defaultBorder, color: '#4338ca', width: 1 },
  shadow: { ...defaultShadow, preset: 'xl' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, color: '#ffffff', fontSize: 32 },
    subtitle: { ...defaultTypography.subtitle, color: '#c7d2fe', fontSize: 16 }
  },
  spacing: { ...defaultSpacing, padding: { top: 48, right: 48, bottom: 48, left: 48, unit: 'px' } },
  elements: {
    badge: { id: 'badge', label: 'Odznaka promocyjna', visible: true },
    title: { id: 'title', label: 'Główny tytuł oferty', visible: true },
    description: { id: 'description', label: 'Opis i warunki', visible: true },
    voucherBox: { id: 'voucherBox', label: 'Pudełko kodu kuponu', visible: true },
    ctaButton: { id: 'ctaButton', label: 'Przycisk Akcji (CTA)', visible: true },
    heroImage: { id: 'heroImage', label: 'Zdjęcie / Grafika promocyjna', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Skorzystaj z promocji',
    bgColor: '#4f46e5',
    hoverBgColor: '#4338ca',
    heightPx: 48,
    borderRadius: 12
  },
  icon: { ...defaultIcon, iconName: 'Tag', color: '#818cf8' },
  hover: { ...defaultHover, scale: 1.00 },
  animation: { ...defaultAnimation, type: 'slide' },
  responsive: {
    desktop: { columns: 2, paddingX: 48, paddingY: 48 },
    tablet: { columns: 1, paddingX: 32, paddingY: 36, visible: true },
    mobile: { columns: 1, paddingX: 20, paddingY: 24, visible: true }
  },
  content: {
    title: 'Wyprzedaż elektroniki i akcesoriów!',
    subtitle: 'Zastosuj kod i zgarnij dodatkowe 100 zł zniżki przy zamówieniach powyżej 500 zł.',
    badgeText: 'OFERTA LIMITOWANA',
    voucherCode: 'TECH2026',
    discountPercent: 20,
    targetUrl: '/kategoria/elektronika'
  }
};

// 6. Promo 2 Widget (Flash Sale / Countdown Box)
export const defaultPromo2Widget: WidgetInstance = {
  id: 'widget-promo-2',
  type: 'promo_2',
  name: 'Promocja 2',
  displayName: 'Baner Promocyjny: Flash Sale z Zegarem',
  category: 'marketing',
  enabled: true,
  description: 'Dynamiczny pasek wyprzedaży błyskawicznej z odliczanym czasem na żywo, paskiem postępu wykupienia i ofertą dnia.',
  badgeTag: 'Flash Sale',
  shape: { ...defaultShape, borderRadius: 20 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'row', alignItems: 'center', justifyContent: 'between' },
  background: {
    ...defaultBackground,
    type: 'gradient',
    gradient: {
      type: 'linear',
      color1: '#ef4444',
      color2: '#b91c1c',
      direction: '135deg',
      position: 'center',
      opacity: 100
    }
  },
  border: { ...defaultBorder, color: '#f87171', width: 1 },
  shadow: { ...defaultShadow, preset: 'lg' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, color: '#ffffff', fontSize: 24 },
    subtitle: { ...defaultTypography.subtitle, color: '#fee2e2', fontSize: 14 }
  },
  spacing: { ...defaultSpacing, padding: { top: 32, right: 36, bottom: 32, left: 36, unit: 'px' } },
  elements: {
    flameIcon: { id: 'flameIcon', label: 'Animowana ikona ognia', visible: true },
    title: { id: 'title', label: 'Tytuł Flash Sale', visible: true },
    timer: { id: 'timer', label: 'Klocki zegara z sekundami', visible: true },
    progressBar: { id: 'progressBar', label: 'Pasek wykupionych sztuk (84%)', visible: true },
    ctaButton: { id: 'ctaButton', label: 'Przycisk "Kupuję teraz"', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Upoluj okazję',
    bgColor: '#ffffff',
    textColor: '#b91c1c',
    hoverBgColor: '#fee2e2',
    hoverTextColor: '#991b1b',
    heightPx: 44,
    borderRadius: 10
  },
  icon: { ...defaultIcon, iconName: 'Flame', color: '#ffffff' },
  hover: { ...defaultHover, scale: 1.01 },
  animation: { ...defaultAnimation, type: 'bounce' },
  responsive: {
    desktop: { columns: 3, paddingX: 36, paddingY: 32 },
    tablet: { columns: 1, paddingX: 24, paddingY: 24, visible: true },
    mobile: { columns: 1, paddingX: 16, paddingY: 20, visible: true }
  },
  content: {
    title: '⚡ FLASH SALE: Ostatnie 4 godziny promocji!',
    subtitle: 'Spiesz się! Wykupiono już 84% produktów objętych zniżką.',
    badgeText: 'DO -70%',
    timerEndDate: '2026-08-30T18:00:00',
    targetUrl: '/promocje/flash'
  }
};

// 7. Testimonials Widget
export const defaultTestimonialsWidget: WidgetInstance = {
  id: 'widget-testimonials',
  type: 'testimonials',
  name: 'Opinie Klientów',
  displayName: 'Opinie i Recenzje Kupujących',
  category: 'trust',
  enabled: false,
  description: 'Karty z autentycznymi opiniami zadowolonych klientów, ocenami 5 gwiazdek i weryfikacją zakupu.',
  badgeTag: 'Zaufanie',
  shape: { ...defaultShape, borderRadius: 20 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'grid', columns: 3, gap: 24 },
  background: { ...defaultBackground, color: '#f8fafc' },
  border: { ...defaultBorder, color: '#e2e8f0' },
  shadow: { ...defaultShadow, preset: 'md' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, fontSize: 26, textAlign: 'center' },
    subtitle: { ...defaultTypography.subtitle, fontSize: 14, textAlign: 'center' }
  },
  spacing: { ...defaultSpacing, padding: { top: 40, right: 32, bottom: 40, left: 32, unit: 'px' } },
  elements: {
    header: { id: 'header', label: 'Nagłówek sekcji', visible: true },
    ratingStars: { id: 'ratingStars', label: 'Gwiazdki oceny', visible: true },
    reviewText: { id: 'reviewText', label: 'Treść recenzji', visible: true },
    authorAvatar: { id: 'authorAvatar', label: 'Awatar klienta', visible: true },
    authorName: { id: 'authorName', label: 'Imię i nazwisko', visible: true },
    verifiedBadge: { id: 'verifiedBadge', label: 'Odznaka "Zweryfikowany zakup"', visible: true }
  },
  button: { ...defaultButton, text: 'Zobacz wszystkie opinie (1,420+)' },
  icon: { ...defaultIcon, iconName: 'Star', color: '#f59e0b' },
  hover: { ...defaultHover, scale: 1.01 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 3, gap: 24 },
    tablet: { columns: 2, gap: 16, visible: true },
    mobile: { columns: 1, gap: 12, visible: true }
  },
  content: {
    title: 'Co mówią nasi klienci?',
    subtitle: 'Średnia ocena 4.9/5 na podstawie ponad 12 000 zrealizowanych zamówień',
    customItems: [
      {
        id: 'rev-1',
        title: 'Michał K.',
        author: 'Michał K.',
        role: 'Zweryfikowany klient',
        rating: 5,
        description: 'Paczka dotarła już następnego dnia rano. Towar w 100% zgodny z opisem, super kontakt z obsługą!',
        badge: 'Polecam'
      },
      {
        id: 'rev-2',
        title: 'Katarzyna W.',
        author: 'Katarzyna W.',
        role: 'Stały klient',
        rating: 5,
        description: 'Świetny proces zwrotów i natychmiastowy zwrot środków. Kupuję tu regularnie od 2 lat.',
        badge: 'Top Recenzent'
      },
      {
        id: 'rev-3',
        title: 'Piotr Z.',
        author: 'Piotr Z.',
        role: 'Zweryfikowany zakup',
        rating: 5,
        description: 'Najlepsze ceny na rynku i profesjonalne doradztwo techniczne. Zdecydowanie 5 gwiazdek!',
        badge: 'Polecam'
      }
    ]
  }
};

// 8. USP / Store Advantages Widget
export const defaultUspBannerWidget: WidgetInstance = {
  id: 'widget-usp-banner',
  type: 'usp_banner',
  name: 'Zalety Sklepu',
  displayName: 'Dlaczego warto kupować u nas (USPs)',
  category: 'info',
  enabled: false,
  description: 'Nowoczesny blok z wyróżnikami marki, certyfikatami i korzyściami zakupowymi.',
  badgeTag: 'Informacje',
  shape: { ...defaultShape, borderRadius: 16 },
  size: { ...defaultSize },
  layout: { ...defaultInternalLayout, layoutType: 'grid', columns: 3, gap: 20 },
  background: { ...defaultBackground, color: '#ffffff' },
  border: { ...defaultBorder, color: '#e2e8f0' },
  shadow: { ...defaultShadow, preset: 'sm' },
  typography: { ...defaultTypography },
  spacing: { ...defaultSpacing },
  elements: {
    icon: { id: 'icon', label: 'Ikona wyróżnika', visible: true },
    title: { id: 'title', label: 'Tytuł korzyści', visible: true },
    desc: { id: 'desc', label: 'Opis', visible: true }
  },
  button: { ...defaultButton, text: 'Dowiedz się więcej' },
  icon: { ...defaultIcon, iconName: 'CheckCircle2', color: '#2563eb' },
  hover: { ...defaultHover, scale: 1.01 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 3, gap: 20 },
    tablet: { columns: 2, gap: 16, visible: true },
    mobile: { columns: 1, gap: 12, visible: true }
  },
  content: {
    title: 'Dlaczego MarketplacePro?',
    subtitle: 'Poznaj standardy obsługi i unikalne korzyści',
    customItems: [
      { id: 'u-1', title: 'Ponad 50 000 produktów', subtitle: 'Tylko oryginalne towary prosto od producentów', icon: 'Box' },
      { id: 'u-2', title: 'Program Lojalnościowy ProClub', subtitle: 'Zbieraj punkty za każdy zakup i wymieniaj na nagrody', icon: 'Award' },
      { id: 'u-3', title: 'Ekologiczne opakowania', subtitle: '100% biodegradowalne i bezpieczne dla środowiska', icon: 'Leaf' }
    ]
  }
};

// 9. FAQ Accordion Widget
export const defaultFaqWidget: WidgetInstance = {
  id: 'widget-faq-accordion',
  type: 'faq_accordion',
  name: 'FAQ - Pytania i Odpowiedzi',
  displayName: 'Najczęściej Zadawane Pytania (FAQ)',
  category: 'info',
  enabled: false,
  description: 'Interaktywny akordeon z odpowiedziami na pytania o dostawę, płatności, zwroty i gwarancję.',
  badgeTag: 'Informacje',
  shape: { ...defaultShape, borderRadius: 20 },
  size: { ...defaultSize, maxWidth: '960px' },
  layout: { ...defaultInternalLayout, layoutType: 'column', columns: 1, gap: 12 },
  background: { ...defaultBackground, color: '#ffffff' },
  border: { ...defaultBorder, color: '#e2e8f0' },
  shadow: { ...defaultShadow, preset: 'md' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, textAlign: 'center', fontSize: 26 },
    subtitle: { ...defaultTypography.subtitle, textAlign: 'center' }
  },
  spacing: { ...defaultSpacing, padding: { top: 36, right: 32, bottom: 36, left: 32, unit: 'px' } },
  elements: {
    header: { id: 'header', label: 'Nagłówek FAQ', visible: true },
    accordionItem: { id: 'accordionItem', label: 'Paski pytań', visible: true },
    expandIcon: { id: 'expandIcon', label: 'Ikona rozwijania (+/-)', visible: true },
    answerBox: { id: 'answerBox', label: 'Treść odpowiedzi', visible: true }
  },
  button: { ...defaultButton, text: 'Skontaktuj się z nami' },
  icon: { ...defaultIcon, iconName: 'HelpCircle', color: '#6366f1' },
  hover: { ...defaultHover, scale: 1.00 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 1, paddingX: 32, paddingY: 36 },
    tablet: { columns: 1, paddingX: 24, paddingY: 28, visible: true },
    mobile: { columns: 1, paddingX: 16, paddingY: 20, visible: true }
  },
  content: {
    title: 'Najczęściej zadawane pytania',
    subtitle: 'Wszystko co musisz wiedzieć przed zakupem',
    customItems: [
      { id: 'faq-1', title: 'Jak szybko realizowane jest zamówienie?', description: 'Zamówienia złożone do godziny 14:00 w dni robocze wysyłamy tego samego dnia. Czas doręczenia kurierem lub do Paczkomatu to zazwyczaj 24 godziny.' },
      { id: 'faq-2', title: 'Czy zwroty są bezpłatne?', description: 'Tak! Oferujemy bezpłatny zwrot towaru w ciągu 30 dni od odebrania przesyłki za pośrednictwem Paczkomatów InPost.' },
      { id: 'faq-3', title: 'Jakie metody płatności są dostępne?', description: 'Akceptujemy BLIK, szybkie przelewy PayU, karty Visa/Mastercard, Apple Pay, Google Pay oraz raty 0%.' }
    ]
  }
};

// 10. Countdown Banner Widget
export const defaultCountdownBannerWidget: WidgetInstance = {
  id: 'widget-countdown-banner',
  type: 'countdown_banner',
  name: 'Licznik Wyprzedaży',
  displayName: 'Pasek Odliczania do Końca Promocji',
  category: 'marketing',
  enabled: false,
  description: 'Wąski, wyrazisty pasek informacyjny z odliczanym czasem i przyciskiem natychmiastowego zakupu.',
  badgeTag: 'Pasek Akcji',
  shape: { ...defaultShape, borderRadius: 12 },
  size: { ...defaultSize, height: 'auto' },
  layout: { ...defaultInternalLayout, layoutType: 'row', alignItems: 'center', justifyContent: 'between', gap: 16 },
  background: {
    ...defaultBackground,
    type: 'gradient',
    gradient: {
      type: 'linear',
      color1: '#0f172a',
      color2: '#1e293b',
      direction: '90deg',
      position: 'center',
      opacity: 100
    }
  },
  border: { ...defaultBorder, color: '#334155' },
  shadow: { ...defaultShadow, preset: 'sm' },
  typography: {
    ...defaultTypography,
    title: { ...defaultTypography.title, color: '#ffffff', fontSize: 16, fontWeight: '700' },
    subtitle: { ...defaultTypography.subtitle, color: '#cbd5e1', fontSize: 13 }
  },
  spacing: { ...defaultSpacing, padding: { top: 16, right: 24, bottom: 16, left: 24, unit: 'px' } },
  elements: {
    title: { id: 'title', label: 'Tytuł z odznaką', visible: true },
    timer: { id: 'timer', label: 'Licznik czasu', visible: true },
    button: { id: 'button', label: 'Przycisk', visible: true }
  },
  button: {
    ...defaultButton,
    text: 'Zobacz okazje',
    bgColor: '#3b82f6',
    heightPx: 38,
    paddingX: 18,
    paddingY: 8,
    borderRadius: 8
  },
  icon: { ...defaultIcon, iconName: 'Clock', color: '#60a5fa' },
  hover: { ...defaultHover, scale: 1.00 },
  animation: { ...defaultAnimation, type: 'fade' },
  responsive: {
    desktop: { columns: 1, paddingX: 24, paddingY: 16 },
    tablet: { columns: 1, paddingX: 16, paddingY: 14, visible: true },
    mobile: { columns: 1, paddingX: 12, paddingY: 12, visible: true }
  },
  content: {
    title: '🔥 Wielka Wyprzedaż Końca Sezonu dobiega końca!',
    subtitle: 'Skorzystaj z rabatów do -60% przed wyzerowaniem licznika.',
    badgeText: 'OSTATNIE GODZINY',
    timerEndDate: '2026-09-05T20:00:00'
  }
};

export const initialWidgetsList: WidgetInstance[] = [
  defaultFeaturedProductsWidget,
  defaultPromotionsWidget,
  defaultNewsletterWidget,
  defaultTrustBadgesWidget,
  defaultPromo1Widget,
  defaultPromo2Widget,
  defaultTestimonialsWidget,
  defaultUspBannerWidget,
  defaultFaqWidget,
  defaultCountdownBannerWidget
];

export const defaultWidgetsManagerConfig: WidgetsManagerConfig = {
  enabled: true,
  activeWidgetId: 'widget-featured-products',
  widgets: initialWidgetsList,
  useGlobalStyles: false
};

// Library catalogue of all available widgets for the "+ Dodaj widżet" modal
export interface WidgetLibraryTemplate {
  type: WidgetType;
  name: string;
  category: WidgetCategory;
  categoryLabel: string;
  iconName: string;
  badge: string;
  description: string;
  previewThumbnail: string;
  defaultConfig: WidgetInstance;
}

export const WIDGET_LIBRARY_TEMPLATES: WidgetLibraryTemplate[] = [
  {
    type: 'featured_products',
    name: 'Polecane produkty',
    category: 'products',
    categoryLabel: 'Produkty',
    iconName: 'ShoppingBag',
    badge: 'Katalog Marketplace',
    description: 'Siatka najchętniej kupowanych i wyróżnionych produktów z ocenami, cenami i szybkim koszykiem.',
    previewThumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultFeaturedProductsWidget
  },
  {
    type: 'promotions',
    name: 'Promocje',
    category: 'products',
    categoryLabel: 'Produkty',
    iconName: 'Percent',
    badge: 'Okazje Dnia',
    description: 'Wyróżniona ekspozycja obniżek cenowych z wyliczonym procentem rabatu i etykietami promocji.',
    previewThumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultPromotionsWidget
  },
  {
    type: 'newsletter',
    name: 'Newsletter',
    category: 'marketing',
    categoryLabel: 'Marketing',
    iconName: 'Mail',
    badge: 'Generowanie Leadów',
    description: 'Elegancki boks zbierania subskrypcji e-mail z kodem rabatowym -10% na pierwsze zamówienie.',
    previewThumbnail: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultNewsletterWidget
  },
  {
    type: 'trust_badges',
    name: 'Trust Badges',
    category: 'trust',
    categoryLabel: 'Zaufanie',
    iconName: 'ShieldCheck',
    badge: 'Gwarancja Bezpieczeństwa',
    description: 'Pasek ikon zaufania: darmowa dostawa, szybki zwrot 30 dni, szyfrowanie SSL i doradztwo.',
    previewThumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultTrustBadgesWidget
  },
  {
    type: 'promo_1',
    name: 'Promocja 1 (Mega Rabat z kodem)',
    category: 'marketing',
    categoryLabel: 'Marketing',
    iconName: 'Tag',
    badge: 'Baner Kod Kuponu',
    description: 'Duży baner promocyjny z przyciskiem do kopiowania kodu zniżkowego i grafiką produktu.',
    previewThumbnail: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultPromo1Widget
  },
  {
    type: 'promo_2',
    name: 'Promocja 2 (Flash Sale z zegarem)',
    category: 'marketing',
    categoryLabel: 'Marketing',
    iconName: 'Flame',
    badge: 'Odliczanie Na Żywo',
    description: 'Wyrazisty baner ograniczonej czasowo wyprzedaży z zegarem odliczającym sekundy i paskiem postępu.',
    previewThumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultPromo2Widget
  },
  {
    type: 'testimonials',
    name: 'Opinie Klientów',
    category: 'trust',
    categoryLabel: 'Zaufanie',
    iconName: 'Star',
    badge: 'Social Proof',
    description: 'Karty z opiniami zadowolonych klientów, oceną 5 gwiazdek i odznaką zweryfikowanego zakupu.',
    previewThumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultTestimonialsWidget
  },
  {
    type: 'usp_banner',
    name: 'Zalety Sklepu (USPs)',
    category: 'info',
    categoryLabel: 'Informacyjne',
    iconName: 'CheckCircle2',
    badge: 'Wyróżniki',
    description: 'Nowoczesny blok z kluczowymi atutami zakupów w Twoim sklepie.',
    previewThumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultUspBannerWidget
  },
  {
    type: 'faq_accordion',
    name: 'FAQ - Pytania i Odpowiedzi',
    category: 'info',
    categoryLabel: 'Informacyjne',
    iconName: 'HelpCircle',
    badge: 'Wsparcie Klienta',
    description: 'Interaktywny akordeon z odpowiedziami na pytania o dostawę, płatności i zwroty.',
    previewThumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultFaqWidget
  },
  {
    type: 'countdown_banner',
    name: 'Licznik Wyprzedaży',
    category: 'marketing',
    categoryLabel: 'Marketing',
    iconName: 'Clock',
    badge: 'Pasek Akcji',
    description: 'Kompaktowy pasek informacyjny z odliczanym czasem i przyciskiem natychmiastowego przejścia.',
    previewThumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&q=80',
    defaultConfig: defaultCountdownBannerWidget
  }
];

// Presets for rapid style transformation (Modern, Premium, Minimal, Clean, Glass, Dark, Light, Elegant, Marketplace)
export interface WidgetPresetDefinition {
  id: string;
  name: string;
  description: string;
  badge: string;
  previewColor: string;
  shape: Partial<WidgetShapeConfig>;
  background: Partial<WidgetBackgroundConfig>;
  border: Partial<WidgetBorderConfig>;
  shadow: Partial<WidgetShadowConfig>;
  typography: Partial<WidgetTypographyConfig>;
  button: Partial<WidgetButtonConfig>;
  hover: Partial<WidgetHoverConfig>;
}

export const WIDGET_STYLE_PRESETS: Record<string, WidgetPresetDefinition> = {
  modern: {
    id: 'modern',
    name: 'Modern (Nowoczesny)',
    description: 'Czysty niebieski akcent, subtelne cienie i płynne zaokrąglenia rogów.',
    badge: 'Standard E-commerce',
    previewColor: '#2563eb',
    shape: { preset: 'rounded_rectangle', borderRadius: 20 },
    background: { type: 'color', color: '#ffffff' },
    border: { style: 'solid', width: 1, color: '#e2e8f0' },
    shadow: { preset: 'md' },
    typography: {
      title: { fontSize: 24, fontWeight: '800', color: '#0f172a', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#64748b', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#2563eb', textColor: '#ffffff', borderRadius: 12, shadow: 'sm', hoverBgColor: '#1d4ed8' },
    hover: { enabled: true, scale: 1.01, translateY: -2 }
  },
  premium: {
    id: 'premium',
    name: 'Premium (Złoty / Luksus)',
    description: 'Ciemny grafit, złociste linie obramowania i eleganckie proporcje.',
    badge: 'Ekskluzywny',
    previewColor: '#d97706',
    shape: { preset: 'rounded_rectangle', borderRadius: 24 },
    background: {
      type: 'gradient',
      gradient: { type: 'linear', color1: '#090d16', color2: '#1e293b', direction: '145deg', position: 'center', opacity: 100 }
    },
    border: { style: 'solid', width: 1, color: '#f59e0b', opacity: 60 },
    shadow: { preset: 'xl' },
    typography: {
      title: { fontSize: 26, fontWeight: '800', color: '#fef3c7', lineHeight: 1.3, letterSpacing: '-0.01em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#d1d5db', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#f59e0b', textColor: '#0f172a', borderRadius: 14, shadow: 'glow', hoverBgColor: '#d97706' },
    hover: { enabled: true, scale: 1.02, translateY: -3 }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal (Surowy & Lekki)',
    description: 'Brak ciężkich cieni, dyskretne szarości i maksymalna prostota.',
    badge: 'Minimalizm',
    previewColor: '#64748b',
    shape: { preset: 'rectangle', borderRadius: 8 },
    background: { type: 'color', color: '#ffffff' },
    border: { style: 'solid', width: 1, color: '#f1f5f9' },
    shadow: { preset: 'none' },
    typography: {
      title: { fontSize: 22, fontWeight: '700', color: '#18181b', lineHeight: 1.3, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 13, fontWeight: '400', color: '#71717a', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#18181b', textColor: '#ffffff', borderRadius: 6, shadow: 'none', hoverBgColor: '#27272a' },
    hover: { enabled: true, scale: 1.00, translateY: -1 }
  },
  clean: {
    id: 'clean',
    name: 'Clean (Czysty & Przestronny)',
    description: 'Świeże jasne tła, miękkie zaokrąglenia i wysoki kontrast.',
    badge: 'Skandynawski',
    previewColor: '#0ea5e9',
    shape: { preset: 'rounded_rectangle', borderRadius: 20 },
    background: { type: 'color', color: '#f8fafc' },
    border: { style: 'solid', width: 1, color: '#e2e8f0' },
    shadow: { preset: 'sm' },
    typography: {
      title: { fontSize: 24, fontWeight: '800', color: '#0f172a', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#64748b', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#0ea5e9', textColor: '#ffffff', borderRadius: 12, shadow: 'sm', hoverBgColor: '#0284c7' },
    hover: { enabled: true, scale: 1.01, translateY: -2 }
  },
  glass: {
    id: 'glass',
    name: 'Glassmorphism (Szkło & Rozmycie)',
    description: 'Półprzezroczyste tło, rozmycie tła Backdrop Blur i rozświetlona krawędź.',
    badge: 'Nowoczesny Efekt',
    previewColor: '#8b5cf6',
    shape: { preset: 'heavy_rounded', borderRadius: 28 },
    background: {
      type: 'glassmorphism',
      glassmorphism: { blurPx: 20, opacity: 75, tintColor: 'rgba(255, 255, 255, 0.12)', borderHighlight: true }
    },
    border: { style: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.25)' },
    shadow: { preset: 'xl' },
    typography: {
      title: { fontSize: 26, fontWeight: '800', color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.01em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#e2e8f0', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: 'rgba(139, 92, 246, 0.9)', textColor: '#ffffff', borderRadius: 16, shadow: 'glow', hoverBgColor: '#7c3aed' },
    hover: { enabled: true, scale: 1.02, translateY: -3 }
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode (Głęboka Czerń)',
    description: 'Grafitowo-czarne powierzchnie, neonowe akcenty i wysoki kontrast w nocy.',
    badge: 'Ciemny Motyw',
    previewColor: '#1e293b',
    shape: { preset: 'rounded_rectangle', borderRadius: 20 },
    background: { type: 'color', color: '#0f172a' },
    border: { style: 'solid', width: 1, color: '#334155' },
    shadow: { preset: '2xl' },
    typography: {
      title: { fontSize: 24, fontWeight: '800', color: '#f8fafc', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#94a3b8', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#3b82f6', textColor: '#ffffff', borderRadius: 12, shadow: 'md', hoverBgColor: '#2563eb' },
    hover: { enabled: true, scale: 1.01, translateY: -2 }
  },
  light: {
    id: 'light',
    name: 'Light (Świetlisty & Pastelowy)',
    description: 'Ciepłe pastelowe tony, delikatne obramowania i przyjazna typografia.',
    badge: 'Ciepły Jasny',
    previewColor: '#f97316',
    shape: { preset: 'rounded_rectangle', borderRadius: 18 },
    background: {
      type: 'gradient',
      gradient: { type: 'linear', color1: '#fff7ed', color2: '#ffedd5', direction: '135deg', position: 'center', opacity: 100 }
    },
    border: { style: 'solid', width: 1, color: '#fed7aa' },
    shadow: { preset: 'md' },
    typography: {
      title: { fontSize: 24, fontWeight: '800', color: '#9a3412', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#c2410c', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#ea580c', textColor: '#ffffff', borderRadius: 10, shadow: 'sm', hoverBgColor: '#c2410c' },
    hover: { enabled: true, scale: 1.01, translateY: -2 }
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant (Szmaragd & Klasyka)',
    description: 'Głęboka zieleń szmaragdowa, subtelne cieniowanie i wyszukane linie.',
    badge: 'Klasyczny Styl',
    previewColor: '#059669',
    shape: { preset: 'rounded_rectangle', borderRadius: 22 },
    background: {
      type: 'gradient',
      gradient: { type: 'linear', color1: '#ecfdf5', color2: '#d1fae5', direction: '135deg', position: 'center', opacity: 100 }
    },
    border: { style: 'solid', width: 1, color: '#a7f3d0' },
    shadow: { preset: 'lg' },
    typography: {
      title: { fontSize: 25, fontWeight: '800', color: '#065f46', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#047857', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#059669', textColor: '#ffffff', borderRadius: 12, shadow: 'md', hoverBgColor: '#047857' },
    hover: { enabled: true, scale: 1.01, translateY: -2 }
  },
  marketplace: {
    id: 'marketplace',
    name: 'Marketplace (Dynamiczny Akcent)',
    description: 'Intensywny pomarańcz i błękit zoptymalizowany pod wysoką konwersję CTR.',
    badge: 'Wysoka Konwersja',
    previewColor: '#ff5a00',
    shape: { preset: 'rounded_rectangle', borderRadius: 16 },
    background: { type: 'color', color: '#ffffff' },
    border: { style: 'solid', width: 1, color: '#fed7aa' },
    shadow: { preset: 'lg' },
    typography: {
      title: { fontSize: 24, fontWeight: '800', color: '#111827', lineHeight: 1.3, letterSpacing: '-0.02em', textAlign: 'left', textTransform: 'none', textDecoration: 'none' },
      subtitle: { fontSize: 14, fontWeight: '500', color: '#4b5563', lineHeight: 1.5, letterSpacing: 'normal', textAlign: 'left', textTransform: 'none' }
    },
    button: { bgColor: '#ff5a00', textColor: '#ffffff', borderRadius: 10, shadow: 'md', hoverBgColor: '#e04f00' },
    hover: { enabled: true, scale: 1.02, translateY: -3 }
  }
};
