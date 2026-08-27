import React, { useState, useRef } from 'react';
import { CategoriesWidgetConfig, DevicePreview } from '../../../types/storeAppearance';
import { SystemCategory, SYSTEM_CATEGORIES } from '../../../data/marketplaceCatalogue';
import { getProcessedCategories } from '../../../data/defaultCategories';
import * as LucideIcons from 'lucide-react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Grid,
  Layers,
  Sparkles,
  ExternalLink,
  ShoppingBag,
  Zap,
  Home,
  Heart,
  TrendingUp,
  Truck,
  Monitor,
  Smartphone,
  Smile,
  BookOpen,
  Sun,
  Palette
} from 'lucide-react';

interface CategoriesWidgetRendererProps {
  config: CategoriesWidgetConfig;
  deviceViewport: DevicePreview;
  categoriesOverride?: SystemCategory[];
  onCategoryClick?: (category: SystemCategory) => void;
  selectedCategoryId?: string | null;
  className?: string;
  isInteractive?: boolean;
}

export const CategoriesWidgetRenderer: React.FC<CategoriesWidgetRendererProps> = ({
  config,
  deviceViewport,
  categoriesOverride,
  onCategoryClick,
  selectedCategoryId,
  className = '',
  isInteractive = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const allSystemCategories = categoriesOverride || SYSTEM_CATEGORIES;

  // Responsive column calculation
  const getColumnsCount = (): number => {
    if (deviceViewport === 'mobile') {
      if (config.responsive.mobile?.columns !== undefined && config.responsive.mobile.columns !== 'auto') {
        return Number(config.responsive.mobile.columns);
      }
      return config.columnsMobile === 'auto' ? 2 : Number(config.columnsMobile);
    }
    if (deviceViewport === 'tablet') {
      if (config.responsive.tablet?.columns !== undefined) {
        return Number(config.responsive.tablet.columns);
      }
      return Number(config.columnsTablet);
    }
    // Desktop
    return config.columnsDesktop === 'auto' ? 6 : Number(config.columnsDesktop);
  };

  const columnsCount = getColumnsCount();

  // Effective limit based on expanded state and viewport
  const getLimitCount = (): number | 'all' => {
    if (isExpanded) return 'all';
    if (deviceViewport === 'mobile' && config.responsive.mobile?.limitCount !== undefined) {
      return config.responsive.mobile.limitCount;
    }
    if (deviceViewport === 'tablet' && config.responsive.tablet?.limitCount !== undefined) {
      return config.responsive.tablet.limitCount;
    }
    return config.limitCount;
  };

  const effectiveLimit = getLimitCount();
  const displayedCategories = getProcessedCategories(
    allSystemCategories,
    config,
    effectiveLimit === 'all' ? allSystemCategories.length : effectiveLimit
  );

  const hasMoreCategories = displayedCategories.length < allSystemCategories.length;

  // Helper to render icon by name
  const renderCategoryIcon = (iconName: string, iconColor?: string, size: number = 20) => {
    const IconComponent = (LucideIcons as any)[iconName] || (LucideIcons as any)[config.icon.defaultIconName] || Grid;
    return <IconComponent style={{ width: size, height: size, color: iconColor || config.icon.color }} />;
  };

  // Carousel scroll helpers
  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (carouselContainerRef.current) {
      const scrollAmount = carouselContainerRef.current.clientWidth * 0.75;
      carouselContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Container width max
  const getContainerMaxWidth = (): string => {
    switch (config.containerWidthPreset) {
      case 'full':
        return '100%';
      case 'wide':
        return `${config.containerMaxWidth || 1380}px`;
      case 'standard':
        return '1200px';
      case 'narrow':
        return '960px';
      default:
        return `${config.containerMaxWidth || 1380}px`;
    }
  };

  // Shadow style
  const getCardShadowStyle = (isHovered: boolean): string => {
    const activePreset = isHovered && config.hover.shadowPreset ? config.hover.shadowPreset : config.shadow.preset;
    switch (activePreset) {
      case 'none':
        return 'none';
      case 'sm':
        return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      case 'md':
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      case 'lg':
        return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      case 'xl':
        return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      case '2xl':
        return '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      case 'glow':
        const glowColor = config.hover.glowColor || config.shadow.color || 'rgba(59, 130, 246, 0.4)';
        return `0 0 20px 2px ${glowColor}`;
      case 'custom':
        return `${config.shadow.inset ? 'inset ' : ''}${config.shadow.x}px ${config.shadow.y}px ${config.shadow.blur}px ${config.shadow.spread}px ${config.shadow.color}`;
      default:
        return '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
  };

  // Image effect on hover
  const getImageHoverTransform = (isHovered: boolean): string => {
    if (!isHovered) return 'scale(1) rotate(0deg)';
    const scaleVal = config.hover.imageScale || 1.06;
    switch (config.hover.imageEffect) {
      case 'zoom':
      case 'scale':
        return `scale(${scaleVal})`;
      case 'rotate':
        return `scale(${scaleVal}) rotate(2deg)`;
      default:
        return `scale(${scaleVal})`;
    }
  };

  const getImageHoverFilter = (isHovered: boolean): string => {
    if (!isHovered) return 'none';
    switch (config.hover.imageEffect) {
      case 'blur':
        return 'blur(2px)';
      case 'brightness':
        return 'brightness(1.15)';
      case 'darken':
        return 'brightness(0.85)';
      case 'lighten':
        return 'brightness(1.2)';
      case 'grayscale':
        return 'grayscale(100%)';
      case 'shine':
        return 'contrast(1.1) brightness(1.1)';
      default:
        return 'none';
    }
  };

  // Radius preset calculation
  const getRadiusStyle = () => {
    switch (config.border.radiusPreset) {
      case 'none':
        return '0px';
      case 'sm':
        return '4px';
      case 'md':
        return '8px';
      case 'lg':
        return '14px';
      case 'xl':
        return '20px';
      case '2xl':
        return '28px';
      case 'pill':
        return '9999px';
      case 'circle':
        return '9999px';
      case 'custom':
        return `${config.border.radiusTopLeft}px ${config.border.radiusTopRight}px ${config.border.radiusBottomRight}px ${config.border.radiusBottomLeft}px`;
      default:
        return '12px';
    }
  };

  // Grid columns class or style
  const getGridTemplateColumns = () => {
    if (config.displayMode === 'carousel' || config.displayMode === 'slider' || config.displayMode === 'horizontal_list') {
      return 'none';
    }
    return `repeat(${columnsCount}, minmax(0, 1fr))`;
  };

  if (!config.enabled) {
    return (
      <div className="w-full py-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 border-dashed text-slate-500 text-sm">
        <p>Widżet „Lista Kategorii” jest obecnie ukryty (wyłączony w konfiguracji).</p>
      </div>
    );
  }

  return (
    <section
      id="categories-showcase-widget"
      className={`w-full transition-all ${className}`}
      style={{
        paddingTop: `${config.sectionPaddingY}px`,
        paddingBottom: `${config.sectionPaddingY}px`,
        paddingLeft: `${config.sectionPaddingX}px`,
        paddingRight: `${config.sectionPaddingX}px`
      }}
    >
      <div
        className="mx-auto w-full transition-all"
        style={{ maxWidth: getContainerMaxWidth() }}
      >
        {/* Section Header */}
        {config.showSectionHeader && (
          <div
            className={`mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 ${
              config.headerAlignment === 'center'
                ? 'text-center md:items-center'
                : config.headerAlignment === 'right'
                ? 'text-right md:items-end'
                : 'text-left'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {config.title || 'Przeglądaj Kategorie'}
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {allSystemCategories.length} działów
                </span>
              </div>
              {config.subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  {config.subtitle}
                </p>
              )}
            </div>

            {/* Carousel navigation buttons in header or header-right action */}
            {(config.displayMode === 'carousel' || config.displayMode === 'slider') && (
              <div className="flex items-center gap-1.5 self-end md:self-auto">
                <button
                  type="button"
                  onClick={() => handleScrollCarousel('left')}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs"
                  aria-label="Poprzednia kategoria"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollCarousel('right')}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xs"
                  aria-label="Następna kategoria"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories Container */}
        {config.displayMode === 'carousel' || config.displayMode === 'slider' || config.displayMode === 'horizontal_list' ? (
          <div
            ref={carouselContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar"
            style={{
              gap: `${config.cardGap}px`,
              scrollSnapType: config.displayMode === 'slider' ? 'x mandatory' : 'none'
            }}
          >
            {displayedCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className="shrink-0"
                style={{
                  width:
                    deviceViewport === 'mobile'
                      ? '140px'
                      : deviceViewport === 'tablet'
                      ? '180px'
                      : config.displayMode === 'horizontal_list'
                      ? 'auto'
                      : `${100 / columnsCount - 2}%`,
                  minWidth: config.displayMode === 'horizontal_list' ? 'auto' : '130px',
                  scrollSnapAlign: 'start'
                }}
              >
                {renderCategoryCard(cat, idx)}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid transition-all"
            style={{
              gridTemplateColumns: getGridTemplateColumns(),
              gap: `${config.cardGap}px`
            }}
          >
            {displayedCategories.map((cat, idx) => (
              <div key={cat.id} className="w-full">
                {renderCategoryCard(cat, idx)}
              </div>
            ))}
          </div>
        )}

        {/* Show More / View All Button */}
        {config.showMoreButton.show && hasMoreCategories && (
          <div
            className={`mt-8 flex ${
              config.showMoreButton.position === 'left'
                ? 'justify-start'
                : config.showMoreButton.position === 'right'
                ? 'justify-end'
                : config.showMoreButton.position === 'full_width'
                ? 'w-full'
                : 'justify-center'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                if (config.showMoreButton.action === 'expand_inline') {
                  setIsExpanded(!isExpanded);
                } else if (isInteractive && onCategoryClick) {
                  onCategoryClick({
                    id: 'all_categories',
                    name: 'Wszystkie Kategorie',
                    slug: 'kategorie',
                    url: config.showMoreButton.targetUrl || '/kategorie',
                    icon: 'Grid',
                    productCount: allSystemCategories.reduce((acc, c) => acc + (c.productCount || 0), 0),
                    subcategories: []
                  });
                }
              }}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                config.showMoreButton.position === 'full_width' ? 'w-full' : ''
              }`}
              style={{
                color: config.showMoreButton.textColor,
                backgroundColor: config.showMoreButton.bgColor,
                border: `1px solid ${config.showMoreButton.borderColor}`,
                borderRadius: `${config.showMoreButton.borderRadius}px`
              }}
            >
              <span>{isExpanded ? 'Zwiń kategorie' : config.showMoreButton.text}</span>
              {renderCategoryIcon(config.showMoreButton.icon || 'ArrowRight', config.showMoreButton.textColor, 15)}
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // Card element renderer
  function renderCategoryCard(category: SystemCategory, index: number) {
    const isHovered = activeHoverId === category.id;
    const isSelected = selectedCategoryId === category.id;

    // Card background
    const getCardBg = (): string => {
      if (isHovered && config.hover.cardBgColor) {
        return config.hover.cardBgColor;
      }
      if (config.backgroundType === 'glass') {
        return config.backgroundColor || 'rgba(255, 255, 255, 0.75)';
      }
      return config.backgroundColor || '#ffffff';
    };

    // Border color
    const getBorderColor = (): string => {
      if (isSelected) return '#2563eb';
      if (isHovered && config.border.hoverColor) {
        return config.border.hoverColor;
      }
      return config.border.color || '#e2e8f0';
    };

    const isHorizontalLayout =
      config.cardLayout === 'image_left' ||
      config.cardLayout === 'image_right' ||
      config.displayMode === 'list' ||
      config.displayMode === 'list_with_icons' ||
      config.displayMode === 'list_with_images';

    const isBackgroundImage = config.cardLayout === 'image_background' || config.cardLayout === 'text_over_image';

    const hasImage = config.image.show && (category.image || config.image.placeholderMode !== 'category_icon');

    return (
      <div
        id={`cat-card-${category.id}`}
        onClick={() => {
          if (isInteractive && onCategoryClick) {
            onCategoryClick(category);
          }
        }}
        onMouseEnter={() => setActiveHoverId(category.id)}
        onMouseLeave={() => setActiveHoverId(null)}
        className={`group relative overflow-hidden transition-all select-none cursor-pointer flex ${
          isHorizontalLayout
            ? config.cardLayout === 'image_right'
              ? 'flex-row-reverse items-center justify-between'
              : 'flex-row items-center'
            : config.cardLayout === 'image_bottom'
            ? 'flex-col-reverse'
            : 'flex-col'
        } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
        style={{
          backgroundColor: getCardBg(),
          backdropFilter: config.backgroundType === 'glass' && config.glassmorphism.enabled ? `blur(${config.glassmorphism.blurPx}px)` : 'none',
          borderStyle: config.border.style === 'none' ? 'none' : config.border.style,
          borderWidth: `${config.border.width}px`,
          borderColor: getBorderColor(),
          borderRadius: getRadiusStyle(),
          boxShadow: getCardShadowStyle(isHovered),
          padding: `${config.cardPadding.top}px ${config.cardPadding.right}px ${config.cardPadding.bottom}px ${config.cardPadding.left}px`,
          height: config.cardHeightMode === 'fixed' ? `${config.cardFixedHeight || 180}px` : 'auto',
          transform: isHovered
            ? `scale(${config.hover.cardScale || 1.02}) translateY(${config.hover.translateYPx || -3}px)`
            : 'scale(1) translateY(0)',
          transitionDuration: `${config.hover.transitionDurationMs || 250}ms`
        }}
      >
        {/* Background Image Mode */}
        {isBackgroundImage && category.image && config.image.show && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              referrerPolicy="no-referrer"
              className="w-full h-full transition-all"
              style={{
                objectFit: config.image.objectFit || 'cover',
                objectPosition: config.image.objectPosition || 'center',
                transform: getImageHoverTransform(isHovered),
                filter: getImageHoverFilter(isHovered),
                transitionDuration: `${config.hover.transitionDurationMs || 300}ms`
              }}
            />
            {/* Overlay */}
            {config.overlay.type !== 'none' && (
              <div
                className="absolute inset-0 transition-opacity"
                style={{
                  backgroundColor: config.overlay.color || '#000000',
                  opacity: (isHovered ? config.overlay.hoverOpacity : config.overlay.opacity) / 100,
                  background:
                    config.overlay.type === 'gradient'
                      ? `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`
                      : config.overlay.color
                }}
              />
            )}
          </div>
        )}

        {/* Regular Image (Top, Left, Right, Bottom) */}
        {!isBackgroundImage && hasImage && (
          <div
            className={`relative overflow-hidden shrink-0 transition-all ${
              isHorizontalLayout ? 'mr-3' : 'mb-3 self-center'
            }`}
            style={{
              width: config.image.widthPx ? `${config.image.widthPx}px` : isHorizontalLayout ? '52px' : '100%',
              height: config.image.heightPx ? `${config.image.heightPx}px` : isHorizontalLayout ? '52px' : '100px',
              borderRadius:
                config.image.aspectRatio === 'circle'
                  ? '9999px'
                  : `${config.image.borderRadius}px`,
              borderWidth: `${config.image.borderWidth}px`,
              borderColor: config.image.borderColor,
              borderStyle: config.image.borderWidth > 0 ? 'solid' : 'none',
              backgroundColor: config.image.placeholderBgColor || '#f1f5f9'
            }}
          >
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full transition-all"
                style={{
                  objectFit: config.image.objectFit || 'cover',
                  objectPosition: config.image.objectPosition || 'center',
                  transform: getImageHoverTransform(isHovered),
                  filter: getImageHoverFilter(isHovered),
                  transitionDuration: `${config.hover.transitionDurationMs || 250}ms`
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                {renderCategoryIcon(category.icon || 'Grid', undefined, 24)}
              </div>
            )}
          </div>
        )}

        {/* Text and Counter Content Container */}
        <div
          className={`relative z-10 flex flex-col w-full ${
            isBackgroundImage ? 'mt-auto justify-end' : ''
          } ${
            config.contentAlign === 'center'
              ? 'items-center text-center'
              : config.contentAlign === 'right'
              ? 'items-end text-right'
              : 'items-start text-left'
          }`}
        >
          {/* Category Icon if positioned beside/above name */}
          {config.icon.show && config.icon.position === 'above_name' && (
            <div className="mb-1.5 p-1.5 rounded-lg bg-blue-50/80 dark:bg-slate-800/80">
              {renderCategoryIcon(
                category.icon,
                isHovered && config.icon.hoverColor ? config.icon.hoverColor : config.icon.color,
                config.icon.sizePx || 20
              )}
            </div>
          )}

          {/* Name & Inline Icon */}
          <div className="flex items-center gap-1.5 max-w-full">
            {config.icon.show && config.icon.position === 'beside_name' && (
              <span className="shrink-0">
                {renderCategoryIcon(
                  category.icon,
                  isHovered && config.icon.hoverColor ? config.icon.hoverColor : config.icon.color,
                  config.icon.sizePx || 16
                )}
              </span>
            )}

            {config.nameTypography.show && (
              <h3
                className={`font-semibold tracking-tight transition-colors line-clamp-${
                  config.nameTypography.maxLines === 1 ? '1' : '2'
                }`}
                style={{
                  fontSize: `${config.nameTypography.fontSizePx || 14}px`,
                  fontFamily:
                    config.nameTypography.fontFamily === 'serif'
                      ? 'serif'
                      : config.nameTypography.fontFamily === 'mono'
                      ? 'monospace'
                      : config.nameTypography.fontFamily === 'display'
                      ? 'system-ui, -apple-system, sans-serif'
                      : 'sans-serif',
                  fontWeight: Number(config.nameTypography.fontWeight || 600),
                  color: isHovered
                    ? config.nameTypography.hoverColor || '#2563eb'
                    : isBackgroundImage
                    ? config.nameTypography.color || '#ffffff'
                    : config.nameTypography.color || '#0f172a',
                  lineHeight: config.nameTypography.lineHeight || 1.3,
                  letterSpacing: config.nameTypography.letterSpacing || 'normal',
                  textTransform: config.nameTypography.textTransform || 'none'
                }}
              >
                {category.name}
              </h3>
            )}
          </div>

          {/* Product Count / Offer Badge */}
          {config.productCount.show && (category.productCount > 0 || config.productCount.showZeroCount) && (
            <div className="mt-1">
              <span
                className="inline-flex items-center font-medium transition-all"
                style={{
                  fontSize: `${config.productCount.fontSizePx || 12}px`,
                  color: isBackgroundImage ? '#e2e8f0' : config.productCount.color || '#64748b',
                  backgroundColor: isBackgroundImage
                    ? 'rgba(0,0,0,0.3)'
                    : config.productCount.bgColor || 'transparent',
                  borderRadius: `${config.productCount.borderRadius || 6}px`,
                  padding: config.productCount.padding || '0px'
                }}
              >
                {config.productCount.formatTemplate.replace('{count}', String(category.productCount || 0))}
              </span>
            </div>
          )}
        </div>

        {/* Badge in top-right or top-left corner */}
        {config.productCount.show &&
          (config.productCount.position === 'badge_top_right' ||
            config.productCount.position === 'badge_top_left') && (
            <div
              className={`absolute top-2.5 z-20 ${
                config.productCount.position === 'badge_top_right' ? 'right-2.5' : 'left-2.5'
              }`}
            >
              <span
                className="px-2 py-0.5 text-[11px] font-bold rounded-full shadow-xs"
                style={{
                  color: config.productCount.color || '#1e40af',
                  backgroundColor: config.productCount.bgColor || '#dbeafe'
                }}
              >
                {category.productCount}
              </span>
            </div>
          )}
      </div>
    );
  }
};
