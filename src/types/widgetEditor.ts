export type WidgetType =
  | 'featured_products'
  | 'promotions'
  | 'newsletter'
  | 'trust_badges'
  | 'promo_1'
  | 'promo_2'
  | 'testimonials'
  | 'usp_banner'
  | 'faq_accordion'
  | 'countdown_banner';

export type WidgetCategory =
  | 'products'
  | 'marketing'
  | 'trust'
  | 'info'
  | 'presentation'
  | 'functional'
  | 'other';

export type WidgetShapePreset =
  | 'rectangle'
  | 'rounded_rectangle'
  | 'heavy_rounded'
  | 'square'
  | 'card'
  | 'pill'
  | 'circle'
  | 'ellipse'
  | 'custom';

export type WidgetUnit = 'px' | '%' | 'rem' | 'vw' | 'vh' | 'auto';

export interface WidgetShapeConfig {
  preset: WidgetShapePreset;
  borderRadius: number;
  corners: {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
    unit: 'px' | 'rem' | '%';
  };
  individualCorners: boolean;
  customClipPath?: string;
  clipPathPreset?: 'none' | 'polygon_slant' | 'chevron' | 'badge_ribbon' | 'ticket_cutout' | 'wave';
}

export interface WidgetSizeConfig {
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  containerPreset: 'full' | 'wide_1400' | 'standard_1200' | 'compact_960' | 'narrow_720' | 'custom';
}

export type WidgetInternalLayoutType = 'row' | 'column' | 'grid' | 'flex' | 'center' | 'split';

export interface WidgetInternalLayoutConfig {
  layoutType: WidgetInternalLayoutType;
  columns: number;
  gap: number;
  rowGap: number;
  columnGap: number;
  alignItems: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  direction: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export type WidgetBgType = 'none' | 'color' | 'gradient' | 'image' | 'transparent' | 'glassmorphism';

export interface WidgetBackgroundConfig {
  type: WidgetBgType;
  color: string;
  opacity: number;
  gradient: {
    type: 'linear' | 'radial' | 'multi_stop';
    color1: string;
    color2: string;
    color3?: string;
    direction: string; // e.g. '135deg', 'to right', 'to bottom'
    position: string;
    opacity: number;
  };
  image: {
    url: string;
    position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';
    size: 'cover' | 'contain' | 'auto';
    repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    opacity: number;
  };
  glassmorphism: {
    blurPx: number;
    opacity: number;
    tintColor: string;
    borderHighlight: boolean;
  };
  overlay: {
    enabled: boolean;
    type: 'color' | 'gradient';
    color: string;
    opacity: number;
    blendMode: 'normal' | 'multiply' | 'overlay' | 'darken' | 'lighten' | 'screen' | 'color-burn';
  };
}

export type WidgetBorderStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double';

export interface WidgetBorderConfig {
  style: WidgetBorderStyle;
  width: number;
  color: string;
  opacity: number;
  individualSides: boolean;
  sides: {
    top: { enabled: boolean; width: number; style: WidgetBorderStyle; color: string };
    right: { enabled: boolean; width: number; style: WidgetBorderStyle; color: string };
    bottom: { enabled: boolean; width: number; style: WidgetBorderStyle; color: string };
    left: { enabled: boolean; width: number; style: WidgetBorderStyle; color: string };
  };
}

export type WidgetShadowPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';

export interface WidgetShadowConfig {
  preset: WidgetShadowPreset;
  custom: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    inset: boolean;
  };
}

export interface WidgetTypographyConfig {
  fontFamily: string;
  title: {
    fontSize: number;
    fontWeight: string;
    color: string;
    lineHeight: number | string;
    letterSpacing: string;
    textAlign: 'left' | 'center' | 'right';
    textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
    textDecoration: 'none' | 'underline';
  };
  subtitle: {
    fontSize: number;
    fontWeight: string;
    color: string;
    lineHeight: number | string;
    letterSpacing: string;
    textAlign: 'left' | 'center' | 'right';
    textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  };
  body: {
    fontSize: number;
    fontWeight: string;
    color: string;
    lineHeight: number | string;
    letterSpacing: string;
    textAlign: 'left' | 'center' | 'right';
  };
}

export interface WidgetSpacingConfig {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    unit: 'px' | 'rem';
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    unit: 'px' | 'rem';
  };
  gap: number;
}

export interface WidgetButtonConfig {
  text: string;
  icon: string;
  iconPosition: 'left' | 'right' | 'none';
  textColor: string;
  bgColor: string;
  width: 'auto' | 'full' | 'fixed';
  heightPx: number;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'glow';
  hoverBgColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  hoverScale: number;
}

export interface WidgetIconConfig {
  iconName: string;
  sizePx: number;
  color: string;
  position: 'top' | 'left' | 'right' | 'center';
  gapPx: number;
  animation: 'none' | 'pulse' | 'bounce' | 'spin' | 'float';
}

export interface WidgetHoverConfig {
  enabled: boolean;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  shadow?: string;
  scale: number;
  translateY: number;
  opacity: number;
  glow: boolean;
  glowColor: string;
  transitionDurationMs: number;
}

export interface WidgetAnimationConfig {
  type: 'none' | 'fade' | 'slide' | 'scale' | 'zoom' | 'reveal' | 'blur' | 'float' | 'bounce' | 'glow';
  durationMs: number;
  delayMs: number;
  easing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface WidgetResponsiveConfig {
  desktop: {
    columns?: number;
    gap?: number;
    paddingY?: number;
    paddingX?: number;
    fontSizeScale?: number;
  };
  tablet: {
    columns?: number;
    gap?: number;
    paddingY?: number;
    paddingX?: number;
    fontSizeScale?: number;
    visible?: boolean;
    layoutType?: WidgetInternalLayoutType;
  };
  mobile: {
    columns?: number;
    gap?: number;
    paddingY?: number;
    paddingX?: number;
    fontSizeScale?: number;
    visible?: boolean;
    layoutType?: WidgetInternalLayoutType;
    stackOnMobile?: boolean;
  };
}

export type WidgetPreviewState = 'normal' | 'hover' | 'active' | 'loading' | 'empty' | 'error' | 'disabled';

export interface WidgetElementVisibilityItem {
  id: string;
  label: string;
  visible: boolean;
  order?: number;
  customText?: string;
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  name: string; // Internal name
  displayName: string; // Editable user title
  category: WidgetCategory;
  enabled: boolean; // Active or disabled (hidden without deleting config)
  description: string;
  badgeTag?: string;
  
  // Visual presentation styling
  shape: WidgetShapeConfig;
  size: WidgetSizeConfig;
  layout: WidgetInternalLayoutConfig;
  background: WidgetBackgroundConfig;
  border: WidgetBorderConfig;
  shadow: WidgetShadowConfig;
  typography: WidgetTypographyConfig;
  spacing: WidgetSpacingConfig;
  
  // Specific sub-elements toggles
  elements: Record<string, WidgetElementVisibilityItem>;
  
  // Action buttons and icons
  button: WidgetButtonConfig;
  icon: WidgetIconConfig;
  
  // Hover & Animation
  hover: WidgetHoverConfig;
  animation: WidgetAnimationConfig;
  
  // Responsiveness
  responsive: WidgetResponsiveConfig;
  
  // Content & Marketplace data bindings
  content: {
    title: string;
    subtitle: string;
    description?: string;
    badgeText?: string;
    voucherCode?: string;
    discountPercent?: number;
    targetUrl?: string;
    timerEndDate?: string;
    productIds?: string[];
    maxProductsCount?: number;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
    customItems?: Array<{
      id: string;
      title: string;
      subtitle?: string;
      description?: string;
      icon?: string;
      badge?: string;
      image?: string;
      rating?: number;
      author?: string;
      role?: string;
      price?: number;
      oldPrice?: number;
    }>;
  };
  
  activePreset?: string;
}

export interface WidgetsManagerConfig {
  enabled: boolean;
  activeWidgetId: string;
  widgets: WidgetInstance[];
  useGlobalStyles: boolean;
}
