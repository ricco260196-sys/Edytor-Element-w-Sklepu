import {
  CategoriesWidgetConfig,
  CategoriesPresetStyleName
} from '../types/storeAppearance';
import { SystemCategory } from './marketplaceCatalogue';

export const defaultCategoriesConfig: CategoriesWidgetConfig = {
  enabled: true,
  title: 'Przeglądaj Kategorie',
  subtitle: 'Wybierz interesujący Cię dział z tysiącami produktów od zweryfikowanych sprzedawców',
  showSectionHeader: true,
  headerAlignment: 'left',
  displayMode: 'tiles',
  columnsDesktop: 6,
  columnsTablet: 3,
  columnsMobile: 2,
  limitCount: 12,
  customLimitCount: 12,
  paginationType: 'show_more',
  sortOrder: 'system_default',
  filterFeaturedOnly: false,
  filterWithProductsOnly: false,
  containerWidthPreset: 'wide',
  containerMaxWidth: 1380,
  cardLayout: 'image_top',
  contentAlign: 'center',
  cardHeightMode: 'auto',
  cardFixedHeight: 180,
  cardPadding: {
    top: 14,
    right: 14,
    bottom: 16,
    left: 14,
    isLocked: true
  },
  cardGap: 16,
  sectionPaddingY: 32,
  sectionPaddingX: 16,
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  glassmorphism: {
    enabled: false,
    blurPx: 12,
    opacity: 85
  },
  image: {
    show: true,
    heightPx: 110,
    aspectRatio: '1:1',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: 12,
    borderWidth: 0,
    borderColor: '#e2e8f0',
    shadow: 'sm',
    opacity: 100,
    placeholderMode: 'default_image',
    placeholderBgColor: '#f1f5f9'
  },
  overlay: {
    type: 'none',
    color: '#000000',
    opacity: 20,
    hoverOpacity: 40
  },
  nameTypography: {
    show: true,
    fontSizePx: 14,
    fontFamily: 'sans',
    fontWeight: '600',
    color: '#0f172a',
    hoverColor: '#2563eb',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    textTransform: 'none',
    maxLines: 2
  },
  productCount: {
    show: true,
    position: 'below_name',
    formatTemplate: '{count} produktów',
    fontSizePx: 12,
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderRadius: 9999,
    padding: '2px 8px',
    showZeroCount: true
  },
  icon: {
    show: false,
    source: 'system',
    defaultIconName: 'Grid',
    sizePx: 20,
    color: '#2563eb',
    position: 'beside_name',
    opacity: 100
  },
  border: {
    style: 'solid',
    width: 1,
    color: '#e2e8f0',
    hoverColor: '#93c5fd',
    radiusPreset: 'lg',
    radiusTopLeft: 16,
    radiusTopRight: 16,
    radiusBottomRight: 16,
    radiusBottomLeft: 16
  },
  shadow: {
    preset: 'sm',
    x: 0,
    y: 1,
    blur: 3,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.05)',
    inset: false
  },
  hover: {
    cardBgColor: '#ffffff',
    cardTextColor: '#2563eb',
    cardScale: 1.02,
    translateYPx: -3,
    shadowPreset: 'md',
    borderColor: '#3b82f6',
    imageEffect: 'zoom',
    imageScale: 1.06,
    transitionDurationMs: 250
  },
  animation: {
    type: 'fade',
    durationMs: 300,
    staggerDelayMs: 40,
    easing: 'ease-out'
  },
  showMoreButton: {
    show: true,
    text: 'Zobacz wszystkie kategorie',
    icon: 'ArrowRight',
    position: 'center',
    action: 'expand_inline',
    targetUrl: '/kategorie',
    textColor: '#1d4ed8',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderRadius: 12,
    hoverBgColor: '#dbeafe',
    hoverTextColor: '#1e40af',
    shadow: 'sm'
  },
  responsive: {
    tablet: {
      columns: 3,
      limitCount: 9,
      fontSizePx: 13,
      gap: 12,
      showImage: true,
      showProductCount: true
    },
    mobile: {
      columns: 2,
      limitCount: 6,
      fontSizePx: 12,
      gap: 10,
      showImage: true,
      showProductCount: false,
      displayMode: 'tiles'
    }
  },
  useGlobalStyles: true,
  activePreset: 'cards'
};

export interface CategoryPresetDefinition {
  name: string;
  presetKey: CategoriesPresetStyleName;
  description: string;
  badge: string;
  config: Partial<CategoriesWidgetConfig>;
}

export const CATEGORIES_PRESETS: CategoryPresetDefinition[] = [
  {
    name: 'Klasyczne Karty (Cards)',
    presetKey: 'cards',
    description: 'Czysty, estetyczny layout z zaokrąglonymi kafelkami, zdjęciem na górze i subtelnym cieniem.',
    badge: 'Popularny',
    config: {
      displayMode: 'tiles',
      columnsDesktop: 6,
      cardLayout: 'image_top',
      contentAlign: 'center',
      backgroundColor: '#ffffff',
      border: {
        style: 'solid',
        width: 1,
        color: '#e2e8f0',
        hoverColor: '#93c5fd',
        radiusPreset: 'lg',
        radiusTopLeft: 16,
        radiusTopRight: 16,
        radiusBottomRight: 16,
        radiusBottomLeft: 16
      },
      image: {
        show: true,
        heightPx: 105,
        aspectRatio: '1:1',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#e2e8f0',
        shadow: 'sm',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#f1f5f9'
      },
      shadow: { preset: 'sm', x: 0, y: 1, blur: 3, spread: 0, color: 'rgba(0,0,0,0.06)', inset: false },
      hover: {
        cardBgColor: '#ffffff',
        cardTextColor: '#2563eb',
        cardScale: 1.02,
        translateYPx: -3,
        shadowPreset: 'md',
        borderColor: '#3b82f6',
        imageEffect: 'zoom',
        imageScale: 1.06,
        transitionDurationMs: 250
      },
      productCount: {
        show: true,
        position: 'below_name',
        formatTemplate: '{count} produktów',
        fontSizePx: 12,
        color: '#64748b',
        bgColor: '#f1f5f9',
        borderRadius: 9999,
        padding: '2px 8px',
        showZeroCount: true
      }
    }
  },
  {
    name: 'Karty ze Zdjęciem w Tle (Image Cards)',
    presetKey: 'image_cards',
    description: 'Imponujące kafelki z pełnym zdjęciem w tle, ciemnym overlayem i białym tekstem.',
    badge: 'Premium',
    config: {
      displayMode: 'grid',
      columnsDesktop: 4,
      cardLayout: 'image_background',
      contentAlign: 'left',
      cardFixedHeight: 200,
      cardHeightMode: 'fixed',
      backgroundColor: '#0f172a',
      cardPadding: { top: 20, right: 20, bottom: 20, left: 20, isLocked: true },
      image: {
        show: true,
        aspectRatio: '16:9',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 16,
        borderWidth: 0,
        borderColor: 'transparent',
        shadow: 'md',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#1e293b'
      },
      overlay: {
        type: 'dark',
        color: '#000000',
        opacity: 50,
        hoverOpacity: 30
      },
      nameTypography: {
        show: true,
        fontSizePx: 18,
        fontFamily: 'display',
        fontWeight: '700',
        color: '#ffffff',
        hoverColor: '#60a5fa',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textTransform: 'none',
        maxLines: 2
      },
      productCount: {
        show: true,
        position: 'below_name',
        formatTemplate: '{count} ofert',
        fontSizePx: 13,
        color: '#cbd5e1',
        bgColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 6,
        padding: '3px 10px',
        showZeroCount: true
      },
      border: {
        style: 'solid',
        width: 1,
        color: 'rgba(255, 255, 255, 0.1)',
        hoverColor: 'rgba(255, 255, 255, 0.3)',
        radiusPreset: 'xl',
        radiusTopLeft: 16,
        radiusTopRight: 16,
        radiusBottomRight: 16,
        radiusBottomLeft: 16
      },
      hover: {
        cardScale: 1.03,
        translateYPx: -4,
        shadowPreset: 'xl',
        imageEffect: 'zoom',
        imageScale: 1.1,
        transitionDurationMs: 300
      }
    }
  },
  {
    name: 'Nowoczesny Minimalizm (Modern)',
    presetKey: 'modern',
    description: 'Subtelne linie, minimalistyczne ramki, wyrafinowane proporcje i czysta typografia.',
    badge: 'Trend',
    config: {
      displayMode: 'tiles',
      columnsDesktop: 6,
      cardLayout: 'image_top',
      contentAlign: 'center',
      backgroundColor: '#f8fafc',
      border: {
        style: 'solid',
        width: 1,
        color: '#e2e8f0',
        hoverColor: '#0f172a',
        radiusPreset: 'md',
        radiusTopLeft: 8,
        radiusTopRight: 8,
        radiusBottomRight: 8,
        radiusBottomLeft: 8
      },
      image: {
        show: true,
        heightPx: 90,
        aspectRatio: '1:1',
        objectFit: 'contain',
        objectPosition: 'center',
        borderRadius: 8,
        borderWidth: 0,
        borderColor: '#e2e8f0',
        shadow: 'none',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#f1f5f9'
      },
      shadow: { preset: 'none', x: 0, y: 0, blur: 0, spread: 0, color: 'transparent', inset: false },
      hover: {
        cardBgColor: '#ffffff',
        cardTextColor: '#0f172a',
        cardScale: 1.01,
        translateYPx: -2,
        shadowPreset: 'md',
        borderColor: '#0f172a',
        imageEffect: 'scale',
        imageScale: 1.04,
        transitionDurationMs: 200
      }
    }
  },
  {
    name: 'Okrągłe Kapsułki (Rounded Pills)',
    presetKey: 'rounded',
    description: 'Okrągłe awatary kategorii z etykietami, styl popularnych aplikacji mobilnych i marketplace.',
    badge: 'Mobile-first',
    config: {
      displayMode: 'carousel',
      columnsDesktop: 6,
      cardLayout: 'image_top',
      contentAlign: 'center',
      backgroundColor: 'transparent',
      border: {
        style: 'none',
        width: 0,
        color: 'transparent',
        radiusPreset: 'circle',
        radiusTopLeft: 9999,
        radiusTopRight: 9999,
        radiusBottomRight: 9999,
        radiusBottomLeft: 9999
      },
      image: {
        show: true,
        widthPx: 88,
        heightPx: 88,
        aspectRatio: 'circle',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 9999,
        borderWidth: 3,
        borderColor: '#e0e7ff',
        shadow: 'md',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#eff6ff'
      },
      shadow: { preset: 'none', x: 0, y: 0, blur: 0, spread: 0, color: 'transparent', inset: false },
      hover: {
        cardScale: 1.05,
        translateYPx: -4,
        imageEffect: 'zoom',
        imageScale: 1.08,
        borderColor: '#4f46e5',
        transitionDurationMs: 250
      },
      productCount: {
        show: false,
        position: 'below_name',
        formatTemplate: '{count}',
        fontSizePx: 11,
        color: '#6b7280',
        bgColor: '#f3f4f6',
        borderRadius: 9999,
        padding: '1px 6px',
        showZeroCount: true
      }
    }
  },
  {
    name: 'Ekskluzywny Luksus (Premium)',
    presetKey: 'premium',
    description: 'Głęboki antracyt, złote akcenty obramowania, elegancki szeryfowy lub display font.',
    badge: 'Luksus',
    config: {
      displayMode: 'grid',
      columnsDesktop: 4,
      cardLayout: 'image_background',
      contentAlign: 'center',
      cardFixedHeight: 220,
      cardHeightMode: 'fixed',
      backgroundColor: '#090d16',
      image: {
        show: true,
        aspectRatio: '16:9',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 14,
        borderWidth: 0,
        borderColor: 'transparent',
        shadow: 'lg',
        opacity: 85,
        placeholderMode: 'default_image',
        placeholderBgColor: '#111827'
      },
      overlay: {
        type: 'dark',
        color: '#030712',
        opacity: 65,
        hoverOpacity: 40
      },
      nameTypography: {
        show: true,
        fontSizePx: 19,
        fontFamily: 'serif',
        fontWeight: '700',
        color: '#f8fafc',
        hoverColor: '#fbbf24',
        lineHeight: 1.2,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        maxLines: 2
      },
      border: {
        style: 'solid',
        width: 1,
        color: 'rgba(217, 119, 6, 0.3)',
        hoverColor: 'rgba(245, 158, 11, 0.8)',
        radiusPreset: 'lg',
        radiusTopLeft: 14,
        radiusTopRight: 14,
        radiusBottomRight: 14,
        radiusBottomLeft: 14
      },
      shadow: { preset: 'lg', x: 0, y: 10, blur: 25, spread: -5, color: 'rgba(0,0,0,0.5)', inset: false },
      hover: {
        cardScale: 1.03,
        translateYPx: -4,
        shadowPreset: 'xl',
        glowColor: '#d97706',
        imageEffect: 'shine',
        imageScale: 1.08,
        transitionDurationMs: 300
      }
    }
  },
  {
    name: 'Szkło & Rozmycie (Glassmorphism)',
    presetKey: 'glass',
    description: 'Półprzezroczyste panele ze szklanym rozmyciem tła (backdrop-filter blur).',
    badge: 'Aero Glass',
    config: {
      displayMode: 'tiles',
      columnsDesktop: 4,
      cardLayout: 'image_left',
      contentAlign: 'left',
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      backgroundType: 'glass',
      glassmorphism: { enabled: true, blurPx: 16, opacity: 70 },
      border: {
        style: 'solid',
        width: 1,
        color: 'rgba(255, 255, 255, 0.6)',
        hoverColor: 'rgba(59, 130, 246, 0.5)',
        radiusPreset: 'xl',
        radiusTopLeft: 16,
        radiusTopRight: 16,
        radiusBottomRight: 16,
        radiusBottomLeft: 16
      },
      image: {
        show: true,
        widthPx: 80,
        heightPx: 80,
        aspectRatio: '1:1',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 12,
        borderWidth: 0,
        borderColor: '#e2e8f0',
        shadow: 'sm',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#f1f5f9'
      },
      shadow: { preset: 'md', x: 0, y: 4, blur: 16, spread: 0, color: 'rgba(0,0,0,0.06)', inset: false },
      hover: {
        cardBgColor: 'rgba(255, 255, 255, 0.85)',
        cardScale: 1.02,
        translateYPx: -3,
        shadowPreset: 'lg',
        imageEffect: 'scale',
        imageScale: 1.05,
        transitionDurationMs: 250
      }
    }
  },
  {
    name: 'Cyber Neon (Glow)',
    presetKey: 'neon',
    description: 'Futurystyczny ciemny motyw z poświatą neonową i wyrazistymi akcentami cyan/purple.',
    badge: 'Futuristic',
    config: {
      displayMode: 'grid',
      columnsDesktop: 4,
      cardLayout: 'image_top',
      contentAlign: 'center',
      backgroundColor: '#0a0e1a',
      border: {
        style: 'solid',
        width: 1,
        color: '#06b6d4',
        hoverColor: '#38bdf8',
        radiusPreset: 'lg',
        radiusTopLeft: 14,
        radiusTopRight: 14,
        radiusBottomRight: 14,
        radiusBottomLeft: 14
      },
      image: {
        show: true,
        heightPx: 110,
        aspectRatio: '16:9',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 10,
        borderWidth: 0,
        borderColor: 'transparent',
        shadow: 'sm',
        opacity: 90,
        placeholderMode: 'default_image',
        placeholderBgColor: '#0f172a'
      },
      nameTypography: {
        show: true,
        fontSizePx: 15,
        fontFamily: 'mono',
        fontWeight: '700',
        color: '#38bdf8',
        hoverColor: '#e0f2fe',
        lineHeight: 1.3,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        maxLines: 2
      },
      shadow: { preset: 'glow', x: 0, y: 0, blur: 15, spread: 1, color: 'rgba(6, 182, 212, 0.35)', inset: false },
      hover: {
        cardBgColor: '#0f172a',
        cardScale: 1.03,
        translateYPx: -4,
        shadowPreset: 'glow',
        glowColor: '#06b6d4',
        imageEffect: 'brightness',
        imageScale: 1.08,
        transitionDurationMs: 250
      }
    }
  },
  {
    name: 'Kompaktowa Lista (Compact List)',
    presetKey: 'compact',
    description: 'Zwarta lista wierszowa z ikoną i licznikiem produktów, idealna do bocznych menu.',
    badge: 'Wierszowy',
    config: {
      displayMode: 'list_with_icons',
      columnsDesktop: 3,
      cardLayout: 'image_left',
      contentAlign: 'left',
      cardFixedHeight: 54,
      cardHeightMode: 'fixed',
      cardPadding: { top: 8, right: 14, bottom: 8, left: 14, isLocked: false },
      backgroundColor: '#ffffff',
      icon: {
        show: true,
        source: 'system',
        defaultIconName: 'Grid',
        sizePx: 18,
        color: '#2563eb',
        position: 'beside_name',
        opacity: 100
      },
      image: {
        show: false,
        aspectRatio: '1:1',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 6,
        borderWidth: 0,
        borderColor: '#e2e8f0',
        shadow: 'none',
        opacity: 100,
        placeholderMode: 'category_icon',
        placeholderBgColor: '#f1f5f9'
      },
      border: {
        style: 'solid',
        width: 1,
        color: '#f1f5f9',
        hoverColor: '#cbd5e1',
        radiusPreset: 'md',
        radiusTopLeft: 8,
        radiusTopRight: 8,
        radiusBottomRight: 8,
        radiusBottomLeft: 8
      },
      shadow: { preset: 'none', x: 0, y: 0, blur: 0, spread: 0, color: 'transparent', inset: false },
      hover: {
        cardBgColor: '#f8fafc',
        cardTextColor: '#1d4ed8',
        cardScale: 1.0,
        translateYPx: 0,
        borderColor: '#93c5fd',
        imageEffect: 'none',
        imageScale: 1.0,
        transitionDurationMs: 150
      }
    }
  },
  {
    name: 'Duże Banery Kategorii (Large Categories)',
    presetKey: 'large_categories',
    description: 'Panoramiczne, wysokie kafelki z opisem kategorii i wyraźnym przyciskiem akcji.',
    badge: 'Hero Showcase',
    config: {
      displayMode: 'grid',
      columnsDesktop: 3,
      cardLayout: 'image_background',
      contentAlign: 'left',
      cardFixedHeight: 260,
      cardHeightMode: 'fixed',
      cardPadding: { top: 24, right: 24, bottom: 24, left: 24, isLocked: true },
      image: {
        show: true,
        aspectRatio: '16:9',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 20,
        borderWidth: 0,
        borderColor: 'transparent',
        shadow: 'lg',
        opacity: 100,
        placeholderMode: 'default_image',
        placeholderBgColor: '#0f172a'
      },
      overlay: {
        type: 'gradient',
        color: '#000000',
        opacity: 60,
        hoverOpacity: 45
      },
      nameTypography: {
        show: true,
        fontSizePx: 22,
        fontFamily: 'display',
        fontWeight: '800',
        color: '#ffffff',
        hoverColor: '#93c5fd',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textTransform: 'none',
        maxLines: 2
      },
      border: {
        style: 'none',
        width: 0,
        color: 'transparent',
        radiusPreset: '2xl',
        radiusTopLeft: 20,
        radiusTopRight: 20,
        radiusBottomRight: 20,
        radiusBottomLeft: 20
      },
      shadow: { preset: 'lg', x: 0, y: 10, blur: 20, spread: -3, color: 'rgba(0,0,0,0.2)', inset: false },
      hover: {
        cardScale: 1.03,
        translateYPx: -5,
        shadowPreset: 'xl',
        imageEffect: 'zoom',
        imageScale: 1.08,
        transitionDurationMs: 300
      }
    }
  }
];

export function getProcessedCategories(
  categories: SystemCategory[],
  config: CategoriesWidgetConfig,
  limitOverride?: number
): SystemCategory[] {
  let result = [...categories];

  // 1. Filtering
  if (config.filterFeaturedOnly) {
    result = result.filter((cat) => cat.isFeatured);
  }
  if (config.filterWithProductsOnly) {
    result = result.filter((cat) => (cat.productCount || 0) > 0);
  }

  // 2. Sorting
  switch (config.sortOrder) {
    case 'alpha_asc':
      result.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
      break;
    case 'alpha_desc':
      result.sort((a, b) => b.name.localeCompare(a.name, 'pl'));
      break;
    case 'popularity':
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'product_count_desc':
      result.sort((a, b) => (b.productCount || 0) - (a.productCount || 0));
      break;
    case 'newest':
      result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      break;
    case 'system_default':
    default:
      // Keep system defined order
      break;
  }

  // 3. Limiting
  const effectiveLimit = limitOverride !== undefined 
    ? limitOverride 
    : config.limitCount === 'all' 
      ? result.length 
      : (config.limitCount || 12);

  if (effectiveLimit && effectiveLimit < result.length) {
    result = result.slice(0, effectiveLimit);
  }

  return result;
}
