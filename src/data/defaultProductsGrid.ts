import {
  ProductsGridWidgetConfig,
  ProductGridPresetStyleName
} from '../types/storeAppearance';

export const defaultProductsGridConfig: ProductsGridWidgetConfig = {
  enabled: true,
  title: 'Bestsellery & Wybrane Oferty',
  subtitle: 'Odkryj najchętniej wybierane produkty od sprawdzonych sprzedawców w najlepszych cenach',
  showSectionHeader: true,
  headerAlignment: 'left',
  containerWidthPreset: 'wide',
  containerMaxWidth: 1380,

  // 3. Układ siatki
  displayMode: 'cards',

  // 4. Liczba kolumn
  columnsDesktop: 4,
  columnsTablet: 2,
  columnsMobile: 2,

  // 5. Odstępy
  gapDesktopX: 20,
  gapDesktopY: 24,
  gapTabletX: 16,
  gapTabletY: 16,
  gapMobileX: 12,
  gapMobileY: 12,
  sectionPaddingY: 40,
  sectionPaddingX: 16,

  // 6. Wymiary karty
  cardWidthMode: 'auto',
  cardHeightMode: 'equal',
  cardPadding: {
    top: 14,
    right: 14,
    bottom: 16,
    left: 14,
    isLocked: true
  },

  // 7, 8, 9, 10. Zdjęcie produktu
  image: {
    show: true,
    aspectRatio: '1:1',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: 14,
    borderWidth: 0,
    borderColor: '#e2e8f0',
    shadow: 'none',
    opacity: 100,
    multiImageBehavior: 'hover_second',
    hoverEffect: 'zoom',
    zoomScale: 1.06,
    placeholderMode: 'default',
    placeholderIcon: 'Package',
    placeholderBgColor: '#f1f5f9'
  },

  // 11, 27. Tło karty & Glassmorphism
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  glassmorphism: {
    enabled: false,
    blurPx: 12,
    opacity: 90,
    borderGlow: false,
    highlight: false
  },

  // 12. Nazwa produktu
  nameTypography: {
    show: true,
    fontFamily: 'sans',
    fontSizePx: 15,
    fontWeight: '600',
    color: '#0f172a',
    hoverColor: '#2563eb',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
    textAlign: 'left',
    maxLines: 2,
    textTransform: 'none'
  },

  // Kategoria / Marka nad nazwą
  metaTypography: {
    showCategory: true,
    showBrand: true,
    fontFamily: 'sans',
    fontSizePx: 11,
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'none'
  },

  // Krótki opis
  descriptionTypography: {
    show: false,
    fontSizePx: 12,
    color: '#64748b',
    maxLines: 2,
    lineHeight: 1.4
  },

  // 13. Cena
  price: {
    show: true,
    fontSizePx: 18,
    fontFamily: 'sans',
    fontWeight: '800',
    color: '#0f172a',
    align: 'left',
    showOldPrice: true,
    oldPriceColor: '#94a3b8',
    oldPriceStrikethrough: true,
    oldPriceFontSizePx: 13,
    promoDiscountBadge: {
      show: true,
      textTemplate: '-{discount}%',
      bgColor: '#fee2e2',
      textColor: '#dc2626',
      borderRadius: 6
    }
  },

  // 14. Waluta
  currency: {
    symbolPosition: 'suffix',
    spacing: 'small',
    style: 'standard'
  },

  // 15, 16. Ocena & Opinie
  rating: {
    show: true,
    showStars: true,
    showScore: true,
    showReviewsCount: true,
    starColor: '#f59e0b',
    emptyStarColor: '#e2e8f0',
    starSizePx: 13,
    reviewsFormat: '({count})',
    reviewsColor: '#64748b',
    reviewsFontSizePx: 11,
    position: 'inline'
  },

  // 17, 18. Badge produktu
  badge: {
    show: true,
    position: 'top-left',
    fontSizePx: 10,
    fontWeight: '700',
    borderRadius: 9999,
    padding: '3px 9px',
    shadow: 'sm',
    customColors: {
      newArrivalBg: '#2563eb',
      newArrivalText: '#ffffff',
      saleBg: '#dc2626',
      saleText: '#ffffff',
      bestsellerBg: '#f59e0b',
      bestsellerText: '#ffffff',
      recommendedBg: '#059669',
      recommendedText: '#ffffff',
      outOfStockBg: '#475569',
      outOfStockText: '#ffffff'
    }
  },

  // 19, 20, 21, 22. Przyciski
  buttons: {
    addToCart: {
      show: true,
      text: 'Do koszyka',
      icon: 'ShoppingBag',
      iconPosition: 'left',
      size: 'md',
      bgColor: '#2563eb',
      textColor: '#ffffff',
      borderColor: 'transparent',
      borderRadius: 12,
      shadow: 'sm',
      hoverBgColor: '#1d4ed8',
      hoverTextColor: '#ffffff',
      animation: 'scale',
      showSuccessFeedback: true
    },
    buyNow: {
      show: false,
      text: 'Kup teraz',
      icon: 'Zap',
      bgColor: '#f59e0b',
      textColor: '#ffffff',
      borderRadius: 12,
      hoverBgColor: '#d97706'
    },
    wishlist: {
      show: true,
      icon: 'Heart',
      sizePx: 15,
      color: '#64748b',
      activeColor: '#ef4444',
      bgColor: 'rgba(255, 255, 255, 0.9)',
      activeBgColor: '#fee2e2',
      borderColor: '#e2e8f0',
      borderRadius: 9999,
      position: 'top_right',
      animation: 'heart_bounce'
    },
    quickView: {
      show: true,
      icon: 'Eye',
      text: 'Szybki podgląd',
      position: 'hover_overlay',
      bgColor: 'rgba(15, 23, 42, 0.85)',
      textColor: '#ffffff',
      borderRadius: 8
    },
    detailsLink: {
      show: true,
      text: 'Szczegóły',
      icon: 'ArrowRight'
    }
  },

  // 23. Hover karty
  hover: {
    cardBgColor: '#ffffff',
    borderColor: '#93c5fd',
    shadowPreset: 'xl',
    scale: 1.015,
    translateYPx: -4,
    showOverlay: false,
    overlayColor: 'rgba(0,0,0,0.05)',
    overlayOpacity: 0,
    transitionDurationMs: 250
  },

  // 24, 25. Border & Radius
  border: {
    style: 'solid',
    width: 1,
    color: '#e2e8f0',
    hoverColor: '#3b82f6',
    sides: {
      top: true,
      right: true,
      bottom: true,
      left: true
    },
    radiusPreset: 'xl',
    radiusTopLeft: 18,
    radiusTopRight: 18,
    radiusBottomRight: 18,
    radiusBottomLeft: 18
  },

  // 26. Shadow
  shadow: {
    preset: 'sm',
    x: 0,
    y: 2,
    blur: 6,
    spread: -1,
    color: 'rgba(0, 0, 0, 0.06)',
    inset: false
  },

  // 29. Układ elementów karty (kolejność)
  elementsOrder: [
    'image',
    'badge',
    'category_brand',
    'name',
    'rating',
    'price',
    'buttons'
  ],

  // 30. Widoczność elementów
  visibility: {
    image: true,
    badge: true,
    category: true,
    brand: true,
    name: true,
    description: false,
    rating: true,
    reviewsCount: true,
    price: true,
    oldPrice: true,
    promoDiscount: true,
    addToCart: true,
    buyNow: false,
    wishlist: true,
    quickView: true,
    stockStatus: false,
    variants: false
  },

  // 31, 32. Sortowanie & Filtrowanie
  sortingFiltering: {
    sortOrder: 'system_default',
    showSortDropdown: true,
    showFilterBar: true,
    filterCategories: true,
    filterPriceRange: true,
    filterBrands: true,
    filterInStockOnly: true,
    filterOnSaleOnly: true,
    activeCategoryFilter: 'all'
  },

  // 33, 34. Paginacja
  pagination: {
    type: 'load_more',
    itemsPerPage: 8,
    loadMoreButton: {
      text: 'Załaduj więcej produktów',
      icon: 'ChevronDown',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      borderColor: '#cbd5e1',
      borderRadius: 14,
      hoverBgColor: '#f8fafc',
      hoverTextColor: '#0f172a',
      shadow: 'sm',
      width: 'auto',
      heightPx: 44
    }
  },

  // 36, 37. Responsywność
  responsive: {
    tablet: {
      columns: 2,
      fontSizePx: 14,
      gapX: 16,
      gapY: 16,
      cardPadding: 12
    },
    mobile: {
      columns: 2,
      layoutMode: 'grid',
      fontSizePx: 13,
      gapX: 10,
      gapY: 10,
      cardPadding: 10,
      iconOnlyButtons: false,
      hideSecondaryInfo: false
    }
  },

  // 38, 39. Animacje
  animation: {
    type: 'fade',
    durationMs: 280,
    staggerDelayMs: 35,
    easing: 'ease-out'
  },

  // 41. Globalne style
  useGlobalStyles: false,
  activePreset: 'marketplace',
  isDemoData: false
};

export interface ProductGridPresetItem {
  id: ProductGridPresetStyleName;
  name: string;
  category: 'Nowoczesne' | 'Czyste / Jasne' | 'Ciemne / Luxury' | 'Układy Specjalne';
  description: string;
  previewColors: {
    bg: string;
    cardBg: string;
    text: string;
    accent: string;
    border: string;
  };
  config: Partial<ProductsGridWidgetConfig>;
}

export const PRODUCTS_GRID_PRESETS: ProductGridPresetItem[] = [
  {
    id: 'marketplace',
    name: '1. Marketplace Pro (Domyślny)',
    category: 'Nowoczesne',
    description: 'Zaawansowany e-commerce z ocenami, odznakami rabatów, szybkim podglądem i przyciskami koszyka.',
    previewColors: {
      bg: '#f8fafc',
      cardBg: '#ffffff',
      text: '#0f172a',
      accent: '#2563eb',
      border: '#e2e8f0'
    },
    config: {
      displayMode: 'cards',
      backgroundType: 'solid',
      backgroundColor: '#ffffff',
      border: {
        style: 'solid',
        width: 1,
        color: '#e2e8f0',
        hoverColor: '#3b82f6',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: 'xl',
        radiusTopLeft: 18,
        radiusTopRight: 18,
        radiusBottomRight: 18,
        radiusBottomLeft: 18
      },
      shadow: {
        preset: 'sm',
        x: 0,
        y: 2,
        blur: 6,
        spread: -1,
        color: 'rgba(0, 0, 0, 0.06)',
        inset: false
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#2563eb',
          textColor: '#ffffff',
          borderRadius: 12
        }
      }
    }
  },
  {
    id: 'minimal',
    name: '2. Minimal (Czysta Elegancja)',
    category: 'Czyste / Jasne',
    description: 'Subtelne linie, dużo oddechu, delikatne bezramkowe karty z wyrafinowaną typografią.',
    previewColors: {
      bg: '#ffffff',
      cardBg: '#ffffff',
      text: '#18181b',
      accent: '#18181b',
      border: '#f4f4f5'
    },
    config: {
      displayMode: 'grid',
      backgroundType: 'transparent',
      backgroundColor: 'transparent',
      border: {
        style: 'none',
        width: 0,
        color: 'transparent',
        sides: { top: false, right: false, bottom: false, left: false },
        radiusPreset: 'md',
        radiusTopLeft: 8,
        radiusTopRight: 8,
        radiusBottomRight: 8,
        radiusBottomLeft: 8
      },
      shadow: {
        preset: 'none',
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: 'transparent',
        inset: false
      },
      image: {
        ...defaultProductsGridConfig.image,
        borderRadius: 8,
        hoverEffect: 'fade',
        zoomScale: 1.02
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#18181b',
          textColor: '#ffffff',
          borderRadius: 6
        }
      }
    }
  },
  {
    id: 'modern',
    name: '3. Modern Soft (Miękkie Cienie)',
    category: 'Nowoczesne',
    description: 'Duże zaokrąglenia, puszyste cienie, interaktywny hover z lekkim unoszeniem.',
    previewColors: {
      bg: '#f1f5f9',
      cardBg: '#ffffff',
      text: '#0f172a',
      accent: '#4f46e5',
      border: '#e2e8f0'
    },
    config: {
      displayMode: 'cards',
      backgroundColor: '#ffffff',
      border: {
        style: 'solid',
        width: 1,
        color: '#f1f5f9',
        hoverColor: '#818cf8',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: '2xl',
        radiusTopLeft: 24,
        radiusTopRight: 24,
        radiusBottomRight: 24,
        radiusBottomLeft: 24
      },
      shadow: {
        preset: 'md',
        x: 0,
        y: 4,
        blur: 14,
        spread: -2,
        color: 'rgba(0, 0, 0, 0.08)',
        inset: false
      },
      image: {
        ...defaultProductsGridConfig.image,
        borderRadius: 18,
        hoverEffect: 'zoom',
        zoomScale: 1.08
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#4f46e5',
          textColor: '#ffffff',
          borderRadius: 16
        }
      }
    }
  },
  {
    id: 'premium',
    name: '4. Premium Luxury (Onyx & Złoto)',
    category: 'Ciemne / Luxury',
    description: 'Głęboki grafit i czerń ze złotymi akcentami, eleganckimi odznakami i ciemnymi kartami.',
    previewColors: {
      bg: '#090d16',
      cardBg: '#0f172a',
      text: '#f8fafc',
      accent: '#f59e0b',
      border: '#1e293b'
    },
    config: {
      displayMode: 'cards',
      backgroundType: 'solid',
      backgroundColor: '#0f172a',
      nameTypography: {
        ...defaultProductsGridConfig.nameTypography,
        color: '#f8fafc',
        hoverColor: '#fbbf24'
      },
      metaTypography: {
        ...defaultProductsGridConfig.metaTypography,
        color: '#94a3b8'
      },
      price: {
        ...defaultProductsGridConfig.price,
        color: '#fbbf24',
        oldPriceColor: '#64748b'
      },
      border: {
        style: 'solid',
        width: 1,
        color: '#1e293b',
        hoverColor: '#f59e0b',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: 'xl',
        radiusTopLeft: 16,
        radiusTopRight: 16,
        radiusBottomRight: 16,
        radiusBottomLeft: 16
      },
      shadow: {
        preset: 'lg',
        x: 0,
        y: 8,
        blur: 20,
        spread: -4,
        color: 'rgba(0, 0, 0, 0.4)',
        inset: false
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#f59e0b',
          textColor: '#0f172a',
          hoverBgColor: '#d97706',
          borderRadius: 12
        }
      }
    }
  },
  {
    id: 'glass',
    name: '5. Glassmorphism (Matowe Szkło)',
    category: 'Ciemne / Luxury',
    description: 'Półprzezroczyste karty z rozmyciem tła (backdrop blur), subtelną poświatą krawędzi i blaskiem.',
    previewColors: {
      bg: '#0f172a',
      cardBg: 'rgba(30, 41, 59, 0.65)',
      text: '#ffffff',
      accent: '#38bdf8',
      border: 'rgba(255, 255, 255, 0.15)'
    },
    config: {
      displayMode: 'cards',
      backgroundType: 'glass',
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      glassmorphism: {
        enabled: true,
        blurPx: 16,
        opacity: 75,
        borderGlow: true,
        highlight: true
      },
      nameTypography: {
        ...defaultProductsGridConfig.nameTypography,
        color: '#ffffff',
        hoverColor: '#38bdf8'
      },
      price: {
        ...defaultProductsGridConfig.price,
        color: '#38bdf8',
        oldPriceColor: '#94a3b8'
      },
      border: {
        style: 'solid',
        width: 1,
        color: 'rgba(255, 255, 255, 0.15)',
        hoverColor: '#38bdf8',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: 'xl',
        radiusTopLeft: 20,
        radiusTopRight: 20,
        radiusBottomRight: 20,
        radiusBottomLeft: 20
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#0284c7',
          textColor: '#ffffff',
          borderRadius: 12
        }
      }
    }
  },
  {
    id: 'neon',
    name: '6. Cyber Neon (Gaming & Tech)',
    category: 'Ciemne / Luxury',
    description: 'Neonowe ramki, jaskrawy cyjan i fiolet, gamingowy styl dla produktów technologicznych.',
    previewColors: {
      bg: '#050811',
      cardBg: '#090e1a',
      text: '#ffffff',
      accent: '#06b6d4',
      border: '#06b6d4'
    },
    config: {
      displayMode: 'cards',
      backgroundColor: '#090e1a',
      nameTypography: {
        ...defaultProductsGridConfig.nameTypography,
        color: '#ffffff',
        hoverColor: '#06b6d4'
      },
      price: {
        ...defaultProductsGridConfig.price,
        color: '#06b6d4',
        oldPriceColor: '#64748b'
      },
      border: {
        style: 'solid',
        width: 1.5,
        color: '#0e7490',
        hoverColor: '#06b6d4',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: 'md',
        radiusTopLeft: 10,
        radiusTopRight: 10,
        radiusBottomRight: 10,
        radiusBottomLeft: 10
      },
      shadow: {
        preset: 'glow',
        x: 0,
        y: 0,
        blur: 16,
        spread: -2,
        color: 'rgba(6, 182, 212, 0.35)',
        inset: false
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#06b6d4',
          textColor: '#050811',
          hoverBgColor: '#22d3ee',
          borderRadius: 8
        }
      }
    }
  },
  {
    id: 'clean',
    name: '7. Clean White (Wysoki Kontrast)',
    category: 'Czyste / Jasne',
    description: 'Prosty, funkcjonalny biały layout z czytelnym krojem pisma i wyraźnymi cenami.',
    previewColors: {
      bg: '#ffffff',
      cardBg: '#ffffff',
      text: '#0f172a',
      accent: '#059669',
      border: '#e2e8f0'
    },
    config: {
      displayMode: 'cards',
      backgroundColor: '#ffffff',
      border: {
        style: 'solid',
        width: 1,
        color: '#e2e8f0',
        hoverColor: '#059669',
        sides: { top: true, right: true, bottom: true, left: true },
        radiusPreset: 'lg',
        radiusTopLeft: 12,
        radiusTopRight: 12,
        radiusBottomRight: 12,
        radiusBottomLeft: 12
      },
      buttons: {
        ...defaultProductsGridConfig.buttons,
        addToCart: {
          ...defaultProductsGridConfig.buttons.addToCart,
          bgColor: '#059669',
          textColor: '#ffffff',
          borderRadius: 10
        }
      }
    }
  },
  {
    id: 'compact',
    name: '8. Kompaktowa Siatka (High Density)',
    category: 'Układy Specjalne',
    description: 'Zagęszczony widok o mniejszych kartach (5-6 kolumn), idealny dla hurtowni i bogatych katalogów.',
    previewColors: {
      bg: '#f8fafc',
      cardBg: '#ffffff',
      text: '#1e293b',
      accent: '#2563eb',
      border: '#e2e8f0'
    },
    config: {
      displayMode: 'compact_grid',
      columnsDesktop: 6,
      columnsTablet: 3,
      columnsMobile: 2,
      gapDesktopX: 12,
      gapDesktopY: 14,
      nameTypography: {
        ...defaultProductsGridConfig.nameTypography,
        fontSizePx: 13
      },
      price: {
        ...defaultProductsGridConfig.price,
        fontSizePx: 15
      },
      cardPadding: {
        top: 10,
        right: 10,
        bottom: 12,
        left: 10,
        isLocked: true
      }
    }
  },
  {
    id: 'large_cards',
    name: '9. Duże Karty Showcase (Boutique)',
    category: 'Układy Specjalne',
    description: '3 duże kolumny z dominującymi zdjęciami w wysokiej rozdzielczości i rozbudowanym opisem.',
    previewColors: {
      bg: '#fafafa',
      cardBg: '#ffffff',
      text: '#18181b',
      accent: '#ea580c',
      border: '#e4e4e7'
    },
    config: {
      displayMode: 'large_cards',
      columnsDesktop: 3,
      columnsTablet: 2,
      columnsMobile: 1,
      gapDesktopX: 28,
      gapDesktopY: 32,
      nameTypography: {
        ...defaultProductsGridConfig.nameTypography,
        fontSizePx: 18,
        fontWeight: '700'
      },
      price: {
        ...defaultProductsGridConfig.price,
        fontSizePx: 22
      },
      visibility: {
        ...defaultProductsGridConfig.visibility,
        description: true
      }
    }
  },
  {
    id: 'cards',
    name: '10. Product Cards (Standard E-Commerce)',
    category: 'Nowoczesne',
    description: 'Standardowe wyważone karty produktowe z pełnym zakresem informacji i akcjami.',
    previewColors: {
      bg: '#f8fafc',
      cardBg: '#ffffff',
      text: '#0f172a',
      accent: '#2563eb',
      border: '#cbd5e1'
    },
    config: {
      displayMode: 'cards',
      columnsDesktop: 4
    }
  }
];
