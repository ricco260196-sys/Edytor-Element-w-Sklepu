import { SYSTEM_CATEGORIES } from './marketplaceCatalogue';
import { SearchBarConfig } from '../types/storeAppearance';

export interface SearchProductItem {
  id: number | string;
  name: string;
  category: string;
  vendorName?: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

export interface SearchMatchedCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface SearchMatchedVendor {
  id: string;
  name: string;
  rating?: number;
}

export interface SearchQueryResult {
  products: SearchProductItem[];
  categories: SearchMatchedCategory[];
  vendors: SearchMatchedVendor[];
  popularSuggestions: string[];
  totalMatchesCount: number;
  executionTimeMs: number;
}

export const MOCK_SEARCH_PRODUCTS: SearchProductItem[] = [
  {
    id: 1,
    name: 'Smartfon Galaxy Ultra 5G 256GB Czarny',
    category: 'Elektronika & IT',
    vendorName: 'ElectroStore PL',
    price: 3499.00,
    oldPrice: 3999.00,
    rating: 4.9,
    reviews: 142,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Słuchawki Bezprzewodowe ANC Pro Studio',
    category: 'Elektronika & IT',
    vendorName: 'AudioMaster',
    price: 489.00,
    oldPrice: 629.00,
    rating: 4.8,
    reviews: 95,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Klawiatura Mechaniczna RGB Custom Switch',
    category: 'Elektronika & IT',
    vendorName: 'TechGaming Hub',
    price: 329.00,
    oldPrice: 419.00,
    rating: 5.0,
    reviews: 210,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Smartwatch Titan Ultra GPS Tracker',
    category: 'Elektronika & IT',
    vendorName: 'SmartWear Tech',
    price: 599.00,
    oldPrice: 799.00,
    rating: 4.7,
    reviews: 74,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    name: 'Laptop Ultrabook 16" OLED AI Core i7',
    category: 'Elektronika & IT',
    vendorName: 'ElectroStore PL',
    price: 4599.00,
    oldPrice: 5299.00,
    rating: 4.9,
    reviews: 38,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 6,
    name: 'Skórzany Plecak Miejski Vintage Premium',
    category: 'Moda & Styl',
    vendorName: 'LeatherCraft',
    price: 249.00,
    oldPrice: 329.00,
    rating: 4.8,
    reviews: 62,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 7,
    name: 'Kurtka Przejściowa Wodoodporna Windstopper',
    category: 'Moda & Styl',
    vendorName: 'Outdoorsmen',
    price: 389.00,
    oldPrice: 489.00,
    rating: 4.6,
    reviews: 44,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&auto=format&fit=crop&q=60'
  },
  {
    id: 8,
    name: 'Lampa Biurkowa Smart LED z Ładowaniem Qi',
    category: 'Dom & Wnętrze',
    vendorName: 'HomeLight Studio',
    price: 179.00,
    oldPrice: 229.00,
    rating: 4.7,
    reviews: 58,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=60'
  }
];

function normalizeText(text: string, diacriticsInsensitive = true): string {
  let normalized = text.toLowerCase();
  if (diacriticsInsensitive) {
    normalized = normalized
      .replace(/[ą]/g, 'a')
      .replace(/[ć]/g, 'c')
      .replace(/[ę]/g, 'e')
      .replace(/[ł]/g, 'l')
      .replace(/[ń]/g, 'n')
      .replace(/[ó]/g, 'o')
      .replace(/[ś]/g, 's')
      .replace(/[źż]/g, 'z');
  }
  return normalized.trim();
}

export function executeMarketplaceSearch(
  rawQuery: string,
  selectedCategory: string = 'all',
  engineConfig: SearchBarConfig['engine']
): SearchQueryResult {
  const startTime = performance.now();
  const q = normalizeText(rawQuery, engineConfig.diacriticsInsensitive);

  if (!q || q.length < engineConfig.minCharsToTrigger) {
    return {
      products: [],
      categories: [],
      vendors: [],
      popularSuggestions: [],
      totalMatchesCount: 0,
      executionTimeMs: 0
    };
  }

  // Filter products
  const matchedProducts = MOCK_SEARCH_PRODUCTS.filter(item => {
    // Category scope check
    if (selectedCategory !== 'all') {
      const catObj = SYSTEM_CATEGORIES.find(c => c.id === selectedCategory);
      if (catObj && !item.category.toLowerCase().includes(catObj.name.toLowerCase().slice(0, 4))) {
        return false;
      }
    }

    const normName = normalizeText(item.name, engineConfig.diacriticsInsensitive);
    const normCat = normalizeText(item.category, engineConfig.diacriticsInsensitive);
    const normVendor = item.vendorName ? normalizeText(item.vendorName, engineConfig.diacriticsInsensitive) : '';

    return normName.includes(q) || normCat.includes(q) || normVendor.includes(q);
  }).slice(0, engineConfig.maxResultsCount || 8);

  // Matched categories
  const matchedCategories: SearchMatchedCategory[] = SYSTEM_CATEGORIES.filter(cat => {
    const normCatName = normalizeText(cat.name, engineConfig.diacriticsInsensitive);
    return normCatName.includes(q) || cat.subcategories.some(sub => normalizeText(sub.name, engineConfig.diacriticsInsensitive).includes(q));
  }).map(cat => ({
    id: cat.id,
    name: cat.name,
    productCount: cat.productCount
  })).slice(0, 4);

  // Matched vendors
  const matchedVendors: SearchMatchedVendor[] = [
    { id: 'v1', name: 'ElectroStore PL', rating: 4.9 },
    { id: 'v2', name: 'AudioMaster Studio', rating: 4.8 },
    { id: 'v3', name: 'TechGaming Hub', rating: 5.0 }
  ].filter(v => normalizeText(v.name, engineConfig.diacriticsInsensitive).includes(q));

  const endTime = performance.now();

  return {
    products: matchedProducts,
    categories: matchedCategories,
    vendors: matchedVendors,
    popularSuggestions: [q, `${q} pro`, `${q} bezprzewodowe`, `${q} promocja`],
    totalMatchesCount: matchedProducts.length,
    executionTimeMs: Math.max(2, Math.round(endTime - startTime))
  };
}
