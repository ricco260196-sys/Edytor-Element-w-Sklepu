import {
  StoreAppearanceState,
  TopBarConfig,
  LogoConfig,
  MainMenuConfig,
  SearchBarConfig
} from '../types/storeAppearance';

export interface StylePreset {
  id: string;
  name: string;
  category?: string;
  description: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    border: string;
  };
  fontFamily?: string;
  shadow?: string;
  borderStyle?: string;
  gradient?: {
    enabled: boolean;
    from: string;
    to: string;
    degree: number;
  };
}

export const TOPBAR_STYLE_PRESETS: StylePreset[] = [
  {
    id: 'slate_pro',
    name: 'Ciemny Grafit (Domyślny PRO)',
    category: 'Ciemne',
    description: 'Profesjonalny grafitowy pasek z białym tekstem i bursztynowymi odznakami promocyjnymi.',
    colors: {
      bg: '#0f172a',
      text: '#f8fafc',
      accent: '#f59e0b',
      border: '#1e293b'
    },
    shadow: 'sm',
    borderStyle: 'solid'
  },
  {
    id: 'pure_black',
    name: 'Głęboka Czerń (OLED Black)',
    category: 'Ciemne',
    description: 'Minimalistyczny, smukły czarny pasek z wysokim kontrastem.',
    colors: {
      bg: '#000000',
      text: '#ffffff',
      accent: '#38bdf8',
      border: '#27272a'
    },
    shadow: 'none',
    borderStyle: 'solid'
  },
  {
    id: 'clean_light',
    name: 'Czysta Biel (Modern Minimal)',
    category: 'Jasne',
    description: 'Jasnoszary i śnieżnobiały pasek z ciemnymi napisami i niebieskimi akcentami.',
    colors: {
      bg: '#f8fafc',
      text: '#1e293b',
      accent: '#2563eb',
      border: '#e2e8f0'
    },
    shadow: 'sm',
    borderStyle: 'solid'
  },
  {
    id: 'sapphire_blue',
    name: 'Szafirowy Błękit (Corporate)',
    category: 'Kolorowe',
    description: 'Elegancki granat korporacyjny idealny dla hurtowni i platform B2B.',
    colors: {
      bg: '#1e3a8a',
      text: '#eff6ff',
      accent: '#fbbf24',
      border: '#172554'
    },
    shadow: 'md',
    gradient: {
      enabled: true,
      from: '#1e3a8a',
      to: '#172554',
      degree: 90
    }
  },
  {
    id: 'emerald_eco',
    name: 'Szmaragdowa Natura (Eco)',
    category: 'Kolorowe',
    description: 'Butelkowa zieleń dedykowana dla sklepów bio, ogrodniczych i naturalnych.',
    colors: {
      bg: '#064e3b',
      text: '#ecfdf5',
      accent: '#34d399',
      border: '#022c22'
    },
    shadow: 'sm'
  },
  {
    id: 'crimson_sale',
    name: 'Karmazynowa Wyprzedaż (Hot Sale)',
    category: 'Marketing',
    description: 'Intensywna czerwień generująca pilność zakupu i eksponująca promocje.',
    colors: {
      bg: '#991b1b',
      text: '#ffffff',
      accent: '#fef08a',
      border: '#7f1d1d'
    },
    shadow: 'glow'
  },
  {
    id: 'royal_purple',
    name: 'Królewski Fiolet (Luxury)',
    category: 'Premium',
    description: 'Głęboki fiolet ze złotymi odznakami i poświatą.',
    colors: {
      bg: '#3b0764',
      text: '#faf5ff',
      accent: '#fbbf24',
      border: '#2e1065'
    },
    shadow: 'md'
  },
  {
    id: 'cyber_gradient',
    name: 'Cyberpunk Neon Gradient',
    category: 'Nowoczesne',
    description: 'Dynamiczny gradient od indygo po fiolet z neonowymi wstawkami.',
    colors: {
      bg: '#1e1b4b',
      text: '#ffffff',
      accent: '#a855f7',
      border: '#312e81'
    },
    gradient: {
      enabled: true,
      from: '#1e1b4b',
      to: '#4c1d95',
      degree: 120
    }
  }
];

export const LOGO_PRESETS = [
  {
    id: 'preset_combined_pro',
    name: 'Nowoczesny Marketplace (Combined PRO)',
    category: 'Mieszane',
    description: 'Sygnet z torbą zakupową, bezszeryfowy pogrubiony napis i slogan.',
    config: {
      logoType: 'combined' as const,
      iconName: 'ShoppingBag',
      accentColor: '#2563eb',
      textName: 'MarketPlace PRO',
      showTagline: true,
      tagline: 'Oficjalna Platforma Handlowa',
      textFont: 'display' as const,
      textWeight: 'extrabold' as const,
      desktopHeight: 46,
      textColor: '#0f172a'
    }
  },
  {
    id: 'preset_dark_luxury',
    name: 'Ekskluzywny Butik (Dark Luxury)',
    category: 'Tekstowe',
    description: 'Klasyczny font szeryfowy z rozstrzelonymi literami i złotym akcentem.',
    config: {
      logoType: 'text' as const,
      textName: 'MARKETPLACE PRO',
      showTagline: true,
      tagline: 'PREMIUM SELECTION & BOUTIQUE',
      textFont: 'serif' as const,
      textWeight: 'bold' as const,
      textLetterSpacing: 'widest' as const,
      textTransform: 'uppercase' as const,
      desktopHeight: 44,
      textColor: '#0f172a'
    }
  },
  {
    id: 'preset_tech_gradient',
    name: 'Tech Innovator (Gradient Glow)',
    category: 'Nowoczesne',
    description: 'Wielokolorowy gradient z sygnetem błyskawicy i poświatą.',
    config: {
      logoType: 'combined' as const,
      iconName: 'Zap',
      accentColor: '#7c3aed',
      textName: 'MarketPlace AI',
      showTagline: true,
      tagline: 'Smart Shopping & Delivery 24h',
      gradientText: true,
      gradientFrom: '#2563eb',
      gradientTo: '#9333ea',
      textFont: 'sans' as const,
      textWeight: 'extrabold' as const,
      desktopHeight: 48
    }
  },
  {
    id: 'preset_eco_green',
    name: 'Natura & Eko (Green Lifestyle)',
    category: 'Ekologia',
    description: 'Soczysta szmaragdowa zieleń, sygnet z gwiazdą oraz lekki podtytuł.',
    config: {
      logoType: 'combined' as const,
      iconName: 'Sparkles',
      accentColor: '#059669',
      textName: 'OpenMarket BIO',
      showTagline: true,
      tagline: 'Produkty Naturalne & Regionalne',
      textFont: 'sans' as const,
      textWeight: 'bold' as const,
      desktopHeight: 44,
      textColor: '#064e3b'
    }
  }
];

export const MAIN_MENU_PRESETS = [
  {
    id: 'preset_menu_modern_pill',
    name: 'Nowoczesne Pigułki (Modern Pill)',
    category: 'Standard',
    description: 'Okrągłe, elastyczne pigułki hover z wyróżnionym przyciskiem kategorii.',
    config: {
      linkStyle: 'pill' as const,
      spacing: 'normal' as const,
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
      hoverColor: '#2563eb',
      categoryButtonBg: '#2563eb',
      categoryButtonTextCol: '#ffffff'
    }
  },
  {
    id: 'preset_menu_underline_minimal',
    name: 'Minimalistyczne Podkreślenie (Underline)',
    category: 'Minimal',
    description: 'Czysty tekst z animowaną kreską podkreślającą wybraną kategorię.',
    config: {
      linkStyle: 'underline' as const,
      spacing: 'relaxed' as const,
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      hoverColor: '#0284c7'
    }
  },
  {
    id: 'preset_menu_dark_header',
    name: 'Ciemna Nawigacja (Dark Navbar)',
    category: 'Ciemne',
    description: 'Grafitowe tło z jasnymi fontami i szmaragdowym przyciskiem CTA.',
    config: {
      linkStyle: 'pill' as const,
      spacing: 'normal' as const,
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      hoverColor: '#38bdf8',
      categoryButtonBg: '#1e293b',
      categoryButtonTextCol: '#ffffff'
    }
  },
  {
    id: 'preset_menu_glassmorphism',
    name: 'Szkło & Rozmycie (Glassmorphism)',
    category: 'Nowoczesne',
    description: 'Półprzezroczysty pasek z rozmyciem tła (Backdrop blur) idealny do sticky scroll.',
    config: {
      linkStyle: 'pill' as const,
      spacing: 'normal' as const,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      background: {
        glassmorphism: true,
        backdropBlur: 'md'
      },
      textColor: '#0f172a',
      hoverColor: '#2563eb'
    }
  }
];

export const SEARCHBAR_PRESETS = [
  {
    id: 'preset_search_pill_blue',
    name: 'Pigułka PRO (Niebieski Akcent)',
    displayMode: 'expanded' as const,
    description: 'Pełna pigułka z filtrem kategorii po lewej stronie i przyciskiem szukaj.',
    appearance: {
      backgroundColor: '#f8fafc',
      focusedBackgroundColor: '#ffffff',
      textColor: '#0f172a',
      placeholderColor: '#64748b',
      borderColor: '#cbd5e1',
      focusedBorderColor: '#2563eb',
      borderRadius: 20,
      shadow: 'sm' as const,
      buttonBgColor: '#2563eb',
      buttonTextColor: '#ffffff'
    },
    structure: {
      showSearchIcon: true,
      showSubmitButton: true,
      submitButtonText: 'Szukaj',
      showClearButton: true,
      showVoiceSearch: true,
      showQrScanner: false,
      showCategoryFilter: true,
      categoryFilterPosition: 'left' as const,
      placeholderText: 'Szukaj produktów, marek i kategorii...',
      placeholderRotatorEnabled: true,
      placeholderRotatorItems: ['Szukaj smartfonów 5G...', 'Szukaj słuchawek ANC...', 'Szukaj kurtek i obuwia...']
    }
  },
  {
    id: 'preset_search_minimal_dark',
    name: 'Ciemny Minimalizm (Dark Minimal)',
    displayMode: 'standard' as const,
    description: 'Ciemnoszary pasek bez zbędnych ramek z podświetleniem poświatą.',
    appearance: {
      backgroundColor: '#1e293b',
      focusedBackgroundColor: '#0f172a',
      textColor: '#ffffff',
      placeholderColor: '#94a3b8',
      borderColor: '#334155',
      focusedBorderColor: '#38bdf8',
      borderRadius: 12,
      shadow: 'glow' as const,
      buttonBgColor: '#0284c7',
      buttonTextColor: '#ffffff'
    },
    structure: {
      showSearchIcon: true,
      showSubmitButton: false,
      submitButtonText: 'Szukaj',
      showClearButton: true,
      showVoiceSearch: true,
      showQrScanner: true,
      showCategoryFilter: false,
      placeholderText: 'Wpisz nazwę produktu...',
      placeholderRotatorEnabled: false,
      placeholderRotatorItems: []
    }
  },
  {
    id: 'preset_search_compact',
    name: 'Kompaktowy Dyskretny',
    displayMode: 'compact' as const,
    description: 'Niski pasek (38px) zintegrowany z nagłówkiem sklepu.',
    appearance: {
      backgroundColor: '#f1f5f9',
      focusedBackgroundColor: '#ffffff',
      textColor: '#1e293b',
      placeholderColor: '#64748b',
      borderColor: '#e2e8f0',
      focusedBorderColor: '#2563eb',
      borderRadius: 8,
      shadow: 'none' as const,
      buttonBgColor: '#2563eb',
      buttonTextColor: '#ffffff'
    },
    structure: {
      showSearchIcon: true,
      showSubmitButton: true,
      submitButtonText: 'Szukaj',
      showClearButton: true,
      showVoiceSearch: false,
      showQrScanner: false,
      showCategoryFilter: false,
      placeholderText: 'Szukaj w sklepie...',
      placeholderRotatorEnabled: false,
      placeholderRotatorItems: []
    }
  }
];

export const defaultTopBarConfig: TopBarConfig = {
  enabled: true,
  elementId: 'storefront-topbar',
  position: 'normal',
  containerWidth: 100,
  containerPreset: 'full',
  containerMaxWidth: 1920,
  height: 'normal',
  customHeight: 40,
  paddingY: 4,
  paddingX: 16,
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
  accentColor: '#f59e0b',
  borderBottom: true,
  borderBottomColor: '#1e293b',
  borderBottomWidth: 1,
  borderTop: false,
  borderTopColor: '#1e293b',
  borderTopWidth: 1,
  borderStyle: 'solid',
  borderRadius: 0,
  gradientBackground: false,
  gradientFrom: '#0f172a',
  gradientTo: '#1e293b',
  gradientDegree: 90,
  glassmorphism: false,
  shadow: 'sm',
  showDividers: true,
  dividerStyle: 'line',
  announcementText: '🔥 Darmowa dostawa od 200 zł! | Wiosenne Rabaty do -40%',
  phone: '+48 515 444 577',
  email: 'kontakt@openmarket.pl',
  location: 'Warszawa, Polska',
  workingHours: 'Pn-Pt: 8:00 - 18:00',
  socialItems: [
    { platform: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
    { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
    { platform: 'youtube', url: 'https://youtube.com', label: 'YouTube' }
  ],
  zones: [
    {
      id: 'zone-1',
      name: 'Strefa Lewa (Ogłoszenia & Promo)',
      width: 38,
      widthType: 'percent',
      align: 'left',
      direction: 'row',
      flexWrap: 'nowrap',
      gap: 8,
      paddingX: 6,
      isLocked: false,
      isHidden: false,
      elements: [
        { id: 'promo', enabled: true }
      ]
    },
    {
      id: 'zone-2',
      name: 'Strefa Środkowa (Kontakt & Obsługa)',
      width: 32,
      widthType: 'percent',
      align: 'center',
      direction: 'row',
      flexWrap: 'nowrap',
      gap: 8,
      paddingX: 6,
      isLocked: false,
      isHidden: false,
      elements: [
        { id: 'phone', enabled: true },
        { id: 'separator-1', enabled: true },
        { id: 'email', enabled: true }
      ]
    },
    {
      id: 'zone-3',
      name: 'Strefa Prawa (Konto & Społeczność)',
      width: 30,
      widthType: 'percent',
      align: 'right',
      direction: 'row',
      flexWrap: 'nowrap',
      gap: 8,
      paddingX: 6,
      isLocked: false,
      isHidden: false,
      elements: [
        { id: 'social', enabled: true },
        { id: 'separator-2', enabled: true },
        { id: 'login', enabled: true }
      ]
    }
  ],
  elementSettings: {
    promo: {
      customText: '🔥 Darmowa dostawa od 200 zł! | Wiosenne Rabaty do -40%',
      customLink: '/promocje',
      customBadge: 'PROMO',
      customBadgeColor: '#ef4444',
      customBadgeTextColor: '#ffffff',
      target: '_self',
      customColor: '#ffffff',
      customFontSize: 'text-xs',
      customFontWeight: 'semibold'
    },
    phone: {
      customText: '+48 515 444 577',
      customLink: 'tel:515444577',
      iconColor: '#34d399',
      customColor: '#e2e8f0',
      customFontSize: 'text-xs'
    },
    email: {
      customText: 'kontakt@openmarket.pl',
      customLink: 'mailto:kontakt@openmarket.pl',
      iconColor: '#38bdf8',
      customColor: '#e2e8f0',
      customFontSize: 'text-xs'
    },
    social: {
      customFontSize: 'text-xs'
    },
    login: {
      customText: 'Zaloguj się',
      customLink: '/login',
      customColor: '#f8fafc',
      customBgColor: 'rgba(255, 255, 255, 0.1)',
      customBorderRadius: '6',
      customPadding: '2',
      customFontWeight: 'bold',
      customFontSize: 'text-xs'
    }
  },
  activePresetId: 'slate_pro',
  zIndex: 40
};

export const defaultLogoConfig: LogoConfig = {
  enabled: true,
  elementId: 'storefront-main-logo',
  cssClass: 'store-logo-link',
  logoType: 'combined',
  textName: 'MarketPlace PRO',
  showTagline: true,
  tagline: 'Oficjalna Platforma Handlowa',
  taglineColor: '#64748b',
  taglineFontSize: 11,
  taglineFontStyle: 'normal',
  textColor: '#0f172a',
  accentColor: '#2563eb',
  gradientText: false,
  gradientFrom: '#2563eb',
  gradientTo: '#7c3aed',
  textFont: 'display',
  textWeight: 'extrabold',
  customFontSize: 24,
  textTransform: 'none',
  textLetterSpacing: 'normal',
  iconName: 'ShoppingBag',
  sygnetPosition: 'left',
  sygnetSize: 36,
  desktopHeight: 46,
  mobileHeight: 32,
  maxWidth: 280,
  lockAspectRatio: true,
  offsetX: 0,
  offsetY: 0,
  paddingY: 4,
  paddingX: 8,
  alignment: 'left',
  showContainerBox: false,
  containerStyle: {
    enabled: false,
    backgroundType: 'none',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    borderType: 'none',
    borderRadius: 8,
    shadowType: 'none'
  },
  filters: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    grayscale: 0,
    opacity: 100,
    blur: 0,
    sepia: 0,
    hueRotate: 0
  },
  transform: {
    scale: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  },
  hoverEffect: 'scale',
  scrollConfig: {
    enabled: true,
    scrolledHeight: 34
  },
  useSameLogoOnAllDevices: true,
  hideOnDesktop: false,
  hideOnTablet: false,
  hideOnMobile: false,
  isLink: true,
  targetUrl: '/',
  openInNewTab: false,
  altText: 'MarketPlace Pro - Sklep Internetowy',
  ariaLabel: 'Strona Główna MarketPlace Pro',
  seoTitle: 'MarketPlace Pro - Największy wybór produktów',
  activePresetId: 'preset_combined_pro'
};

export const defaultMainMenuConfig: MainMenuConfig = {
  enabled: true,
  name: 'Menu Główne Sklepu',
  elementId: 'storefront-mainmenu',
  containerWidthType: 'standard',
  customWidthPx: 1280,
  heightPx: 52,
  paddingTop: 6,
  paddingBottom: 6,
  paddingLeft: 16,
  paddingRight: 16,
  itemGapPx: 6,
  horizontalAlign: 'between',
  positionMode: 'sticky',
  backgroundColor: '#ffffff',
  textColor: '#1e293b',
  hoverColor: '#2563eb',
  activeColor: '#1d4ed8',
  spacing: 'normal',
  linkStyle: 'pill',
  uppercase: false,
  sticky: true,
  fontFamily: 'sans',
  typography: {
    fontFamily: 'sans',
    fontWeight: '600',
    fontSize: 13
  },
  background: {
    color: '#ffffff',
    glassmorphism: false,
    backdropBlur: 'none'
  },
  border: {
    type: 'bottom',
    width: 1,
    style: 'solid',
    color: '#f1f5f9'
  },
  shadow: {
    type: 'sm'
  },
  dropdown: {
    openTrigger: 'hover',
    animationType: 'slide_down',
    openDelayMs: 80,
    closeDelayMs: 200,
    borderRadius: 16
  },
  scrollBehavior: {
    beforeScrollTransparent: false,
    scrolledBlur: true,
    scrollThresholdPx: 60,
    scrolledHeight: 48,
    scrolledBgColor: '#ffffff'
  },
  mobile: {
    type: 'drawer_left',
    drawerWidthPx: 320,
    backgroundColor: '#0f172a'
  },
  animations: {
    disableAll: false,
    hoverAnimation: 'subtle_scale',
    durationMs: 180
  },
  dynamicSync: {
    autoAddNewCategories: true,
    autoRemoveStale: true,
    sortOrder: 'popularity',
    lastSyncedAt: 'Wersja bazowa'
  },
  showCategoryDrawerButton: true,
  categoryButtonText: 'Wszystkie Kategorie',
  categoryButtonBg: '#2563eb',
  categoryButtonTextCol: '#ffffff',
  ctaButton: {
    enabled: true,
    label: 'Zostań Sprzedawcą',
    url: '/sprzedawaj',
    backgroundColor: '#059669',
    textColor: '#ffffff',
    icon: 'Store',
    borderRadius: 12
  },
  search: {
    enabled: false,
    placeholder: 'Szukaj w sklepie...'
  },
  items: [
    {
      id: 'item_shop_mega',
      label: 'Sklep & Kategorie',
      url: '/produkty',
      type: 'megamenu',
      icon: 'Layers',
      badge: 'HOT',
      badgeColor: '#ef4444',
      isExpandedInTree: true,
      megaMenu: {
        enabled: true,
        columnsCount: 4,
        widthMode: 'container',
        customWidthPx: 1240,
        minHeightPx: 300,
        padding: 24,
        gap: 20,
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        borderRadius: 16,
        shadow: 'xl',
        sections: [
          {
            id: 'sec_elektronika',
            title: 'Elektronika & IT',
            titleUrl: '/kategoria/elektronika',
            icon: 'Zap',
            items: [
              { id: 'i1', label: 'Smartfony i Akcesoria', url: '/kategoria/smartfony', isHot: true, badge: 'HOT', count: 420 },
              { id: 'i2', label: 'Laptopy i Komputery', url: '/kategoria/laptopy', count: 310 },
              { id: 'i3', label: 'Słuchawki & Audio Hi-Fi', url: '/kategoria/sluchawki', count: 280 },
              { id: 'i4', label: 'Strefa Gamingowa', url: '/kategoria/gaming', count: 220 }
            ]
          },
          {
            id: 'sec_moda',
            title: 'Moda & Styl',
            titleUrl: '/kategoria/moda',
            icon: 'Sparkles',
            items: [
              { id: 'i5', label: 'Kolekcja Męska', url: '/kategoria/odziez-meska', count: 780 },
              { id: 'i6', label: 'Kolekcja Damska', url: '/kategoria/odziez-damska', count: 940 },
              { id: 'i7', label: 'Obuwie i Sneakersy', url: '/kategoria/obuwie', count: 430 }
            ]
          },
          {
            id: 'sec_dom',
            title: 'Dom & Wnętrze',
            titleUrl: '/kategoria/dom-ogrod',
            icon: 'Home',
            items: [
              { id: 'i8', label: 'Meble i Wyposażenie', url: '/kategoria/meble', count: 520 },
              { id: 'i9', label: 'Oświetlenie Smart LED', url: '/kategoria/oswietlenie', count: 380 },
              { id: 'i10', label: 'Tekstylia i Dekoracje', url: '/kategoria/dekoracje', count: 460 }
            ]
          }
        ],
        promoBanner: {
          enabled: true,
          title: 'Wielka Wyprzedaż Wiosenna 2026',
          subtitle: 'Kupuj taniej do -40% z kuponem wiosennym',
          imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=80',
          targetUrl: '/promocje',
          badge: 'RABAT -40%',
          badgeBg: '#ef4444',
          ctaText: 'Zobacz Promocje'
        }
      },
      children: [
        { id: 'sub_elektronika', label: 'Elektronika & IT', url: '/kategoria/elektronika', icon: 'Zap', productCount: 1420 },
        { id: 'sub_moda', label: 'Moda & Styl', url: '/kategoria/moda', icon: 'Sparkles', productCount: 2150 },
        { id: 'sub_dom', label: 'Dom & Wnętrze', url: '/kategoria/dom-ogrod', icon: 'Home', productCount: 1680 }
      ]
    },
    {
      id: 'item_promotions',
      label: 'Promocje & Okazje',
      url: '/promocje',
      type: 'collection',
      icon: 'Tag',
      badge: 'SALE',
      badgeColor: '#ef4444',
      isExpandedInTree: true
    },
    {
      id: 'item_bestsellers',
      label: 'Bestsellery',
      url: '/bestsellery',
      type: 'collection',
      icon: 'TrendingUp',
      isExpandedInTree: false
    },
    {
      id: 'item_brands',
      label: 'Dla Sprzedawców',
      url: '/sprzedawaj',
      type: 'dropdown',
      icon: 'Store',
      isExpandedInTree: true,
      children: [
        { id: 'sub_seller_reg', label: 'Załóż Konto Sprzedawcy', url: '/sprzedawaj', icon: 'UserPlus' },
        { id: 'sub_seller_b2b', label: 'Strefa Biznesowa B2B', url: '/b2b', icon: 'Building2' },
        { id: 'sub_seller_api', label: 'Integracja API & Hurtownie', url: '/api-docs', icon: 'Code' }
      ]
    },
    {
      id: 'item_help',
      label: 'Pomoc & Kontakt',
      url: '/kontakt',
      type: 'page',
      icon: 'HelpCircle',
      isExpandedInTree: false
    }
  ],
  activePresetId: 'preset_menu_modern_pill'
};

export const defaultSearchBarConfig: SearchBarConfig = {
  enabled: true,
  displayMode: 'standard',
  activePresetId: 'preset_search_pill_blue',
  dimensions: {
    heightPx: 44,
    maxWidthPx: 680,
    zIndex: 40,
    widthType: 'auto',
    customWidthPx: 680
  },
  structure: {
    showSearchIcon: true,
    showSubmitButton: true,
    submitButtonText: 'Szukaj',
    submitButtonIcon: true,
    showClearButton: true,
    showVoiceSearch: true,
    showQrScanner: true,
    showCategoryFilter: true,
    categoryFilterPosition: 'left',
    selectedCategoryScope: 'all',
    placeholderText: 'Szukaj produktów, marek i kategorii...',
    placeholderRotatorEnabled: true,
    placeholderRotatorIntervalMs: 3800,
    placeholderRotatorItems: [
      'Szukaj smartfonów 5G...',
      'Szukaj słuchawek ANC bezprzewodowych...',
      'Szukaj laptopów do pracy i gier...',
      'Szukaj mody męskiej i damskiej...'
    ]
  },
  engine: {
    fuzzyMatching: true,
    diacriticsInsensitive: true,
    synonymsEnabled: true,
    highlightMatchingText: true,
    minCharsToTrigger: 2,
    debounceMs: 180,
    maxResultsCount: 8
  },
  suggestions: {
    enabled: true,
    showSearchHistory: true,
    maxHistoryItems: 5,
    popularSearches: [
      'Smartfony 5G',
      'Słuchawki bezprzewodowe',
      'Klawiatury mechaniczne',
      'Smartwatche GPS',
      'Plecaki skórzane'
    ],
    showTrendingBadges: true,
    showProductThumbnails: true,
    showPrice: true,
    showCategoryTag: true,
    showVendorName: true,
    showStockStatus: true
  },
  resultsDropdown: {
    maxHeightPx: 480,
    loadingSkeletonRows: 3,
    showViewAllButton: true,
    viewAllButtonLabel: 'Zobacz wszystkie pasujące oferty',
    quickAddCartButton: true,
    emptyStateTitle: 'Nie znaleziono pasujących produktów',
    emptyStateSubtitle: 'Sprawdź czy nie popełniłeś literówki lub spróbuj wpisać bardziej ogólne hasło.',
    emptyStateShowRecommendations: true
  },
  appearance: {
    backgroundColor: '#f8fafc',
    focusedBackgroundColor: '#ffffff',
    textColor: '#0f172a',
    placeholderColor: '#64748b',
    borderColor: '#e2e8f0',
    focusedBorderColor: '#2563eb',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 18,
    shadow: 'sm',
    focusGlowColor: 'rgba(37, 99, 235, 0.25)',
    buttonBgColor: '#2563eb',
    buttonTextColor: '#ffffff',
    buttonBorderRadius: 12,
    categoryFilterBg: 'transparent',
    categoryFilterText: '#334155',
    dropdownBgColor: '#ffffff',
    dropdownBorderColor: '#e2e8f0'
  },
  typography: {
    fontFamily: 'sans',
    fontSizePx: 13,
    fontWeight: '400'
  },
  animations: {
    expandOnFocus: true,
    pulseGlowOnActive: true,
    transitionDurationMs: 180
  },
  mobile: {
    autoFocusOnOpen: true,
    fullScreenModalOnMobile: true
  },
  accessibility: {
    keyboardShortcutsEnabled: true,
    shortcutKey: '/',
    ariaLabel: 'Wyszukiwarka produktów w sklepie',
    clearButtonAriaLabel: 'Wyczyść wpisaną frazę'
  },
  visibility: {
    desktop: true,
    tablet: true,
    mobile: true
  }
};

import { defaultButtonsConfig } from './defaultButtons';
import { defaultCategoriesConfig } from './defaultCategories';
import { defaultProductsGridConfig } from './defaultProductsGrid';
import { defaultWidgetsManagerConfig } from './defaultWidgets';
import { defaultBannersManagerConfig } from './defaultBanners';
import { defaultFooterConfig } from './defaultFooters';

export const initialAppearanceState: StoreAppearanceState = {
  topBar: defaultTopBarConfig,
  logo: defaultLogoConfig,
  mainMenu: defaultMainMenuConfig,
  searchBar: defaultSearchBarConfig,
  buttons: defaultButtonsConfig,
  categories: defaultCategoriesConfig,
  productsGrid: defaultProductsGridConfig,
  widgets: defaultWidgetsManagerConfig,
  banners: defaultBannersManagerConfig,
  footer: defaultFooterConfig
};

export const DEFAULT_TOP_BAR = defaultTopBarConfig;
export const DEFAULT_LOGO = defaultLogoConfig;
export const DEFAULT_MAIN_MENU = defaultMainMenuConfig;
export const DEFAULT_SEARCH_BAR = defaultSearchBarConfig;
export const DEFAULT_BUTTONS = defaultButtonsConfig;
export const DEFAULT_CATEGORIES = defaultCategoriesConfig;
export const DEFAULT_PRODUCTS_GRID = defaultProductsGridConfig;
export const DEFAULT_WIDGETS = defaultWidgetsManagerConfig;
export const DEFAULT_BANNERS = defaultBannersManagerConfig;
export const DEFAULT_FOOTER = defaultFooterConfig;
export { defaultButtonsConfig, defaultCategoriesConfig, defaultProductsGridConfig, defaultWidgetsManagerConfig, defaultBannersManagerConfig, defaultFooterConfig };


