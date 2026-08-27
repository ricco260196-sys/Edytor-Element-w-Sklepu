export type BannerElementType =
  | 'image_text'          // Obrazek + Opis
  | 'image_only'          // Obraz
  | 'banner'              // Baner
  | 'main_slider_preview' // Slider / Baner (główny slider - tylko podgląd w tym edytorze)
  | 'promo_banner'        // Baner promocyjny
  | 'info_banner'         // Baner informacyjny
  | 'marketing_banner'    // Baner marketingowy
  | 'cta_banner';         // CTA Banner

export type BannerShapePreset =
  | 'rectangle'
  | 'rounded_rectangle'
  | 'card'
  | 'heavy_rounded'
  | 'pill'
  | 'ellipse'
  | 'custom';

export type BannerBgType =
  | 'none'
  | 'color'
  | 'gradient'
  | 'image'
  | 'transparent';

export type BannerGradientType = 'linear' | 'radial';

export type BannerBorderStyle =
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double';

export type BannerShadowPreset =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'glow'
  | 'custom';

export type BannerImageObjectFit = 'cover' | 'contain' | 'fill';
export type BannerImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type BannerImageAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '21:9' | 'auto';

export type BannerImageTextLayout =
  | 'image_left'    // Obraz po lewej
  | 'image_right'   // Obraz po prawej
  | 'image_top'     // Obraz nad tekstem
  | 'image_bottom'; // Obraz pod tekstem

export type BannerHoverEffect =
  | 'none'
  | 'scale'
  | 'zoom_image'
  | 'lift'
  | 'glow'
  | 'brightness'
  | 'color_shift'
  | 'shadow_pop'
  | 'slide_cta';

export type BannerAnimationType =
  | 'none'
  | 'fade'
  | 'slide_up'
  | 'slide_left'
  | 'slide_right'
  | 'scale'
  | 'zoom'
  | 'reveal'
  | 'float'
  | 'blur';

export type BannerSimulatedState =
  | 'normal'
  | 'hover'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'empty';

export type BannerPresetStyleName =
  | 'modern'
  | 'premium'
  | 'minimal'
  | 'clean'
  | 'glass'
  | 'dark'
  | 'light'
  | 'neon'
  | 'marketplace';

export interface BannerBoxSpacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
  linked?: boolean;
}

export interface BannerCornersRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  linked?: boolean;
}

export interface BannerShapeConfig {
  preset: BannerShapePreset;
  borderRadius: number;
  individualCorners: boolean;
  corners: BannerCornersRadius;
  clipPath?: 'none' | 'diagonal_left' | 'diagonal_right' | 'polygon_badge' | 'custom';
  customClipPath?: string;
}

export interface BannerSizeConfig {
  widthMode: 'full' | 'standard_1200' | 'wide_1400' | 'compact_960' | 'custom';
  widthValue: string; // e.g. "100%", "1200px", "80rem"
  heightMode: 'auto' | 'fixed' | 'aspect_ratio';
  heightValue: string; // e.g. "400px", "500px", "auto"
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  unit: 'px' | '%' | 'rem' | 'vw' | 'vh' | 'auto';
}

export interface BannerBackgroundConfig {
  type: BannerBgType;
  color: string;
  opacity: number;
  gradient?: {
    type: BannerGradientType;
    color1: string;
    color2: string;
    color3?: string;
    direction: string; // e.g. "135deg", "to bottom"
    position?: string; // for radial, e.g. "circle at center"
    opacity: number;
  };
  image?: {
    url: string;
    position: string;
    size: 'cover' | 'contain' | 'auto' | '100% 100%';
    repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    opacity: number;
  };
}

export interface BannerOverlayConfig {
  enabled: boolean;
  type: 'color' | 'gradient';
  color: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDegree?: number;
  opacity: number; // 0-100
  blending: 'normal' | 'multiply' | 'overlay' | 'screen' | 'darken' | 'lighten';
}

export interface BannerBorderConfig {
  style: BannerBorderStyle;
  width: number;
  color: string;
  opacity: number;
  hoverColor?: string;
}

export interface BannerShadowConfig {
  preset: BannerShadowPreset;
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset?: boolean;
}

export interface BannerImageConfig {
  url: string;
  altText: string;
  width?: string;
  height?: string;
  aspectRatio: BannerImageAspectRatio;
  objectFit: BannerImageObjectFit;
  objectPosition: BannerImagePosition;
  borderRadius: number;
  opacity: number;
  border?: {
    style: BannerBorderStyle;
    width: number;
    color: string;
  };
  shadow?: {
    preset: BannerShadowPreset;
  };
  effects: {
    grayscale: number; // 0-100
    blur: number;      // 0-20 px
    brightness: number;// 50-150%
    contrast: number;  // 50-150%
    saturation: number;// 0-200%
  };
}

export interface BannerTypographyConfig {
  fontFamily: 'sans' | 'display' | 'serif' | 'mono';
  fontSize: number;
  fontWeight: string;
  color: string;
  lineHeight: number;
  letterSpacing: string;
  textAlign: 'left' | 'center' | 'right';
  textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
}

export interface BannerCtaButtonConfig {
  show: boolean;
  text: string;
  link: string;
  target?: '_self' | '_blank';
  iconName?: string;
  iconPosition?: 'left' | 'right';
  position: 'left' | 'center' | 'right' | 'inline';
  width: 'auto' | 'full' | 'fixed';
  fixedWidthPx?: number;
  heightPx?: number;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  appearance: {
    textColor: string;
    bgColor: string;
    bgGradient?: string[];
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    shadow: BannerShadowPreset;
  };
  hover: {
    textColor?: string;
    bgColor?: string;
    scale?: number;
    borderColor?: string;
  };
  active: {
    scale?: number;
  };
  disabled?: boolean;
}

export interface BannerVisibilityConfig {
  showImage: boolean;
  showHeader: boolean;
  showSubtitle: boolean;
  showBadge: boolean;
  showCtaButton: boolean;
  showCountdown?: boolean;
  showSecondaryInfo?: boolean;
}

export interface BannerHoverConfig {
  effect: BannerHoverEffect;
  scale: number;
  translateY: number;
  brightness: number;
  shadowPreset?: BannerShadowPreset;
  borderColor?: string;
  bgColor?: string;
  transitionDurationMs: number;
}

export interface BannerAnimationConfig {
  type: BannerAnimationType;
  durationMs: number;
  delayMs: number;
  easing: 'ease' | 'ease-out' | 'ease-in-out' | 'linear';
}

export interface BannerResponsiveOverride {
  width?: string;
  height?: string;
  padding?: BannerBoxSpacing;
  margin?: BannerBoxSpacing;
  gap?: number;
  layoutDirection?: BannerImageTextLayout;
  titleFontSize?: number;
  subtitleFontSize?: number;
  imageHeight?: string;
  visibility?: Partial<BannerVisibilityConfig>;
}

export interface BannerInstance {
  id: string;
  name: string;
  displayName: string;
  type: BannerElementType;
  enabled: boolean;
  isSystemMainSlider?: boolean; // If true, opens dedicated Main Slider Editor modal
  badge?: string;
  categoryLabel?: string;
  thumbnailUrl: string;

  // 1. Content & Text
  content: {
    badgeText?: string;
    badgeBgColor?: string;
    badgeTextColor?: string;
    title: string;
    subtitle?: string;
    highlightText?: string;
    countdownEndTime?: string; // for promo banner
    discountText?: string;     // e.g. "-30% NA START"
    promoCode?: string;        // e.g. "SUMMER2026"
  };

  // 2. Shape & Corners
  shape: BannerShapeConfig;

  // 3. Size & Container
  size: BannerSizeConfig;

  // 4. Background
  background: BannerBackgroundConfig;

  // 5. Overlay
  overlay: BannerOverlayConfig;

  // 6. Border
  border: BannerBorderConfig;

  // 7. Shadow
  shadow: BannerShadowConfig;

  // 8. Spacing (Margin & Padding)
  spacing: {
    margin: BannerBoxSpacing;
    padding: BannerBoxSpacing;
    gap: number; // between image and text or elements
  };

  // 9. Image Settings & Effects
  image: BannerImageConfig;

  // 10. Image + Description Layout
  layout: {
    direction: BannerImageTextLayout;
    imageProportion: number; // percentage (e.g. 50% for 50/50 split)
    verticalAlign: 'top' | 'center' | 'bottom';
  };

  // 11. Typography
  typography: {
    title: BannerTypographyConfig;
    subtitle: BannerTypographyConfig;
    badge: BannerTypographyConfig;
  };

  // 12. CTA Button
  cta: BannerCtaButtonConfig;

  // 13. Hover Effects
  hover: BannerHoverConfig;

  // 14. Animations
  animation: BannerAnimationConfig;

  // 15. Element Visibility Switches
  visibility: BannerVisibilityConfig;

  // 16. Responsiveness Overrides
  responsive: {
    tablet?: BannerResponsiveOverride;
    mobile?: BannerResponsiveOverride;
  };

  // Preset tracking
  activePreset?: BannerPresetStyleName;
}

// Configuration for the Main Slider (Separate dedicated editor)
export interface MainSliderSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  bgGradient: string;
  textColor: string;
  isActive: boolean;
}

export interface MainSliderDedicatedConfig {
  enabled: boolean;
  autoplay: boolean;
  autoplayIntervalMs: number;
  pauseOnHover: boolean;
  transitionEffect: 'slide' | 'fade' | 'zoom' | 'cube';
  transitionDurationMs: number;
  showArrows: boolean;
  arrowsStyle: 'circle' | 'minimal' | 'glass' | 'pill';
  showDots: boolean;
  dotsStyle: 'dots' | 'bars' | 'numbers';
  heightDesktopPx: number;
  heightTabletPx: number;
  heightMobilePx: number;
  borderRadius: number;
  slides: MainSliderSlide[];
}

export interface BannersManagerConfig {
  enabled: boolean;
  selectedBannerId: string | null;
  items: BannerInstance[];
  mainSlider: MainSliderDedicatedConfig;
  activePresetId?: string;
}
