import {
  BannerInstance,
  BannersManagerConfig,
  MainSliderDedicatedConfig,
  BannerPresetStyleName,
  BannerShapeConfig,
  BannerBackgroundConfig,
  BannerBorderConfig,
  BannerShadowConfig,
  BannerTypographyConfig,
  BannerImageConfig,
  BannerCtaButtonConfig
} from '../types/bannerEditor';

export const BANNER_PHOTO_LIBRARY = [
  {
    id: 'photo-1',
    title: 'Elektronika & Gadżety Premium',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    category: 'Elektronika'
  },
  {
    id: 'photo-2',
    title: 'Smartwatch & Akcesoria',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
    category: 'Elektronika'
  },
  {
    id: 'photo-3',
    title: 'Moda Męska & Akcesoria',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop&q=80',
    category: 'Moda'
  },
  {
    id: 'photo-4',
    title: 'Minimalistyczne Wnętrza & Dom',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80',
    category: 'Dom i Ogród'
  },
  {
    id: 'photo-5',
    title: 'Sport & Aktywny Tryb Życia',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    category: 'Sport'
  },
  {
    id: 'photo-6',
    title: 'Ekologia & Zielona Przyszłość',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    category: 'Ekologia'
  },
  {
    id: 'photo-7',
    title: 'Cyberpunk & Gaming Setup',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    category: 'Gaming'
  },
  {
    id: 'photo-8',
    title: 'Kosmetyki & Pielęgnacja',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    category: 'Uroda'
  }
];

export const defaultMainSliderConfig: MainSliderDedicatedConfig = {
  enabled: true,
  autoplay: true,
  autoplayIntervalMs: 5000,
  pauseOnHover: true,
  transitionEffect: 'slide',
  transitionDurationMs: 600,
  showArrows: true,
  arrowsStyle: 'circle',
  showDots: true,
  dotsStyle: 'dots',
  heightDesktopPx: 480,
  heightTabletPx: 380,
  heightMobilePx: 290,
  borderRadius: 20,
  slides: [
    {
      id: 'slide-1',
      title: 'Nowa Kolekcja Smart Audio 2026',
      subtitle: 'Niezrównana czystość dźwięku i bezprzewodowa swoboda przez cały dzień.',
      badge: 'PREMIERA SEZONU',
      buttonText: 'Odkryj Nowości',
      buttonLink: '/kategoria/elektronika',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
      bgGradient: 'from-slate-950 via-slate-900/80 to-transparent',
      textColor: '#ffffff',
      isActive: true
    },
    {
      id: 'slide-2',
      title: 'Wielka Wyprzedaż Wiosenna do -50%',
      subtitle: 'Tysiące produktów w bezkonkurencyjnych cenach hurtowych i detalicznych.',
      badge: 'MEGA RABATY',
      buttonText: 'Przejdź do Promocji',
      buttonLink: '/promocje',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
      bgGradient: 'from-blue-950 via-indigo-950/80 to-transparent',
      textColor: '#ffffff',
      isActive: true
    },
    {
      id: 'slide-3',
      title: 'Klub Korzyści Marketplace VIP',
      subtitle: 'Darmowa dostawa bez limitu i priorytetowa realizacja każdego zamówienia.',
      badge: 'STREFA VIP',
      buttonText: 'Dołącz do Klubu',
      buttonLink: '/vip',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80',
      bgGradient: 'from-purple-950 via-slate-900/80 to-transparent',
      textColor: '#ffffff',
      isActive: true
    }
  ]
};

export const defaultBannerInstances: BannerInstance[] = [
  // 1. Obrazek + Opis (Image + Text layout)
  {
    id: 'banner_img_text_1',
    name: 'Obrazek + Opis: Nowoczesny Design',
    displayName: 'Obrazek + Opis (Prezentacja Produktu)',
    type: 'image_text',
    enabled: true,
    badge: 'Standard',
    categoryLabel: 'Prezentacja',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'NOWOŚĆ 2026',
      badgeBgColor: '#3b82f6',
      badgeTextColor: '#ffffff',
      title: 'Minimalistyczny Design & Najwyższa Wydajność',
      subtitle: 'Połączenie estetyki skandynawskiej z zaawansowaną technologią audio. Poczuj każdy detal brzmienia w domowym zaciszu lub podczas podróży.',
      highlightText: 'Darmowa dostawa od 150 zł'
    },
    shape: {
      preset: 'rounded_rectangle',
      borderRadius: 16,
      individualCorners: false,
      corners: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'auto',
      heightValue: 'auto',
      unit: 'px'
    },
    background: {
      type: 'color',
      color: '#0f172a',
      opacity: 100
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 20,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: '#334155',
      opacity: 100,
      hoverColor: '#3b82f6'
    },
    shadow: {
      preset: 'lg',
      enabled: true,
      x: 0,
      y: 10,
      blur: 25,
      spread: -5,
      color: 'rgba(0,0,0,0.5)',
      opacity: 100
    },
    spacing: {
      margin: { top: 16, right: 0, bottom: 16, left: 0 },
      padding: { top: 32, right: 32, bottom: 32, left: 32 },
      gap: 32
    },
    image: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      altText: 'Słuchawki Studio Wireless',
      aspectRatio: '4:3',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 12,
      opacity: 100,
      border: {
        style: 'none',
        width: 0,
        color: '#ffffff'
      },
      shadow: {
        preset: 'md'
      },
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    layout: {
      direction: 'image_left',
      imageProportion: 45,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'sans',
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 14,
        fontWeight: '400',
        color: '#94a3b8',
        lineHeight: 1.6,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1.2,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Zobacz specyfikację',
      link: '/katalog',
      iconName: 'ArrowRight',
      iconPosition: 'right',
      position: 'left',
      width: 'auto',
      padding: { top: 10, bottom: 10, left: 20, right: 20 },
      appearance: {
        textColor: '#ffffff',
        bgColor: '#2563eb',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      },
      hover: {
        bgColor: '#1d4ed8',
        scale: 1.03
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'lift',
      scale: 1.01,
      translateY: -3,
      brightness: 102,
      borderColor: '#3b82f6',
      transitionDurationMs: 250
    },
    animation: {
      type: 'fade',
      durationMs: 400,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: {
        gap: 20,
        layoutDirection: 'image_left',
        titleFontSize: 20
      },
      mobile: {
        gap: 16,
        layoutDirection: 'image_top',
        titleFontSize: 18,
        padding: { top: 20, right: 16, bottom: 20, left: 16 }
      }
    },
    activePreset: 'modern'
  },

  // 2. Obraz (Image Only)
  {
    id: 'banner_image_only_1',
    name: 'Obraz: Pełna Grafika Reklamowa',
    displayName: 'Obraz (Pojedyncza Grafika)',
    type: 'image_only',
    enabled: true,
    badge: 'Media',
    categoryLabel: 'Grafika',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
    content: {
      title: 'Smartwatch Seria X Pro',
      subtitle: 'Oficjalny plakat produktowy',
      badgeText: ''
    },
    shape: {
      preset: 'rounded_rectangle',
      borderRadius: 18,
      individualCorners: false,
      corners: { topLeft: 18, topRight: 18, bottomRight: 18, bottomLeft: 18 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'fixed',
      heightValue: '340px',
      unit: 'px'
    },
    background: {
      type: 'transparent',
      color: '#000000',
      opacity: 0
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 0,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: '#1e293b',
      opacity: 100
    },
    shadow: {
      preset: 'xl',
      enabled: true,
      x: 0,
      y: 12,
      blur: 30,
      spread: -4,
      color: 'rgba(0,0,0,0.6)',
      opacity: 100
    },
    spacing: {
      margin: { top: 12, right: 0, bottom: 12, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      gap: 0
    },
    image: {
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
      altText: 'Smartwatch Seria X Pro',
      aspectRatio: '21:9',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 18,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 105,
        saturation: 105
      }
    },
    layout: {
      direction: 'image_top',
      imageProportion: 100,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'sans',
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 1.3,
        letterSpacing: '0',
        textAlign: 'center',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 13,
        fontWeight: '400',
        color: '#94a3b8',
        lineHeight: 1.4,
        letterSpacing: '0',
        textAlign: 'center',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 10,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0',
        textAlign: 'center',
        textTransform: 'none'
      }
    },
    cta: {
      show: false,
      text: 'Sprawdź',
      link: '#',
      position: 'center',
      width: 'auto',
      padding: { top: 8, bottom: 8, left: 16, right: 16 },
      appearance: {
        textColor: '#ffffff',
        bgColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 8,
        shadow: 'none'
      },
      hover: { scale: 1.02 },
      active: { scale: 0.98 }
    },
    hover: {
      effect: 'zoom_image',
      scale: 1.01,
      translateY: -2,
      brightness: 105,
      transitionDurationMs: 300
    },
    animation: {
      type: 'fade',
      durationMs: 350,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: false,
      showSubtitle: false,
      showBadge: false,
      showCtaButton: false
    },
    responsive: {
      tablet: { height: '280px' },
      mobile: { height: '200px' }
    },
    activePreset: 'clean'
  },

  // 3. Baner (Standard Hero / Landscape Banner)
  {
    id: 'banner_standard_hero_1',
    name: 'Baner: Sezonowa Kolekcja Wiosenna',
    displayName: 'Baner (Klasyczny Baner z Tłem)',
    type: 'banner',
    enabled: true,
    badge: 'Marketing',
    categoryLabel: 'Baner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'HOT DEAL',
      badgeBgColor: '#ef4444',
      badgeTextColor: '#ffffff',
      title: 'Nowa Kolekcja Casual & Business 2026',
      subtitle: 'Odkryj ponadczasowe fasony zaprojektowane z myślą o najwyższej wygodzie i stylu na co dzień.',
      discountText: 'Rabat -25% z kodem: SPRING26'
    },
    shape: {
      preset: 'card',
      borderRadius: 16,
      individualCorners: false,
      corners: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'fixed',
      heightValue: '380px',
      unit: 'px'
    },
    background: {
      type: 'gradient',
      color: '#0f172a',
      opacity: 100,
      gradient: {
        type: 'linear',
        color1: '#0f172a',
        color2: '#1e1b4b',
        color3: '#311042',
        direction: '135deg',
        opacity: 100
      },
      image: {
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop&q=80',
        position: 'right center',
        size: 'cover',
        repeat: 'no-repeat',
        opacity: 55
      }
    },
    overlay: {
      enabled: true,
      type: 'gradient',
      color: '#090d16',
      gradientFrom: 'rgba(9, 13, 22, 0.95)',
      gradientTo: 'rgba(9, 13, 22, 0.3)',
      gradientDegree: 90,
      opacity: 85,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: 'rgba(255,255,255,0.1)',
      opacity: 100,
      hoverColor: '#a855f7'
    },
    shadow: {
      preset: '2xl',
      enabled: true,
      x: 0,
      y: 15,
      blur: 35,
      spread: -5,
      color: 'rgba(0,0,0,0.65)',
      opacity: 100
    },
    spacing: {
      margin: { top: 16, right: 0, bottom: 16, left: 0 },
      padding: { top: 40, right: 40, bottom: 40, left: 40 },
      gap: 20
    },
    image: {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
      altText: 'Kolekcja Wiosenna',
      aspectRatio: '16:9',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 12,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    layout: {
      direction: 'image_right',
      imageProportion: 40,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'display',
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        lineHeight: 1.25,
        letterSpacing: '-0.02em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 14,
        fontWeight: '400',
        color: '#cbd5e1',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Odkryj kolekcję',
      link: '/kolekcja',
      iconName: 'ShoppingBag',
      iconPosition: 'left',
      position: 'left',
      width: 'auto',
      padding: { top: 12, bottom: 12, left: 24, right: 24 },
      appearance: {
        textColor: '#ffffff',
        bgColor: '#7c3aed',
        borderColor: '#8b5cf6',
        borderWidth: 1,
        borderRadius: 12,
        shadow: 'lg'
      },
      hover: {
        bgColor: '#6d28d9',
        scale: 1.03
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'glow',
      scale: 1.01,
      translateY: -2,
      brightness: 103,
      borderColor: '#a855f7',
      transitionDurationMs: 300
    },
    animation: {
      type: 'slide_up',
      durationMs: 450,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: false, // background image is used with overlay
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: {
        height: '320px',
        padding: { top: 28, right: 28, bottom: 28, left: 28 },
        titleFontSize: 22
      },
      mobile: {
        height: 'auto',
        padding: { top: 24, right: 20, bottom: 24, left: 20 },
        titleFontSize: 19
      }
    },
    activePreset: 'premium'
  },

  // 4. Slider / Baner (główny slider) -> Dedicated Preview in this editor
  {
    id: 'banner_main_slider_preview',
    name: 'Slider / Baner (Główny Slider)',
    displayName: 'Slider / Baner (Główny Slider Sklepu)',
    type: 'main_slider_preview',
    isSystemMainSlider: true,
    enabled: true,
    badge: 'Systemowy Slider',
    categoryLabel: 'Główny Slider',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    content: {
      title: 'Główny Slider Sklepu (Podgląd LIVE)',
      subtitle: 'Element główny: 3 aktywne slajdy, automatyczna rotacja, przejścia Fade/Slide oraz konfigurowalna nawigacja.',
      badgeText: '3 SLAJDY AKTYWNE'
    },
    shape: {
      preset: 'rounded_rectangle',
      borderRadius: 20,
      individualCorners: false,
      corners: { topLeft: 20, topRight: 20, bottomRight: 20, bottomLeft: 20 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'fixed',
      heightValue: '460px',
      unit: 'px'
    },
    background: {
      type: 'color',
      color: '#0b0f19',
      opacity: 100
    },
    overlay: {
      enabled: true,
      type: 'gradient',
      color: '#000000',
      opacity: 40,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: 'rgba(59, 130, 246, 0.3)',
      opacity: 100
    },
    shadow: {
      preset: '2xl',
      enabled: true,
      x: 0,
      y: 16,
      blur: 35,
      spread: -6,
      color: 'rgba(0,0,0,0.7)',
      opacity: 100
    },
    spacing: {
      margin: { top: 16, right: 0, bottom: 16, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      gap: 0
    },
    image: {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
      altText: 'Slider Główny',
      aspectRatio: '21:9',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 20,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    layout: {
      direction: 'image_top',
      imageProportion: 100,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'display',
        fontSize: 32,
        fontWeight: '800',
        color: '#ffffff',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 15,
        fontWeight: '400',
        color: '#cbd5e1',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Otwórz Edytor Głównego Slidera',
      link: '#',
      iconName: 'Sliders',
      iconPosition: 'left',
      position: 'left',
      width: 'auto',
      padding: { top: 12, bottom: 12, left: 24, right: 24 },
      appearance: {
        textColor: '#ffffff',
        bgColor: '#3b82f6',
        borderColor: '#60a5fa',
        borderWidth: 1,
        borderRadius: 12,
        shadow: 'lg'
      },
      hover: { scale: 1.02 },
      active: { scale: 0.98 }
    },
    hover: {
      effect: 'none',
      scale: 1,
      translateY: 0,
      brightness: 100,
      transitionDurationMs: 200
    },
    animation: {
      type: 'fade',
      durationMs: 400,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: { height: '360px' },
      mobile: { height: '280px' }
    },
    activePreset: 'modern'
  },

  // 5. Baner Promocyjny (Promo Banner / Flash Sale)
  {
    id: 'banner_promo_flash_1',
    name: 'Baner Promocyjny: Flash Sale 24H',
    displayName: 'Baner Promocyjny (Flash Sale z Licznikiem)',
    type: 'promo_banner',
    enabled: true,
    badge: 'Promocja',
    categoryLabel: 'Promocje',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'FLASH SALE 24H',
      badgeBgColor: '#f59e0b',
      badgeTextColor: '#000000',
      title: 'Błyskawiczna Promocja na Sprzęt Treningowy',
      subtitle: 'Tylko dzisiaj dodatkowe -35% na cały asortyment sportowy z kodem rabatowym.',
      promoCode: 'FLASH35',
      countdownEndTime: '2026-12-31T23:59:59'
    },
    shape: {
      preset: 'heavy_rounded',
      borderRadius: 24,
      individualCorners: false,
      corners: { topLeft: 24, topRight: 24, bottomRight: 24, bottomLeft: 24 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'auto',
      heightValue: 'auto',
      unit: 'px'
    },
    background: {
      type: 'gradient',
      color: '#18181b',
      opacity: 100,
      gradient: {
        type: 'linear',
        color1: '#451a03',
        color2: '#18181b',
        color3: '#09090b',
        direction: '135deg',
        opacity: 100
      }
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 0,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1.5,
      color: 'rgba(245, 158, 11, 0.4)',
      opacity: 100,
      hoverColor: '#f59e0b'
    },
    shadow: {
      preset: 'glow',
      enabled: true,
      x: 0,
      y: 0,
      blur: 25,
      spread: 0,
      color: 'rgba(245, 158, 11, 0.25)',
      opacity: 100
    },
    spacing: {
      margin: { top: 16, right: 0, bottom: 16, left: 0 },
      padding: { top: 28, right: 32, bottom: 28, left: 32 },
      gap: 24
    },
    image: {
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      altText: 'Trening Flash Sale',
      aspectRatio: '1:1',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 16,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 110,
        saturation: 110
      }
    },
    layout: {
      direction: 'image_right',
      imageProportion: 35,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'display',
        fontSize: 24,
        fontWeight: '800',
        color: '#fef3c7',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 14,
        fontWeight: '400',
        color: '#d4d4d8',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 11,
        fontWeight: '800',
        color: '#000000',
        lineHeight: 1,
        letterSpacing: '0.08em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Aktywuj kupon -35%',
      link: '/promocje',
      iconName: 'Zap',
      iconPosition: 'left',
      position: 'left',
      width: 'auto',
      padding: { top: 10, bottom: 10, left: 20, right: 20 },
      appearance: {
        textColor: '#000000',
        bgColor: '#f59e0b',
        borderColor: '#fbbf24',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      },
      hover: {
        bgColor: '#d97706',
        scale: 1.03
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'glow',
      scale: 1.01,
      translateY: -2,
      brightness: 103,
      transitionDurationMs: 250
    },
    animation: {
      type: 'scale',
      durationMs: 400,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true,
      showCountdown: true
    },
    responsive: {
      tablet: {
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
        titleFontSize: 20
      },
      mobile: {
        layoutDirection: 'image_top',
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        titleFontSize: 18
      }
    },
    activePreset: 'neon'
  },

  // 6. Baner Informacyjny (Info Banner / Eko)
  {
    id: 'banner_info_eco_1',
    name: 'Baner Informacyjny: Eko Dostawa & Gwarancja',
    displayName: 'Baner Informacyjny (Korzyści & Zaufanie)',
    type: 'info_banner',
    enabled: true,
    badge: 'Informacja',
    categoryLabel: 'Informacja',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'ZRÓWNOWAŻONY ROZWÓJ',
      badgeBgColor: '#059669',
      badgeTextColor: '#ffffff',
      title: 'Neutralne dla klimatu przesyłki i 100% biodegradowalne opakowania',
      subtitle: 'Każde zamówienie pakujemy w bezpieczny papier z recyklingu, a ślad węglowy kompensujemy nasadzeniami drzew.',
      highlightText: 'Ponad 50 000 posadzonych drzew w 2025 roku'
    },
    shape: {
      preset: 'rounded_rectangle',
      borderRadius: 14,
      individualCorners: false,
      corners: { topLeft: 14, topRight: 14, bottomRight: 14, bottomLeft: 14 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'auto',
      heightValue: 'auto',
      unit: 'px'
    },
    background: {
      type: 'color',
      color: '#064e3b',
      opacity: 90
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 0,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: '#047857',
      opacity: 100
    },
    shadow: {
      preset: 'md',
      enabled: true,
      x: 0,
      y: 6,
      blur: 15,
      spread: -2,
      color: 'rgba(0,0,0,0.3)',
      opacity: 100
    },
    spacing: {
      margin: { top: 12, right: 0, bottom: 12, left: 0 },
      padding: { top: 24, right: 28, bottom: 24, left: 28 },
      gap: 20
    },
    image: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
      altText: 'Ekologia w Marketplace',
      aspectRatio: '16:9',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 10,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    layout: {
      direction: 'image_left',
      imageProportion: 30,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'sans',
        fontSize: 18,
        fontWeight: '700',
        color: '#ecfdf5',
        lineHeight: 1.35,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 13,
        fontWeight: '400',
        color: '#a7f3d0',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Dowiedz się więcej o Eko-inicjatywie',
      link: '/eko',
      iconName: 'ArrowRight',
      iconPosition: 'right',
      position: 'left',
      width: 'auto',
      padding: { top: 8, bottom: 8, left: 16, right: 16 },
      appearance: {
        textColor: '#064e3b',
        bgColor: '#ecfdf5',
        borderColor: '#a7f3d0',
        borderWidth: 1,
        borderRadius: 8,
        shadow: 'sm'
      },
      hover: {
        bgColor: '#ffffff',
        scale: 1.02
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'lift',
      scale: 1.01,
      translateY: -2,
      brightness: 102,
      transitionDurationMs: 200
    },
    animation: {
      type: 'fade',
      durationMs: 350,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: {
        padding: { top: 18, right: 18, bottom: 18, left: 18 }
      },
      mobile: {
        layoutDirection: 'image_top',
        padding: { top: 16, right: 14, bottom: 16, left: 14 }
      }
    },
    activePreset: 'clean'
  },

  // 7. Baner Marketingowy (VIP Club / Membership)
  {
    id: 'banner_marketing_vip_1',
    name: 'Baner Marketingowy: Strefa VIP',
    displayName: 'Baner Marketingowy (Program Lojalnościowy)',
    type: 'marketing_banner',
    enabled: true,
    badge: 'Marketing',
    categoryLabel: 'Marketing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'VIP CLUB',
      badgeBgColor: '#d97706',
      badgeTextColor: '#ffffff',
      title: 'Dołącz do elitarnego Klubu Marketplace VIP',
      subtitle: 'Zbieraj punkty za każde zakupy, wymieniaj je na darmowe produkty i ciesz się stałym rabatem -10% na wszystko.',
      highlightText: 'Ponad 120 000 zadowolonych klubowiczów'
    },
    shape: {
      preset: 'card',
      borderRadius: 16,
      individualCorners: false,
      corners: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'auto',
      heightValue: 'auto',
      unit: 'px'
    },
    background: {
      type: 'gradient',
      color: '#18181b',
      opacity: 100,
      gradient: {
        type: 'linear',
        color1: '#18181b',
        color2: '#27272a',
        color3: '#09090b',
        direction: '135deg',
        opacity: 100
      }
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 0,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: '#3f3f46',
      opacity: 100,
      hoverColor: '#fbbf24'
    },
    shadow: {
      preset: 'xl',
      enabled: true,
      x: 0,
      y: 10,
      blur: 25,
      spread: -4,
      color: 'rgba(0,0,0,0.5)',
      opacity: 100
    },
    spacing: {
      margin: { top: 14, right: 0, bottom: 14, left: 0 },
      padding: { top: 32, right: 36, bottom: 32, left: 36 },
      gap: 24
    },
    image: {
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
      altText: 'Strefa VIP',
      aspectRatio: '4:3',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 12,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 105,
        saturation: 105
      }
    },
    layout: {
      direction: 'image_right',
      imageProportion: 35,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'display',
        fontSize: 22,
        fontWeight: '800',
        color: '#ffffff',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 14,
        fontWeight: '400',
        color: '#a1a1aa',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Dołącz za darmo teraz',
      link: '/vip',
      iconName: 'Crown',
      iconPosition: 'left',
      position: 'left',
      width: 'auto',
      padding: { top: 10, bottom: 10, left: 22, right: 22 },
      appearance: {
        textColor: '#000000',
        bgColor: '#fbbf24',
        borderColor: '#f59e0b',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      },
      hover: {
        bgColor: '#f59e0b',
        scale: 1.03
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'glow',
      scale: 1.01,
      translateY: -2,
      brightness: 103,
      transitionDurationMs: 250
    },
    animation: {
      type: 'fade',
      durationMs: 400,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: true,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: {
        padding: { top: 22, right: 22, bottom: 22, left: 22 },
        titleFontSize: 20
      },
      mobile: {
        layoutDirection: 'image_top',
        padding: { top: 18, right: 16, bottom: 18, left: 16 },
        titleFontSize: 18
      }
    },
    activePreset: 'premium'
  },

  // 8. CTA Banner (Call-to-Action / Newsletter)
  {
    id: 'banner_cta_newsletter_1',
    name: 'CTA Banner: Zapis do Newslettera',
    displayName: 'CTA Banner (Wezwanie do Działania)',
    type: 'cta_banner',
    enabled: true,
    badge: 'Konwersja',
    categoryLabel: 'CTA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    content: {
      badgeText: 'KOD -50 ZŁ',
      badgeBgColor: '#6366f1',
      badgeTextColor: '#ffffff',
      title: 'Zapisz się do newslettera i odbierz 50 zł na pierwsze zakupy',
      subtitle: 'Otrzymuj jako pierwszy powiadomienia o tajnych wyprzedażach, nowościach technologicznych i kodach rabatowych.',
      highlightText: 'Bez spamu. Wypisz się w dowolnym momencie jednym kliknięciem.'
    },
    shape: {
      preset: 'pill',
      borderRadius: 32,
      individualCorners: false,
      corners: { topLeft: 32, topRight: 32, bottomRight: 32, bottomLeft: 32 }
    },
    size: {
      widthMode: 'standard_1200',
      widthValue: '100%',
      heightMode: 'auto',
      heightValue: 'auto',
      unit: 'px'
    },
    background: {
      type: 'gradient',
      color: '#1e1b4b',
      opacity: 100,
      gradient: {
        type: 'linear',
        color1: '#312e81',
        color2: '#1e1b4b',
        color3: '#0f172a',
        direction: '90deg',
        opacity: 100
      }
    },
    overlay: {
      enabled: false,
      type: 'color',
      color: '#000000',
      opacity: 0,
      blending: 'normal'
    },
    border: {
      style: 'solid',
      width: 1,
      color: '#4f46e5',
      opacity: 100
    },
    shadow: {
      preset: 'xl',
      enabled: true,
      x: 0,
      y: 10,
      blur: 30,
      spread: -4,
      color: 'rgba(79, 70, 229, 0.25)',
      opacity: 100
    },
    spacing: {
      margin: { top: 16, right: 0, bottom: 16, left: 0 },
      padding: { top: 28, right: 36, bottom: 28, left: 36 },
      gap: 20
    },
    image: {
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
      altText: 'Newsletter CTA',
      aspectRatio: '1:1',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: 20,
      opacity: 100,
      effects: {
        grayscale: 0,
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100
      }
    },
    layout: {
      direction: 'image_right',
      imageProportion: 25,
      verticalAlign: 'center'
    },
    typography: {
      title: {
        fontFamily: 'sans',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        textAlign: 'left',
        textTransform: 'none'
      },
      subtitle: {
        fontFamily: 'sans',
        fontSize: 13,
        fontWeight: '400',
        color: '#c7d2fe',
        lineHeight: 1.5,
        letterSpacing: '0',
        textAlign: 'left',
        textTransform: 'none'
      },
      badge: {
        fontFamily: 'sans',
        fontSize: 10,
        fontWeight: '700',
        color: '#ffffff',
        lineHeight: 1,
        letterSpacing: '0.05em',
        textAlign: 'left',
        textTransform: 'uppercase'
      }
    },
    cta: {
      show: true,
      text: 'Odbierz kod rabatowy',
      link: '#',
      iconName: 'Mail',
      iconPosition: 'left',
      position: 'left',
      width: 'auto',
      padding: { top: 11, bottom: 11, left: 24, right: 24 },
      appearance: {
        textColor: '#ffffff',
        bgColor: '#4f46e5',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 9999,
        shadow: 'md'
      },
      hover: {
        bgColor: '#4338ca',
        scale: 1.03
      },
      active: {
        scale: 0.98
      }
    },
    hover: {
      effect: 'glow',
      scale: 1.01,
      translateY: -2,
      brightness: 103,
      transitionDurationMs: 250
    },
    animation: {
      type: 'fade',
      durationMs: 400,
      delayMs: 0,
      easing: 'ease-out'
    },
    visibility: {
      showImage: false,
      showHeader: true,
      showSubtitle: true,
      showBadge: true,
      showCtaButton: true
    },
    responsive: {
      tablet: {
        padding: { top: 22, right: 24, bottom: 22, left: 24 }
      },
      mobile: {
        padding: { top: 20, right: 18, bottom: 20, left: 18 },
        titleFontSize: 17
      }
    },
    activePreset: 'modern'
  }
];

export const defaultBannersManagerConfig: BannersManagerConfig = {
  enabled: true,
  selectedBannerId: 'banner_img_text_1',
  items: defaultBannerInstances,
  mainSlider: defaultMainSliderConfig
};

export const BANNER_STYLE_PRESETS: Record<
  BannerPresetStyleName,
  {
    name: string;
    description: string;
    shape: Partial<BannerShapeConfig>;
    background: Partial<BannerBackgroundConfig>;
    border: Partial<BannerBorderConfig>;
    shadow: Partial<BannerShadowConfig>;
    typography: {
      title: Partial<BannerTypographyConfig>;
      subtitle: Partial<BannerTypographyConfig>;
    };
    cta: Partial<BannerCtaButtonConfig>;
  }
> = {
  modern: {
    name: 'Modern (Nowoczesny)',
    description: 'Czysty, ciemny styl z błękitnymi akcentami i zbalansowanym cieniem.',
    shape: { preset: 'rounded_rectangle', borderRadius: 16 },
    background: { type: 'color', color: '#0f172a', opacity: 100 },
    border: { style: 'solid', width: 1, color: '#334155' },
    shadow: { preset: 'lg', color: 'rgba(0,0,0,0.5)', opacity: 100 },
    typography: {
      title: { color: '#ffffff', fontWeight: '700' },
      subtitle: { color: '#94a3b8' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: '#2563eb',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      }
    }
  },
  premium: {
    name: 'Premium (Luksusowy & Fiolet)',
    description: 'Głębokie fiolety, gradienty i elegancka typografia.',
    shape: { preset: 'card', borderRadius: 18 },
    background: {
      type: 'gradient',
      color: '#0f172a',
      gradient: {
        type: 'linear',
        color1: '#1e1b4b',
        color2: '#311042',
        direction: '135deg',
        opacity: 100
      }
    },
    border: { style: 'solid', width: 1, color: 'rgba(168, 85, 247, 0.4)' },
    shadow: { preset: '2xl', color: 'rgba(168, 85, 247, 0.25)', opacity: 100 },
    typography: {
      title: { color: '#ffffff', fontWeight: '800', fontFamily: 'display' },
      subtitle: { color: '#cbd5e1' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: '#7c3aed',
        borderColor: '#8b5cf6',
        borderWidth: 1,
        borderRadius: 12,
        shadow: 'lg'
      }
    }
  },
  minimal: {
    name: 'Minimal (Minimalistyczny)',
    description: 'Prosta geometria, brak zbędnych cieni, precyzyjne linie.',
    shape: { preset: 'rectangle', borderRadius: 0 },
    background: { type: 'color', color: '#18181b', opacity: 100 },
    border: { style: 'solid', width: 1, color: '#27272a' },
    shadow: { preset: 'none', enabled: false },
    typography: {
      title: { color: '#ffffff', fontWeight: '600', fontFamily: 'sans' },
      subtitle: { color: '#71717a' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: '#27272a',
        borderColor: '#3f3f46',
        borderWidth: 1,
        borderRadius: 0,
        shadow: 'none'
      }
    }
  },
  clean: {
    name: 'Clean (Przejrzysty & Szmaragd)',
    description: 'Świeży, naturalny styl z subtelnymi zaokrągleniami.',
    shape: { preset: 'rounded_rectangle', borderRadius: 12 },
    background: { type: 'color', color: '#064e3b', opacity: 90 },
    border: { style: 'solid', width: 1, color: '#047857' },
    shadow: { preset: 'md', color: 'rgba(0,0,0,0.3)', opacity: 100 },
    typography: {
      title: { color: '#ecfdf5', fontWeight: '700' },
      subtitle: { color: '#a7f3d0' }
    },
    cta: {
      appearance: {
        textColor: '#064e3b',
        bgColor: '#ecfdf5',
        borderColor: '#a7f3d0',
        borderWidth: 1,
        borderRadius: 8,
        shadow: 'sm'
      }
    }
  },
  glass: {
    name: 'Glass (Glassmorphism)',
    description: 'Przezroczyste tło ze szkłem, rozmyciem tła i miękką poświatą.',
    shape: { preset: 'card', borderRadius: 20 },
    background: { type: 'color', color: 'rgba(15, 23, 42, 0.65)', opacity: 65 },
    border: { style: 'solid', width: 1, color: 'rgba(255, 255, 255, 0.15)' },
    shadow: { preset: 'xl', color: 'rgba(0,0,0,0.5)', opacity: 100 },
    typography: {
      title: { color: '#ffffff', fontWeight: '700' },
      subtitle: { color: '#cbd5e1' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderRadius: 12,
        shadow: 'md'
      }
    }
  },
  dark: {
    name: 'Dark (Głęboka Czerń)',
    description: 'Maksymalny kontrast na głębokiej czerni z neutralnymi szarościami.',
    shape: { preset: 'rounded_rectangle', borderRadius: 14 },
    background: { type: 'color', color: '#09090b', opacity: 100 },
    border: { style: 'solid', width: 1, color: '#27272a' },
    shadow: { preset: '2xl', color: 'rgba(0,0,0,0.8)', opacity: 100 },
    typography: {
      title: { color: '#fafafa', fontWeight: '700' },
      subtitle: { color: '#a1a1aa' }
    },
    cta: {
      appearance: {
        textColor: '#09090b',
        bgColor: '#fafafa',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      }
    }
  },
  light: {
    name: 'Light (Jasny Kontrastowy)',
    description: 'Świetlisty styl dla sekcji wyróżnionych.',
    shape: { preset: 'rounded_rectangle', borderRadius: 16 },
    background: { type: 'color', color: '#f8fafc', opacity: 100 },
    border: { style: 'solid', width: 1, color: '#e2e8f0' },
    shadow: { preset: 'lg', color: 'rgba(0,0,0,0.1)', opacity: 100 },
    typography: {
      title: { color: '#0f172a', fontWeight: '800' },
      subtitle: { color: '#475569' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: '#0f172a',
        borderColor: '#1e293b',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      }
    }
  },
  neon: {
    name: 'Neon & Cyber (Bursztyn & Złoto)',
    description: 'Intensywna poświata, bursztynowe złoto i wysoka konwersja.',
    shape: { preset: 'heavy_rounded', borderRadius: 24 },
    background: {
      type: 'gradient',
      color: '#18181b',
      gradient: {
        type: 'linear',
        color1: '#451a03',
        color2: '#18181b',
        direction: '135deg',
        opacity: 100
      }
    },
    border: { style: 'solid', width: 1.5, color: '#f59e0b' },
    shadow: { preset: 'glow', color: 'rgba(245, 158, 11, 0.3)', opacity: 100 },
    typography: {
      title: { color: '#fef3c7', fontWeight: '800', fontFamily: 'display' },
      subtitle: { color: '#d4d4d8' }
    },
    cta: {
      appearance: {
        textColor: '#000000',
        bgColor: '#f59e0b',
        borderColor: '#fbbf24',
        borderWidth: 1,
        borderRadius: 12,
        shadow: 'lg'
      }
    }
  },
  marketplace: {
    name: 'Marketplace (Oficjalny Styl)',
    description: 'Spójny z głównym motywem platformy Marketplace Pro.',
    shape: { preset: 'rounded_rectangle', borderRadius: 16 },
    background: { type: 'color', color: '#0f172a', opacity: 100 },
    border: { style: 'solid', width: 1, color: '#1e293b' },
    shadow: { preset: 'xl', color: 'rgba(0,0,0,0.5)', opacity: 100 },
    typography: {
      title: { color: '#ffffff', fontWeight: '700' },
      subtitle: { color: '#94a3b8' }
    },
    cta: {
      appearance: {
        textColor: '#ffffff',
        bgColor: '#3b82f6',
        borderColor: '#60a5fa',
        borderWidth: 1,
        borderRadius: 10,
        shadow: 'md'
      }
    }
  }
};
