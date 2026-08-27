import {
  FooterConfig,
  FooterPresetStyleName,
  FooterSectionItem,
  FooterContactItem,
  FooterSocialItem,
  FooterPaymentMethod,
  FooterTrustBadge
} from '../types/footerEditor';

export const defaultFooterSections: FooterSectionItem[] = [
  {
    id: 'sec_categories',
    type: 'links_column',
    title: 'Kategorie Sklepu',
    showTitle: true,
    enabled: true,
    order: 1,
    colSpan: 1,
    links: [
      { id: 'link_cat_1', text: 'Elektronika & Smartfony', url: '/kategoria/elektronika', isHidden: false, badgeText: 'HIT', badgeColor: '#3b82f6' },
      { id: 'link_cat_2', text: 'Moda i Akcesoria', url: '/kategoria/moda', isHidden: false },
      { id: 'link_cat_3', text: 'Dom i Ogród', url: '/kategoria/dom-ogrod', isHidden: false },
      { id: 'link_cat_4', text: 'Zdrowie i Uroda', url: '/kategoria/uroda', isHidden: false },
      { id: 'link_cat_5', text: 'Sport i Hobby', url: '/kategoria/sport', isHidden: false },
      { id: 'link_cat_6', text: 'Promocje & Outlet', url: '/promocje', isHidden: false, badgeText: '-40%', badgeColor: '#ef4444' }
    ]
  },
  {
    id: 'sec_customer_service',
    type: 'links_column',
    title: 'Obsługa Klienta',
    showTitle: true,
    enabled: true,
    order: 2,
    colSpan: 1,
    links: [
      { id: 'link_cs_1', text: 'Centrum Pomocy / FAQ', url: '/faq', isHidden: false },
      { id: 'link_cs_2', text: 'Śledzenie Przesyłki', url: '/sledzenie', isHidden: false },
      { id: 'link_cs_3', text: 'Dostawa i Płatności', url: '/dostawa', isHidden: false },
      { id: 'link_cs_4', text: 'Zwroty i Reklamacje (30 dni)', url: '/zwroty', isHidden: false },
      { id: 'link_cs_5', text: 'Tabela Rozmiarów', url: '/rozmiary', isHidden: false },
      { id: 'link_cs_6', text: 'Program Lojalnościowy', url: '/klub', isHidden: false }
    ]
  },
  {
    id: 'sec_about_company',
    type: 'links_column',
    title: 'O Nas i Informacje',
    showTitle: true,
    enabled: true,
    order: 3,
    colSpan: 1,
    links: [
      { id: 'link_about_1', text: 'O Platformie Marketplace', url: '/o-nas', isHidden: false },
      { id: 'link_about_2', text: 'Kariera i Praca', url: '/kariera', isHidden: false, badgeText: 'Zatrudniamy', badgeColor: '#10b981' },
      { id: 'link_about_3', text: 'Dla Sprzedawców / B2B', url: '/sprzedawaj', isHidden: false },
      { id: 'link_about_4', text: 'Program Partnerski', url: '/afiliacja', isHidden: false },
      { id: 'link_about_5', text: 'Blog i Poradniki Zakupowe', url: '/blog', isHidden: false },
      { id: 'link_about_6', text: 'Zrównoważony Rozwój (Eco)', url: '/eko', isHidden: false }
    ]
  }
];

export const defaultContactItems: FooterContactItem[] = [
  {
    id: 'contact_phone',
    type: 'phone',
    label: 'Infolinia i Wsparcie',
    value: '+48 22 123 45 67',
    icon: 'PhoneCall',
    subtext: 'Pon - Pt: 8:00 - 20:00',
    linkUrl: 'tel:+48221234567'
  },
  {
    id: 'contact_email',
    type: 'email',
    label: 'Napisz do nas',
    value: 'pomoc@marketpro.pl',
    icon: 'Mail',
    subtext: 'Odpowiedź do 2 godzin',
    linkUrl: 'mailto:pomoc@marketpro.pl'
  },
  {
    id: 'contact_address',
    type: 'address',
    label: 'Siedziba Główna',
    value: 'ul. Innowacyjna 42, 00-001 Warszawa',
    icon: 'MapPin',
    subtext: 'Polska'
  },
  {
    id: 'contact_hours',
    type: 'hours',
    label: 'Magazyn & Wysyłki',
    value: 'Wysyłka 24/7',
    icon: 'Clock',
    subtext: '99.4% dostaw w 24h'
  }
];

export const defaultSocialItems: FooterSocialItem[] = [
  { id: 'soc_fb', platform: 'facebook', url: 'https://facebook.com', label: 'Facebook', iconColor: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.15)', hoverEffect: 'lift' },
  { id: 'soc_ig', platform: 'instagram', url: 'https://instagram.com', label: 'Instagram', iconColor: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)', hoverEffect: 'lift' },
  { id: 'soc_yt', platform: 'youtube', url: 'https://youtube.com', label: 'YouTube', iconColor: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)', hoverEffect: 'lift' },
  { id: 'soc_tt', platform: 'tiktok', url: 'https://tiktok.com', label: 'TikTok', iconColor: '#00f2fe', bgColor: 'rgba(0, 242, 254, 0.15)', hoverEffect: 'lift' },
  { id: 'soc_x', platform: 'twitter_x', url: 'https://x.com', label: 'X (Twitter)', iconColor: '#ffffff', bgColor: 'rgba(255, 255, 255, 0.1)', hoverEffect: 'lift' },
  { id: 'soc_in', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn', iconColor: '#0ea5e9', bgColor: 'rgba(14, 165, 233, 0.15)', hoverEffect: 'lift' }
];

export const defaultPaymentMethods: FooterPaymentMethod[] = [
  { id: 'pm_blik', methodId: 'blik', label: 'BLIK', enabled: true },
  { id: 'pm_visa', methodId: 'visa', label: 'Visa', enabled: true },
  { id: 'pm_mc', methodId: 'mastercard', label: 'Mastercard', enabled: true },
  { id: 'pm_p24', methodId: 'p24', label: 'Przelewy24', enabled: true },
  { id: 'pm_payu', methodId: 'payu', label: 'PayU', enabled: true },
  { id: 'pm_apple', methodId: 'apple_pay', label: 'Apple Pay', enabled: true },
  { id: 'pm_google', methodId: 'google_pay', label: 'Google Pay', enabled: true },
  { id: 'pm_paypal', methodId: 'paypal', label: 'PayPal', enabled: true },
  { id: 'pm_klarna', methodId: 'klarna', label: 'Klarna', enabled: true }
];

export const defaultTrustBadges: FooterTrustBadge[] = [
  {
    id: 'badge_ssl',
    title: 'Szyfrowanie SSL 256-bit',
    subtitle: '100% Bezpieczne płatności online',
    iconName: 'ShieldCheck',
    enabled: true
  },
  {
    id: 'badge_return',
    title: 'Darmowy Zwrot 30 Dni',
    subtitle: 'Bezproblemowa wymiana i zwrot środków',
    iconName: 'RotateCcw',
    enabled: true
  },
  {
    id: 'badge_shipping',
    title: 'Błyskawiczna Dostawa 24h',
    subtitle: 'Darmowa wysyłka dla zamówień od 150 zł',
    iconName: 'Truck',
    enabled: true
  },
  {
    id: 'badge_support',
    title: 'Wsparcie Ekspertów',
    subtitle: 'Pomoc w wyborze i obsługa posprzedażowa',
    iconName: 'Headphones',
    enabled: true
  }
];

export const defaultFooterConfig: FooterConfig = {
  enabled: true,
  elementId: 'store-main-footer',
  name: 'Główna Stopka Sklepu',
  
  // 3, 4. Rozmiar & Szerokość
  size: {
    backgroundWidth: 'full',
    contentWidth: 'wide_1400',
    minHeight: '420px',
    padding: { top: 64, right: 32, bottom: 32, left: 32, isLocked: false },
    margin: { top: 0, right: 0, bottom: 0, left: 0, isLocked: true }
  },

  // 5. Kształt
  shape: {
    preset: 'rounded',
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    useIndividualCorners: true,
    clipPath: 'none'
  },

  // 6, 7, 8. Tło, Gradient & Obraz
  background: {
    type: 'color',
    color: '#090d16',
    gradient: {
      type: 'linear',
      colors: ['#0f172a', '#030712'],
      angle: 180,
      opacity: 100
    },
    image: {
      url: '',
      fit: 'cover',
      position: 'center',
      repeat: 'no-repeat',
      opacity: 100
    },
    glassmorphism: {
      enabled: false,
      blurPx: 16,
      opacity: 90,
      highlight: true,
      borderGlow: false
    }
  },

  // 9. Overlay
  overlay: {
    enabled: false,
    type: 'color',
    color: '#000000',
    gradient: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)'],
    opacity: 40,
    blendMode: 'multiply'
  },

  // 10. Obramowanie
  border: {
    style: 'solid',
    color: 'rgba(255, 255, 255, 0.08)',
    width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
    opacity: 100
  },

  // 11. Cień
  shadow: {
    preset: 'xl',
    x: 0,
    y: -8,
    blur: 32,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.35)',
    opacity: 100,
    inset: false
  },

  // 12, 16. Kolumny & Układ
  layout: {
    columnsCountDesktop: 4,
    columnsCountTablet: 2,
    columnsCountMobile: 1,
    gapDesktopX: 40,
    gapDesktopY: 48,
    gapTabletX: 32,
    gapTabletY: 36,
    gapMobileX: 20,
    gapMobileY: 28,
    alignItems: 'start',
    justifyContent: 'between'
  },

  // 14, 15. Brand (Logo + Opis)
  brand: {
    enabled: true,
    logoType: 'combined',
    logoUrl: '',
    logoText: 'MarketPlace Pro',
    logoWidthPx: 180,
    logoHeightPx: 42,
    tagline: 'Twoje Centrum Nowoczesnych Zakupów',
    description: 'Największa platforma handlowa łącząca zweryfikowanych sprzedawców z milionami zadowolonych klientów. Bezpieczeństwo, ekspresowa dostawa i gwarancja najlepszych cen każdego dnia.',
    showLogo: true,
    showDescription: true,
    linkUrl: '/'
  },

  // 17, 18, 26. Typografia
  typography: {
    headings: {
      fontFamily: 'sans',
      fontSizePx: 16,
      fontWeight: '700',
      color: '#ffffff',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
      showUnderlineAccent: true,
      underlineAccentColor: '#3b82f6'
    },
    body: {
      fontFamily: 'sans',
      fontSizePx: 14,
      fontWeight: '400',
      color: '#94a3b8',
      lineHeight: 1.6
    },
    links: {
      normal: {
        color: '#94a3b8',
        fontSizePx: 14,
        fontWeight: '400',
        textDecoration: 'none'
      },
      hover: {
        color: '#60a5fa',
        textDecoration: 'none',
        opacity: 1,
        translateX: 4
      },
      active: {
        color: '#3b82f6',
        textDecoration: 'none'
      }
    },
    copyright: {
      fontFamily: 'sans',
      fontSizePx: 13,
      color: '#64748b'
    }
  },

  // Dynamiczne sekcje z linkami
  sections: defaultFooterSections,

  // 19, 20. Kontakt
  contact: {
    enabled: true,
    title: 'Centrum Kontaktu',
    items: defaultContactItems,
    layout: 'vertical',
    iconSizePx: 18,
    iconColor: '#38bdf8',
    iconBgColor: 'rgba(56, 189, 248, 0.12)',
    iconBorderRadius: 8,
    showIcons: true
  },

  // 21. Social Media
  socialMedia: {
    enabled: true,
    title: 'Bądźmy w Kontakcie',
    items: defaultSocialItems,
    style: 'rounded',
    iconSizePx: 18,
    color: '#ffffff',
    bgColor: 'rgba(255, 255, 255, 0.08)',
    hoverBgColor: '#2563eb',
    hoverColor: '#ffffff',
    hoverEffect: 'lift',
    alignment: 'left'
  },

  // 22. Newsletter
  newsletter: {
    enabled: true,
    title: 'Zapisz się do Klubu VIP',
    subtitle: 'Odbierz 50 zł rabatu na pierwsze zakupy i zgarniaj oferty specjalne przed innymi.',
    placeholder: 'Wpisz swój adres e-mail...',
    buttonText: 'Odbierz Rabat',
    buttonBgColor: '#2563eb',
    buttonTextColor: '#ffffff',
    buttonHoverBgColor: '#1d4ed8',
    inputBgColor: '#1e293b',
    inputTextColor: '#ffffff',
    inputBorderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    badgeText: 'KOD: WITAJ50',
    showTermsConsent: true,
    termsConsentText: 'Wyrażam zgodę na otrzymywanie informacji handlowych i akceptuję Politykę Prywatności.',
    cardStyle: 'card'
  },

  // 23. Ikony płatności
  payments: {
    enabled: true,
    title: 'Obsługiwane Metody Płatności',
    methods: defaultPaymentMethods,
    iconStyle: 'badge',
    size: 'md',
    opacity: 100,
    alignment: 'left'
  },

  // 24. Badges / Certyfikaty zaufania
  trustBadges: {
    enabled: true,
    title: 'Gwarancja Jakości i Bezpieczeństwa',
    items: defaultTrustBadges,
    alignment: 'center',
    style: 'card'
  },

  // 25. Dolny pasek
  bottomBar: {
    enabled: true,
    copyrightText: 'Wszelkie prawa zastrzeżone.',
    autoYear: true,
    storeName: 'MarketPlace Pro Sp. z o.o.',
    showDivider: true,
    dividerColor: 'rgba(255, 255, 255, 0.08)',
    dividerStyle: 'solid',
    bgColor: '#050811',
    textColor: '#64748b',
    paddingY: 20,
    legalLinks: [
      { id: 'leg_terms', text: 'Regulamin Sklepu', url: '/regulamin' },
      { id: 'leg_privacy', text: 'Polityka Prywatności', url: '/polityka-prywatnosci' },
      { id: 'leg_cookies', text: 'Ustawienia Cookies', url: '/cookies' },
      { id: 'leg_rodo', text: 'Klauzula Informacyjna RODO', url: '/rodo' }
    ],
    showPaymentIconsInBottomBar: true,
    alignment: 'between'
  },

  // 31, 32. Responsywność & Mobile
  responsive: {
    tablet: {
      columnsCount: 2,
      padding: { top: 48, right: 24, bottom: 24, left: 24, isLocked: false },
      fontSizeReductionPercent: 0
    },
    mobile: {
      columnsCount: 1,
      layoutMode: 'accordion',
      accordionAutoCollapse: true,
      padding: { top: 36, right: 16, bottom: 20, left: 16, isLocked: false },
      hideSocials: false,
      hideBadges: false,
      hideNewsletter: false
    }
  },

  // 30. Animacje
  animations: {
    enabled: true,
    type: 'fade',
    durationMs: 400,
    staggerDelayMs: 60
  },

  activePreset: 'modern'
};

// 36. GOTOWE PRESETY STYLÓW STOPKI
export const FOOTER_PRESETS: Record<FooterPresetStyleName, Partial<FooterConfig>> = {
  modern: {
    activePreset: 'modern',
    name: 'Modern Dark Indigo',
    background: {
      type: 'color',
      color: '#090d16',
      gradient: { type: 'linear', colors: ['#0f172a', '#030712'], angle: 180, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 16, opacity: 90, highlight: true, borderGlow: false }
    },
    border: {
      style: 'solid',
      color: 'rgba(255, 255, 255, 0.08)',
      width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'rounded',
      borderRadius: 24,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: true,
      clipPath: 'none'
    },
    typography: {
      ...defaultFooterConfig.typography,
      headings: { ...defaultFooterConfig.typography.headings, color: '#ffffff', underlineAccentColor: '#3b82f6' },
      links: { ...defaultFooterConfig.typography.links, hover: { color: '#60a5fa', textDecoration: 'none', opacity: 1, translateX: 4 } }
    },
    newsletter: {
      ...defaultFooterConfig.newsletter,
      buttonBgColor: '#2563eb',
      buttonTextColor: '#ffffff',
      inputBgColor: '#1e293b'
    }
  },

  premium: {
    activePreset: 'premium',
    name: 'Premium Luxury Gold & Obsidian',
    background: {
      type: 'gradient',
      color: '#050505',
      gradient: { type: 'linear', colors: ['#12100e', '#000000'], angle: 135, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 20, opacity: 95, highlight: true, borderGlow: true }
    },
    border: {
      style: 'solid',
      color: 'rgba(217, 119, 6, 0.35)',
      width: { top: 2, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'rounded',
      borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: true,
      clipPath: 'none'
    },
    typography: {
      ...defaultFooterConfig.typography,
      headings: { ...defaultFooterConfig.typography.headings, color: '#fef08a', underlineAccentColor: '#d97706', fontFamily: 'display' },
      links: { ...defaultFooterConfig.typography.links, normal: { ...defaultFooterConfig.typography.links.normal, color: '#d4d4d8' }, hover: { color: '#fbbf24', textDecoration: 'underline', opacity: 1, translateX: 3 } }
    },
    newsletter: {
      ...defaultFooterConfig.newsletter,
      buttonBgColor: '#d97706',
      buttonTextColor: '#000000',
      buttonHoverBgColor: '#b45309',
      inputBgColor: '#1c1917',
      inputBorderColor: 'rgba(217, 119, 6, 0.4)'
    }
  },

  minimal: {
    activePreset: 'minimal',
    name: 'Minimal Monochromatic Clean',
    background: {
      type: 'color',
      color: '#0a0a0a',
      gradient: { type: 'linear', colors: ['#171717', '#0a0a0a'], angle: 180, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 0, opacity: 100, highlight: false, borderGlow: false }
    },
    border: {
      style: 'solid',
      color: 'rgba(255, 255, 255, 0.12)',
      width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'rectangle',
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: false,
      clipPath: 'none'
    },
    typography: {
      ...defaultFooterConfig.typography,
      headings: { ...defaultFooterConfig.typography.headings, color: '#f5f5f5', showUnderlineAccent: false },
      links: { ...defaultFooterConfig.typography.links, normal: { ...defaultFooterConfig.typography.links.normal, color: '#a3a3a3' }, hover: { color: '#ffffff', textDecoration: 'underline', opacity: 1, translateX: 0 } }
    }
  },

  clean: {
    activePreset: 'clean',
    name: 'Clean Slate Studio',
    background: {
      type: 'color',
      color: '#1e293b',
      gradient: { type: 'linear', colors: ['#334155', '#1e293b'], angle: 180, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 12, opacity: 90, highlight: false, borderGlow: false }
    },
    border: {
      style: 'solid',
      color: 'rgba(255, 255, 255, 0.1)',
      width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'rounded',
      borderRadius: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: true,
      clipPath: 'none'
    }
  },

  dark: {
    activePreset: 'dark',
    name: 'Dark Obsidian Cyber',
    background: {
      type: 'color',
      color: '#020617',
      gradient: { type: 'radial', colors: ['#0f172a', '#020617'], angle: 0, position: 'center top', opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 0, opacity: 100, highlight: false, borderGlow: false }
    },
    border: {
      style: 'solid',
      color: 'rgba(56, 189, 248, 0.25)',
      width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'extra_rounded',
      borderRadius: 32,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: true,
      clipPath: 'none'
    }
  },

  light: {
    activePreset: 'light',
    name: 'Light Crisp Paper',
    background: {
      type: 'color',
      color: '#f8fafc',
      gradient: { type: 'linear', colors: ['#ffffff', '#f1f5f9'], angle: 180, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 0, opacity: 100, highlight: false, borderGlow: false }
    },
    border: {
      style: 'solid',
      color: '#e2e8f0',
      width: { top: 1, right: 0, bottom: 0, left: 0, isLocked: false },
      opacity: 100
    },
    typography: {
      headings: {
        fontFamily: 'sans',
        fontSizePx: 16,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
        showUnderlineAccent: true,
        underlineAccentColor: '#2563eb'
      },
      body: {
        fontFamily: 'sans',
        fontSizePx: 14,
        fontWeight: '400',
        color: '#475569',
        lineHeight: 1.6
      },
      links: {
        normal: {
          color: '#64748b',
          fontSizePx: 14,
          fontWeight: '500',
          textDecoration: 'none'
        },
        hover: {
          color: '#2563eb',
          textDecoration: 'none',
          opacity: 1,
          translateX: 3
        },
        active: {
          color: '#1d4ed8',
          textDecoration: 'none'
        }
      },
      copyright: {
        fontFamily: 'sans',
        fontSizePx: 13,
        color: '#94a3b8'
      }
    },
    newsletter: {
      ...defaultFooterConfig.newsletter,
      buttonBgColor: '#2563eb',
      buttonTextColor: '#ffffff',
      inputBgColor: '#ffffff',
      inputTextColor: '#0f172a',
      inputBorderColor: '#cbd5e1'
    },
    bottomBar: {
      ...defaultFooterConfig.bottomBar,
      bgColor: '#f1f5f9',
      textColor: '#64748b',
      dividerColor: '#e2e8f0'
    }
  },

  glass: {
    activePreset: 'glass',
    name: 'Glassmorphism Frost Glow',
    background: {
      type: 'glassmorphism',
      color: 'rgba(15, 23, 42, 0.75)',
      gradient: { type: 'linear', colors: ['rgba(30, 41, 59, 0.85)', 'rgba(15, 23, 42, 0.85)'], angle: 135, opacity: 85 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: true, blurPx: 20, opacity: 85, highlight: true, borderGlow: true }
    },
    border: {
      style: 'solid',
      color: 'rgba(255, 255, 255, 0.15)',
      width: { top: 1, right: 1, bottom: 0, left: 1, isLocked: false },
      opacity: 100
    },
    shape: {
      preset: 'rounded',
      borderRadius: 28,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      useIndividualCorners: true,
      clipPath: 'none'
    }
  },

  elegant: {
    activePreset: 'elegant',
    name: 'Editorial Serif Elegant',
    background: {
      type: 'color',
      color: '#18181b',
      gradient: { type: 'linear', colors: ['#27272a', '#18181b'], angle: 180, opacity: 100 },
      image: { url: '', fit: 'cover', position: 'center', repeat: 'no-repeat', opacity: 100 },
      glassmorphism: { enabled: false, blurPx: 0, opacity: 100, highlight: false, borderGlow: false }
    },
    typography: {
      ...defaultFooterConfig.typography,
      headings: { ...defaultFooterConfig.typography.headings, fontFamily: 'serif', color: '#fafafa', textTransform: 'none', fontSizePx: 18 },
      body: { ...defaultFooterConfig.typography.body, fontFamily: 'serif' }
    }
  },

  marketplace: {
    activePreset: 'marketplace',
    name: 'Marketplace Mega Footer',
    size: {
      backgroundWidth: 'full',
      contentWidth: 'wide_1400',
      minHeight: '480px',
      padding: { top: 72, right: 32, bottom: 32, left: 32, isLocked: false },
      margin: { top: 0, right: 0, bottom: 0, left: 0, isLocked: true }
    },
    layout: {
      columnsCountDesktop: 4,
      columnsCountTablet: 2,
      columnsCountMobile: 1,
      gapDesktopX: 48,
      gapDesktopY: 48,
      gapTabletX: 32,
      gapTabletY: 36,
      gapMobileX: 20,
      gapMobileY: 28,
      alignItems: 'start',
      justifyContent: 'between'
    }
  }
};
