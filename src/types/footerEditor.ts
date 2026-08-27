export type FooterPresetStyleName =
  | 'modern'
  | 'premium'
  | 'minimal'
  | 'clean'
  | 'dark'
  | 'light'
  | 'glass'
  | 'elegant'
  | 'marketplace';

export type FooterShapePreset =
  | 'rectangle'
  | 'rounded'
  | 'extra_rounded'
  | 'curved_top'
  | 'wave_top'
  | 'slant_top'
  | 'custom';

export type FooterClipPath =
  | 'none'
  | 'wave'
  | 'slant'
  | 'curve'
  | 'trapezoid'
  | 'custom';

export type FooterWidthPreset =
  | 'full'
  | 'wide_1400'
  | 'standard_1200'
  | 'compact_1000'
  | 'custom';

export type FooterSectionType =
  | 'brand_main'
  | 'links_column'
  | 'newsletter'
  | 'contact_info'
  | 'social_media'
  | 'payment_methods'
  | 'badges_certificates'
  | 'bottom_bar'
  | 'custom_html'
  | 'image_banner';

export interface FooterLinkItem {
  id: string;
  text: string;
  url: string;
  icon?: string;
  isHidden?: boolean;
  openInNewTab?: boolean;
  badgeText?: string;
  badgeColor?: string;
}

export interface FooterSocialItem {
  id: string;
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter_x' | 'linkedin' | 'pinterest' | 'github' | 'custom';
  url: string;
  label?: string;
  iconColor?: string;
  bgColor?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'bounce' | 'none';
}

export interface FooterContactItem {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours' | 'custom';
  label: string;
  value: string;
  icon?: string;
  subtext?: string;
  linkUrl?: string;
}

export interface FooterPaymentMethod {
  id: string;
  methodId: 'visa' | 'mastercard' | 'maestro' | 'paypal' | 'blik' | 'p24' | 'payu' | 'apple_pay' | 'google_pay' | 'klarna';
  label: string;
  enabled: boolean;
  iconUrl?: string;
  customSvg?: string;
}

export interface FooterTrustBadge {
  id: string;
  title: string;
  subtitle?: string;
  iconName?: string;
  imageUrl?: string;
  linkUrl?: string;
  enabled: boolean;
}

export interface FooterSectionItem {
  id: string;
  type: FooterSectionType;
  title: string;
  showTitle: boolean;
  enabled: boolean;
  order: number;
  colSpan: number; // 1 to 6
  links?: FooterLinkItem[];
  customText?: string;
  customHtml?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageLink?: string;
}

export interface FooterBoxValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
  isLocked?: boolean;
}

export interface FooterConfig {
  enabled: boolean;
  elementId: string;
  name: string;
  
  // 3, 4. Rozmiar & Szerokość
  size: {
    backgroundWidth: FooterWidthPreset;
    customBgWidth?: string;
    contentWidth: FooterWidthPreset;
    customContentWidth?: string;
    minHeight?: string;
    padding: FooterBoxValues;
    margin: FooterBoxValues;
  };

  // 5. Kształt
  shape: {
    preset: FooterShapePreset;
    borderRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomRightRadius: number;
    borderBottomLeftRadius: number;
    useIndividualCorners: boolean;
    clipPath: FooterClipPath;
    customClipPathCss?: string;
  };

  // 6, 7, 8. Tło, Gradient, Obraz tła & Glassmorphism
  background: {
    type: 'color' | 'gradient' | 'image' | 'glassmorphism' | 'transparent';
    color: string;
    gradient: {
      type: 'linear' | 'radial';
      colors: string[];
      angle: number;
      position?: string;
      opacity: number;
    };
    image: {
      url: string;
      fit: 'cover' | 'contain' | 'auto';
      position: string;
      repeat: 'no-repeat' | 'repeat' | 'repeat-x';
      opacity: number;
    };
    glassmorphism: {
      enabled: boolean;
      blurPx: number;
      opacity: number;
      highlight: boolean;
      borderGlow: boolean;
    };
  };

  // 9. Overlay
  overlay: {
    enabled: boolean;
    type: 'color' | 'gradient';
    color: string;
    gradient: string[];
    opacity: number;
    blendMode: string;
  };

  // 10. Obramowanie (Border)
  border: {
    style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
    color: string;
    width: FooterBoxValues;
    opacity: number;
  };

  // 11. Cień (Shadow)
  shadow: {
    preset: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow' | 'custom';
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    inset: boolean;
  };

  // 12, 16, 28. Układ kolumn i sekcji
  layout: {
    columnsCountDesktop: number;
    columnsCountTablet: number;
    columnsCountMobile: number;
    gapDesktopX: number;
    gapDesktopY: number;
    gapTabletX: number;
    gapTabletY: number;
    gapMobileX: number;
    gapMobileY: number;
    alignItems: 'start' | 'center' | 'end' | 'stretch';
    justifyContent: 'between' | 'start' | 'center' | 'around';
  };

  // 14, 15. Sekcja Brandu (Logo + Opis)
  brand: {
    enabled: boolean;
    logoType: 'image' | 'text' | 'combined';
    logoUrl?: string;
    logoText: string;
    logoWidthPx: number;
    logoHeightPx: number;
    tagline?: string;
    description: string;
    showLogo: boolean;
    showDescription: boolean;
    linkUrl: string;
  };

  // 17, 18, 26. Typografia i Style Tekstu
  typography: {
    headings: {
      fontFamily: 'sans' | 'display' | 'serif' | 'mono';
      fontSizePx: number;
      fontWeight: '400' | '500' | '600' | '700' | '800';
      color: string;
      letterSpacing: string;
      textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
      lineHeight: number;
      showUnderlineAccent: boolean;
      underlineAccentColor?: string;
    };
    body: {
      fontFamily: 'sans' | 'display' | 'serif' | 'mono';
      fontSizePx: number;
      fontWeight: '300' | '400' | '500';
      color: string;
      lineHeight: number;
    };
    links: {
      normal: {
        color: string;
        fontSizePx: number;
        fontWeight: '400' | '500' | '600';
        textDecoration: 'none' | 'underline';
      };
      hover: {
        color: string;
        textDecoration: 'none' | 'underline';
        opacity: number;
        translateX: number;
      };
      active: {
        color: string;
        textDecoration: 'none' | 'underline';
      };
    };
    copyright: {
      fontFamily: 'sans' | 'display' | 'serif' | 'mono';
      fontSizePx: number;
      color: string;
    };
  };

  // 13. Dynamiczne sekcje stopki (np. kolumny z linkami, custom boxy)
  sections: FooterSectionItem[];

  // 19, 20. Kontakt
  contact: {
    enabled: boolean;
    title: string;
    items: FooterContactItem[];
    layout: 'vertical' | 'horizontal' | 'grid';
    iconSizePx: number;
    iconColor: string;
    iconBgColor?: string;
    iconBorderRadius?: number;
    showIcons: boolean;
  };

  // 21. Social Media
  socialMedia: {
    enabled: boolean;
    title: string;
    items: FooterSocialItem[];
    style: 'pill' | 'square' | 'rounded' | 'circle' | 'minimal';
    iconSizePx: number;
    color: string;
    bgColor: string;
    hoverBgColor: string;
    hoverColor: string;
    hoverEffect: 'scale' | 'lift' | 'glow' | 'bounce' | 'none';
    alignment: 'left' | 'center' | 'right';
  };

  // 22. Newsletter
  newsletter: {
    enabled: boolean;
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    buttonBgColor: string;
    buttonTextColor: string;
    buttonHoverBgColor: string;
    inputBgColor: string;
    inputTextColor: string;
    inputBorderColor: string;
    borderRadius: number;
    badgeText?: string;
    showTermsConsent: boolean;
    termsConsentText: string;
    cardStyle: 'flat' | 'card' | 'glow' | 'glass';
  };

  // 23. Ikony płatności
  payments: {
    enabled: boolean;
    title: string;
    methods: FooterPaymentMethod[];
    iconStyle: 'badge' | 'monochrome' | 'clean' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    opacity: number;
    alignment: 'left' | 'center' | 'right';
  };

  // 24. Badges / Certyfikaty zaufania
  trustBadges: {
    enabled: boolean;
    title: string;
    items: FooterTrustBadge[];
    alignment: 'left' | 'center' | 'right';
    style: 'pill' | 'card' | 'minimal';
  };

  // 25. Dolny pasek (Bottom Bar)
  bottomBar: {
    enabled: boolean;
    copyrightText: string;
    autoYear: boolean;
    customYear?: string;
    storeName: string;
    showDivider: boolean;
    dividerColor: string;
    dividerStyle: 'solid' | 'dashed' | 'dotted';
    bgColor: string;
    textColor: string;
    paddingY: number;
    legalLinks: Array<{ id: string; text: string; url: string }>;
    showPaymentIconsInBottomBar: boolean;
    alignment: 'between' | 'center' | 'stacked';
  };

  // 31, 32. Responsywność & Mobile
  responsive: {
    tablet: {
      columnsCount?: number;
      padding?: FooterBoxValues;
      fontSizeReductionPercent?: number;
    };
    mobile: {
      columnsCount?: number;
      layoutMode: 'single_column' | 'two_columns' | 'accordion';
      accordionAutoCollapse: boolean;
      padding?: FooterBoxValues;
      hideSocials?: boolean;
      hideBadges?: boolean;
      hideNewsletter?: boolean;
    };
  };

  // 30. Animacje
  animations: {
    enabled: boolean;
    type: 'fade' | 'slide_up' | 'scale' | 'reveal' | 'none';
    durationMs: number;
    staggerDelayMs: number;
  };

  activePreset?: FooterPresetStyleName;
}
