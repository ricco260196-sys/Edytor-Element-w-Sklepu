import React, { useState, useMemo } from 'react';
import {
  ProductsGridWidgetConfig,
  DevicePreview,
  ProductCardElementKey
} from '../../../types/storeAppearance';
import { SYSTEM_PRODUCTS, SystemProduct } from '../../../data/marketplaceCatalogue';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  ArrowRight,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Package,
  Layers,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { IconRenderer } from '../../common/IconRenderer';

interface ProductsWidgetRendererProps {
  config: ProductsGridWidgetConfig;
  deviceViewport?: DevicePreview;
  isStorefront?: boolean;
  selectedProductId?: string | null;
  onSelectProduct?: (productId: string | null) => void;
}

export const ProductsWidgetRenderer: React.FC<ProductsWidgetRendererProps> = ({
  config,
  deviceViewport = 'desktop',
  isStorefront = false,
  selectedProductId,
  onSelectProduct
}) => {
  const {
    addToCart,
    toggleWishlist,
    wishlistIds,
    setQuickViewProduct
  } = useStoreAppearance();

  // Local interactive filtering & sorting state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentSort, setCurrentSort] = useState<string>(config.sortingFiltering?.sortOrder || 'system_default');
  const [filterInStockOnly, setFilterInStockOnly] = useState<boolean>(false);
  const [filterOnSaleOnly, setFilterOnSaleOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Hovered product card image index for multi-image swap
  const [hoveredCardImageIndex, setHoveredCardImageIndex] = useState<{ [key: string]: number }>({});
  
  // Carousel page state for carousel display mode
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Pagination state (for Load More)
  const [visibleCount, setVisibleCount] = useState<number>(config.pagination?.itemsPerPage || 8);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Extract available categories from products
  const categoryFilters = useMemo(() => {
    const cats = new Set<string>();
    SYSTEM_PRODUCTS.forEach(p => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...SYSTEM_PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Filter In Stock
    if (filterInStockOnly) {
      list = list.filter(p => p.inStock);
    }

    // Filter On Sale
    if (filterOnSaleOnly) {
      list = list.filter(p => !!p.oldPrice && p.oldPrice > p.price);
    }

    // Sorting
    switch (currentSort) {
      case 'newest':
        list.reverse();
        break;
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'promotions':
        list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case 'popularity':
        list.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      case 'system_default':
      default:
        // natural order
        break;
    }

    return list;
  }, [activeCategory, searchQuery, filterInStockOnly, filterOnSaleOnly, currentSort]);

  // Sliced items for pagination
  const displayedProducts = useMemo(() => {
    if (config.pagination.type === 'none') {
      return filteredProducts;
    }
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount, config.pagination.type]);

  // Responsive column calculation
  const getGridColumnsClass = () => {
    if (config.displayMode === 'list') return 'grid-cols-1';
    if (config.displayMode === 'horizontal_list') return 'flex overflow-x-auto pb-4 scrollbar-thin';
    if (config.displayMode === 'carousel' || config.displayMode === 'slider') return 'grid grid-cols-1';

    if (deviceViewport === 'mobile') {
      const mobCols = config.responsive.mobile?.columns ?? config.columnsMobile;
      if (mobCols === 1) return 'grid-cols-1';
      return 'grid-cols-2';
    }

    if (deviceViewport === 'tablet') {
      const tabCols = config.responsive.tablet?.columns ?? config.columnsTablet;
      if (tabCols === 1) return 'grid-cols-1';
      if (tabCols === 2) return 'grid-cols-2';
      if (tabCols === 3) return 'grid-cols-3';
      return 'grid-cols-4';
    }

    // Desktop
    const deskCols = config.columnsDesktop;
    switch (deskCols) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 5: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
      case 6: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  // Gap classes
  const getGapStyle = () => {
    if (deviceViewport === 'mobile') {
      return {
        columnGap: `${config.gapMobileX}px`,
        rowGap: `${config.gapMobileY}px`
      };
    }
    if (deviceViewport === 'tablet') {
      return {
        columnGap: `${config.gapTabletX}px`,
        rowGap: `${config.gapTabletY}px`
      };
    }
    return {
      columnGap: `${config.gapDesktopX}px`,
      rowGap: `${config.gapDesktopY}px`
    };
  };

  // Card Background Style
  const getCardBgStyle = () => {
    if (config.backgroundType === 'glass' || config.glassmorphism.enabled) {
      return {
        backgroundColor: config.backgroundColor || 'rgba(255, 255, 255, 0.75)',
        backdropFilter: `blur(${config.glassmorphism.blurPx || 12}px)`,
        WebkitBackdropFilter: `blur(${config.glassmorphism.blurPx || 12}px)`
      };
    }
    if (config.backgroundType === 'transparent') {
      return { backgroundColor: 'transparent' };
    }
    return {
      backgroundColor: config.backgroundColor || '#ffffff'
    };
  };

  // Card Border Style
  const getCardBorderStyle = () => {
    if (config.border.style === 'none' || config.border.width === 0) {
      return { border: 'none' };
    }
    return {
      borderTop: config.border.sides.top ? `${config.border.width}px ${config.border.style} ${config.border.color}` : 'none',
      borderRight: config.border.sides.right ? `${config.border.width}px ${config.border.style} ${config.border.color}` : 'none',
      borderBottom: config.border.sides.bottom ? `${config.border.width}px ${config.border.style} ${config.border.color}` : 'none',
      borderLeft: config.border.sides.left ? `${config.border.width}px ${config.border.style} ${config.border.color}` : 'none',
      borderRadius: `${config.border.radiusTopLeft}px ${config.border.radiusTopRight}px ${config.border.radiusBottomRight}px ${config.border.radiusBottomLeft}px`
    };
  };

  // Card Shadow Style
  const getCardShadowStyle = () => {
    if (config.shadow.preset === 'none') return {};
    return {
      boxShadow: `${config.shadow.inset ? 'inset ' : ''}${config.shadow.x}px ${config.shadow.y}px ${config.shadow.blur}px ${config.shadow.spread}px ${config.shadow.color}`
    };
  };

  // Handle Add to Cart action
  const handleAddToCart = (e: React.MouseEvent, product: SystemProduct) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAddedId(String(product.id));
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  // Handle Wishlist action
  const handleToggleWishlist = (e: React.MouseEvent, product: SystemProduct) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Handle Quick View
  const handleQuickView = (e: React.MouseEvent, product: SystemProduct) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Container width constraint
  const getContainerMaxWidth = () => {
    switch (config.containerWidthPreset) {
      case 'full': return 'w-full';
      case 'wide': return 'max-w-[1400px] mx-auto';
      case 'narrow': return 'max-w-[1000px] mx-auto';
      case 'standard':
      default:
        return 'max-w-[1200px] mx-auto';
    }
  };

  if (!config.enabled) {
    return (
      <div className="p-8 text-center bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400">
        <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm font-semibold">Widżet „Główna siatka produktów” jest wyłączony</p>
        <p className="text-xs text-slate-500 mt-1">Włącz widżet w panelu bocznym edytora, aby wyświetlić siatkę produktów.</p>
      </div>
    );
  }

  // Render individual card element based on element key
  const renderCardElement = (key: ProductCardElementKey, product: SystemProduct) => {
    const isWishlisted = wishlistIds.includes(String(product.id));
    const isJustAdded = justAddedId === String(product.id);
    const activeImgIdx = hoveredCardImageIndex[String(product.id)] ?? 0;
    const images = product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

    switch (key) {
      case 'image':
        if (!config.visibility.image || !config.image.show) return null;
        return (
          <div
            key="image"
            className="relative w-full overflow-hidden shrink-0 group/img select-none"
            style={{
              borderRadius: `${config.image.borderRadius}px`,
              border: config.image.borderWidth > 0 ? `${config.image.borderWidth}px solid ${config.image.borderColor}` : 'none'
            }}
          >
            {/* Aspect ratio container */}
            <div
              className={`w-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${
                config.image.aspectRatio === '1:1' ? 'aspect-square' :
                config.image.aspectRatio === '4:3' ? 'aspect-4/3' :
                config.image.aspectRatio === '16:9' ? 'aspect-video' :
                config.image.aspectRatio === '3:4' ? 'aspect-3/4' :
                config.image.aspectRatio === '3:2' ? 'aspect-3/2' :
                config.image.aspectRatio === 'circle' ? 'aspect-square rounded-full' :
                'aspect-square'
              }`}
            >
              <img
                src={images[activeImgIdx] || images[0]}
                alt={product.name}
                className={`w-full h-full transition-all duration-300 ${
                  config.image.objectFit === 'contain' ? 'object-contain p-2' :
                  config.image.objectFit === 'fill' ? 'object-fill' : 'object-cover'
                } ${
                  config.image.hoverEffect === 'zoom' ? 'group-hover/img:scale-108' :
                  config.image.hoverEffect === 'scale' ? 'group-hover/img:scale-104' :
                  config.image.hoverEffect === 'fade' ? 'group-hover/img:opacity-85' :
                  config.image.hoverEffect === 'blur' ? 'group-hover/img:blur-xs' :
                  config.image.hoverEffect === 'brightness' ? 'group-hover/img:brightness-110' :
                  config.image.hoverEffect === 'grayscale' ? 'group-hover/img:grayscale' : ''
                }`}
                style={{
                  transform: config.image.hoverEffect === 'zoom' ? undefined : undefined
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                }}
              />

              {/* Hover overlay if enabled */}
              {config.hover.showOverlay && (
                <div
                  className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    backgroundColor: config.hover.overlayColor || 'rgba(0,0,0,0.1)'
                  }}
                />
              )}

              {/* Quick View Button on Image Hover */}
              {config.visibility.quickView && config.buttons.quickView.show && config.buttons.quickView.position === 'hover_overlay' && (
                <button
                  onClick={(e) => handleQuickView(e, product)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md opacity-0 group-hover/img:opacity-100 transition-all duration-200 flex items-center gap-1.5 z-10 whitespace-nowrap active:scale-95"
                  style={{
                    backgroundColor: config.buttons.quickView.bgColor || 'rgba(15, 23, 42, 0.85)',
                    color: config.buttons.quickView.textColor || '#ffffff',
                    borderRadius: `${config.buttons.quickView.borderRadius || 8}px`
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{config.buttons.quickView.text || 'Szybki podgląd'}</span>
                </button>
              )}

              {/* Wishlist Button floating on top corner */}
              {config.visibility.wishlist && config.buttons.wishlist.show && (config.buttons.wishlist.position === 'top_right' || config.buttons.wishlist.position === 'top_left') && (
                <button
                  onClick={(e) => handleToggleWishlist(e, product)}
                  className={`absolute top-2.5 ${config.buttons.wishlist.position === 'top_right' ? 'right-2.5' : 'left-2.5'} z-10 p-2 rounded-full shadow-sm transition-transform duration-200 active:scale-90 flex items-center justify-center`}
                  style={{
                    backgroundColor: isWishlisted
                      ? config.buttons.wishlist.activeBgColor || '#fee2e2'
                      : config.buttons.wishlist.bgColor || 'rgba(255, 255, 255, 0.9)',
                    color: isWishlisted
                      ? config.buttons.wishlist.activeColor || '#ef4444'
                      : config.buttons.wishlist.color || '#64748b',
                    border: `1px solid ${config.buttons.wishlist.borderColor || '#e2e8f0'}`
                  }}
                  title={isWishlisted ? 'Usuń z listy życzeń' : 'Dodaj do listy życzeń'}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : 'hover:scale-110'}`}
                  />
                </button>
              )}
            </div>

            {/* Multi-image thumbnail bar on hover */}
            {config.image.multiImageBehavior === 'thumbnails' && images.length > 1 && (
              <div className="flex items-center gap-1 mt-1.5 px-1 overflow-x-auto py-0.5">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredCardImageIndex(prev => ({ ...prev, [String(product.id)]: i }));
                    }}
                    onMouseEnter={() => setHoveredCardImageIndex(prev => ({ ...prev, [String(product.id)]: i }))}
                    className={`w-6 h-6 rounded overflow-hidden border shrink-0 transition-all ${
                      activeImgIdx === i ? 'border-blue-600 ring-1 ring-blue-500' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'badge':
        if (!config.visibility.badge || !config.badge.show || !product.badge) return null;
        return (
          <div key="badge" className="flex items-center gap-1.5 my-1">
            <span
              className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 shadow-xs"
              style={{
                borderRadius: `${config.badge.borderRadius}px`,
                backgroundColor:
                  product.badge.includes('HIT') || product.badge.includes('%') || product.badge.includes('WYPRZEDAŻ')
                    ? config.badge.customColors.saleBg
                    : product.badge.includes('BESTSELLER')
                    ? config.badge.customColors.bestsellerBg
                    : product.badge.includes('NOWOŚĆ')
                    ? config.badge.customColors.newArrivalBg
                    : product.badge.includes('POLECAY') || product.badge.includes('POLECANY')
                    ? config.badge.customColors.recommendedBg
                    : !product.inStock
                    ? config.badge.customColors.outOfStockBg
                    : config.badge.customColors.newArrivalBg,
                color: '#ffffff'
              }}
            >
              {product.badge}
            </span>
          </div>
        );

      case 'category_brand':
        if (!config.visibility.category && !config.visibility.brand) return null;
        return (
          <div
            key="category_brand"
            className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 mb-0.5 truncate"
            style={{
              color: config.metaTypography.color || '#64748b',
              fontSize: `${config.metaTypography.fontSizePx || 11}px`,
              fontWeight: config.metaTypography.fontWeight || '500',
              textTransform: config.metaTypography.textTransform || 'none'
            }}
          >
            {config.visibility.category && config.metaTypography.showCategory && (
              <span className="truncate hover:underline cursor-pointer">
                {product.category}
              </span>
            )}
            {config.visibility.brand && config.metaTypography.showBrand && (
              <span className="font-medium text-slate-700 dark:text-slate-300 ml-auto shrink-0">
                {product.vendorName}
              </span>
            )}
          </div>
        );

      case 'name':
        if (!config.visibility.name || !config.nameTypography.show) return null;
        return (
          <h3
            key="name"
            className={`font-semibold transition-colors mt-1 cursor-pointer ${
              config.nameTypography.maxLines === 1 ? 'truncate' :
              config.nameTypography.maxLines === 2 ? 'line-clamp-2' :
              config.nameTypography.maxLines === 3 ? 'line-clamp-3' : ''
            }`}
            style={{
              color: config.nameTypography.color || '#0f172a',
              fontSize: `${config.nameTypography.fontSizePx || 15}px`,
              fontWeight: config.nameTypography.fontWeight || '600',
              textAlign: config.nameTypography.textAlign || 'left',
              lineHeight: config.nameTypography.lineHeight || 1.35,
              letterSpacing: config.nameTypography.letterSpacing || '-0.01em',
              textTransform: config.nameTypography.textTransform || 'none'
            }}
            title={product.name}
          >
            {product.name}
          </h3>
        );

      case 'description':
        if (!config.visibility.description || !config.descriptionTypography.show) return null;
        return (
          <p
            key="description"
            className={`text-xs text-slate-500 dark:text-slate-400 mt-1 ${
              config.descriptionTypography.maxLines === 1 ? 'truncate' :
              config.descriptionTypography.maxLines === 2 ? 'line-clamp-2' : 'line-clamp-3'
            }`}
            style={{
              fontSize: `${config.descriptionTypography.fontSizePx || 12}px`,
              color: config.descriptionTypography.color || '#64748b',
              lineHeight: config.descriptionTypography.lineHeight || 1.4
            }}
          >
            {product.shortDescription}
          </p>
        );

      case 'rating':
        if (!config.visibility.rating || !config.rating.show) return null;
        return (
          <div key="rating" className="flex items-center gap-1.5 mt-1.5 mb-1">
            {config.rating.showStars && (
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="shrink-0"
                    style={{
                      width: `${config.rating.starSizePx || 13}px`,
                      height: `${config.rating.starSizePx || 13}px`,
                      color: s <= Math.round(product.rating)
                        ? config.rating.starColor || '#f59e0b'
                        : config.rating.emptyStarColor || '#e2e8f0',
                      fill: s <= Math.round(product.rating)
                        ? config.rating.starColor || '#f59e0b'
                        : 'none'
                    }}
                  />
                ))}
              </div>
            )}
            {config.rating.showScore && (
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {product.rating.toFixed(1)}
              </span>
            )}
            {config.visibility.reviewsCount && config.rating.showReviewsCount && (
              <span
                className="text-[11px]"
                style={{
                  color: config.rating.reviewsColor || '#64748b',
                  fontSize: `${config.rating.reviewsFontSizePx || 11}px`
                }}
              >
                ({product.reviewsCount})
              </span>
            )}
          </div>
        );

      case 'price':
        if (!config.visibility.price || !config.price.show) return null;
        return (
          <div
            key="price"
            className="flex items-baseline flex-wrap gap-2 mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/60"
          >
            <div className="flex items-baseline gap-1">
              {config.currency.symbolPosition === 'prefix' && (
                <span className="text-xs font-semibold text-slate-500">
                  {product.currency}
                </span>
              )}
              <span
                className="font-extrabold tracking-tight"
                style={{
                  fontSize: `${config.price.fontSizePx || 18}px`,
                  fontWeight: config.price.fontWeight || '800',
                  color: config.price.color || '#0f172a'
                }}
              >
                {product.price.toFixed(2)}
              </span>
              {config.currency.symbolPosition === 'suffix' && (
                <span
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400"
                  style={{
                    marginLeft: config.currency.spacing === 'none' ? '0px' : '3px'
                  }}
                >
                  {product.currency}
                </span>
              )}
            </div>

            {/* Old Price */}
            {config.visibility.oldPrice && config.price.showOldPrice && product.oldPrice && (
              <span
                className="text-xs text-slate-400 line-through"
                style={{
                  color: config.price.oldPriceColor || '#94a3b8',
                  fontSize: `${config.price.oldPriceFontSizePx || 13}px`
                }}
              >
                {product.oldPrice.toFixed(2)} {product.currency}
              </span>
            )}

            {/* Promo percentage badge */}
            {config.visibility.promoDiscount && config.price.promoDiscountBadge.show && product.discountPercent && (
              <span
                className="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-md"
                style={{
                  backgroundColor: config.price.promoDiscountBadge.bgColor || '#fee2e2',
                  color: config.price.promoDiscountBadge.textColor || '#dc2626',
                  borderRadius: `${config.price.promoDiscountBadge.borderRadius || 6}px`
                }}
              >
                -{product.discountPercent}%
              </span>
            )}
          </div>
        );

      case 'stock':
        if (!config.visibility.stockStatus) return null;
        return (
          <div key="stock" className="flex items-center gap-1.5 text-[11px] mt-1 text-slate-500">
            <span
              className={`w-2 h-2 rounded-full ${
                product.inStock ? 'bg-emerald-500 ring-2 ring-emerald-500/20' : 'bg-rose-500'
              }`}
            />
            <span>{product.inStock ? `Dostępny (${product.stockCount} szt.)` : 'Brak w magazynie'}</span>
          </div>
        );

      case 'variants':
        if (!config.visibility.variants || !product.variants || product.variants.length === 0) return null;
        return (
          <div key="variants" className="flex items-center gap-1 mt-1.5">
            {product.variants.slice(0, 4).map((v) => (
              <span
                key={v.id}
                title={v.name}
                className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shadow-xs"
                style={{ backgroundColor: v.colorHex || '#cbd5e1' }}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[10px] text-slate-400">+{product.variants.length - 4}</span>
            )}
          </div>
        );

      case 'buttons':
        if (!config.visibility.addToCart && !config.visibility.buyNow) return null;
        return (
          <div key="buttons" className="mt-3 flex items-center gap-2">
            {config.visibility.addToCart && config.buttons.addToCart.show && (
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className={`flex-1 py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs ${
                  isJustAdded
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50'
                    : ''
                }`}
                style={{
                  backgroundColor: isJustAdded ? '#059669' : (config.buttons.addToCart.bgColor || '#2563eb'),
                  color: config.buttons.addToCart.textColor || '#ffffff',
                  borderRadius: `${config.buttons.addToCart.borderRadius || 12}px`
                }}
              >
                {isJustAdded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dodano!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{config.buttons.addToCart.text || 'Do koszyka'}</span>
                  </>
                )}
              </button>
            )}

            {config.visibility.buyNow && config.buttons.buyNow.show && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                  setQuickViewProduct(product);
                }}
                className="py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1 text-white shadow-xs transition-all active:scale-95"
                style={{
                  backgroundColor: config.buttons.buyNow.bgColor || '#f59e0b',
                  color: config.buttons.buyNow.textColor || '#ffffff',
                  borderRadius: `${config.buttons.buyNow.borderRadius || 12}px`
                }}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{config.buttons.buyNow.text || 'Kup teraz'}</span>
              </button>
            )}

            {/* Secondary details link */}
            {config.buttons.detailsLink.show && (
              <button
                onClick={(e) => handleQuickView(e, product)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Zobacz szczegóły produktu"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      className={`w-full transition-all duration-300 ${getContainerMaxWidth()}`}
      style={{
        paddingTop: `${config.sectionPaddingY}px`,
        paddingBottom: `${config.sectionPaddingY}px`,
        paddingLeft: `${config.sectionPaddingX}px`,
        paddingRight: `${config.sectionPaddingX}px`
      }}
    >
      {/* 1. Header Section */}
      {config.showSectionHeader && (
        <div
          className={`mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
            config.headerAlignment === 'center' ? 'text-center items-center' :
            config.headerAlignment === 'right' ? 'text-right items-end' :
            'text-left'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {config.title || 'Bestsellery & Wybrane Oferty'}
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                {filteredProducts.length} produktów
              </span>
            </div>
            {config.subtitle && (
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                {config.subtitle}
              </p>
            )}
          </div>

          {/* Sort Dropdown */}
          {config.sortingFiltering.showSortDropdown && (
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs text-slate-500 font-medium">Sortuj:</label>
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className="text-xs py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="system_default">Domyślne z systemu</option>
                <option value="popularity">Najpopularniejsze</option>
                <option value="rating_desc">Najwyżej oceniane</option>
                <option value="price_asc">Cena: od najniższej</option>
                <option value="price_desc">Cena: od najwyższej</option>
                <option value="promotions">Największe rabaty %</option>
                <option value="newest">Nowości w sklepie</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* 2. Filter Bar (Category Pills + Toggles) */}
      {config.sortingFiltering.showFilterBar && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {/* Category tabs */}
          {config.sortingFiltering.filterCategories && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all shrink-0 ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Wszystkie produkty' : cat}
                </button>
              ))}
            </div>
          )}

          {/* Search input & Toggles */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Quick in-grid search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Szukaj w siatce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 w-36 focus:w-48 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* In stock toggle */}
            {config.sortingFiltering.filterInStockOnly && (
              <button
                onClick={() => setFilterInStockOnly(!filterInStockOnly)}
                className={`px-2.5 py-1 text-xs rounded-xl font-medium border transition-colors flex items-center gap-1.5 ${
                  filterInStockOnly
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${filterInStockOnly ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                <span>Tylko dostępne</span>
              </button>
            )}

            {/* On sale toggle */}
            {config.sortingFiltering.filterOnSaleOnly && (
              <button
                onClick={() => setFilterOnSaleOnly(!filterOnSaleOnly)}
                className={`px-2.5 py-1 text-xs rounded-xl font-medium border transition-colors flex items-center gap-1.5 ${
                  filterOnSaleOnly
                    ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>Promocje %</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Empty state */}
      {displayedProducts.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs my-4">
          <Package className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Nie znaleziono produktów</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Brak produktów spełniających podane kryteria filtrowania w systemie Marketplace. Spróbuj zresetować filtry.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setFilterInStockOnly(false);
              setFilterOnSaleOnly(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            Wyczyść wszystkie filtry
          </button>
        </div>
      )}

      {/* 4. Products Grid Container */}
      {displayedProducts.length > 0 && (
        <div
          className={`grid ${getGridColumnsClass()} transition-all`}
          style={getGapStyle()}
        >
          {displayedProducts.map((product) => {
            const isSelected = selectedProductId === String(product.id);

            return (
              <div
                key={product.id}
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct(isSelected ? null : String(product.id));
                  } else {
                    setQuickViewProduct(product);
                  }
                }}
                className={`group relative flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected ? 'ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-950' : ''
                } ${
                  config.hover.translateYPx ? `hover:-translate-y-[${Math.abs(config.hover.translateYPx)}px]` : 'hover:-translate-y-1'
                }`}
                style={{
                  ...getCardBgStyle(),
                  ...getCardBorderStyle(),
                  ...getCardShadowStyle(),
                  paddingTop: `${config.cardPadding.top}px`,
                  paddingRight: `${config.cardPadding.right}px`,
                  paddingBottom: `${config.cardPadding.bottom}px`,
                  paddingLeft: `${config.cardPadding.left}px`,
                  transform: isSelected ? 'scale(1.02)' : undefined
                }}
                onMouseEnter={(e) => {
                  if (config.hover.cardBgColor) {
                    e.currentTarget.style.backgroundColor = config.hover.cardBgColor;
                  }
                  if (config.border.hoverColor) {
                    e.currentTarget.style.borderColor = config.border.hoverColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (config.backgroundColor) {
                    e.currentTarget.style.backgroundColor = config.backgroundColor;
                  }
                  if (config.border.color) {
                    e.currentTarget.style.borderColor = config.border.color;
                  }
                }}
              >
                {/* Render ordered card elements */}
                <div className="flex flex-col">
                  {config.elementsOrder.map((elementKey) =>
                    renderCardElement(elementKey, product)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Pagination & Load More */}
      {config.pagination.type === 'load_more' && displayedProducts.length < filteredProducts.length && (
        <div className="mt-8 text-center flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Wyświetlasz <strong>{displayedProducts.length}</strong> z <strong>{filteredProducts.length}</strong> produktów
          </p>
          <button
            onClick={() => setVisibleCount((prev) => prev + (config.pagination.itemsPerPage || 4))}
            className="px-6 py-2.5 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-2"
            style={{
              borderRadius: `${config.pagination.loadMoreButton.borderRadius || 14}px`,
              backgroundColor: config.pagination.loadMoreButton.bgColor || '#ffffff',
              color: config.pagination.loadMoreButton.textColor || '#1e293b'
            }}
          >
            <ChevronDown className="w-4 h-4" />
            <span>{config.pagination.loadMoreButton.text || 'Załaduj więcej produktów'}</span>
          </button>
        </div>
      )}

      {/* Classic Pagination */}
      {config.pagination.type === 'pagination_classic' && (
        <div className="mt-8 flex items-center justify-center gap-1.5">
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                page === 1
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
