import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { ProductsListColumn } from './products/ProductsListColumn';
import { ProductsPreviewColumn } from './products/ProductsPreviewColumn';
import { ProductsConfigColumn } from './products/ProductsConfigColumn';
import { ShoppingBag } from 'lucide-react';
import { defaultProductsGridConfig } from '../../data/defaultProductsGrid';

interface ProductsGridEditorProps {
  onSelectModule?: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'products' | 'overview') => void;
}

export const ProductsGridEditor: React.FC<ProductsGridEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    updateProductsGrid,
    setActiveTab,
    triggerToast
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleResetToDefaults = () => {
    updateProductsGrid(defaultProductsGridConfig);
    setSelectedProductId(null);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia wyglądu głównej siatki produktów zostały zresetowane.');
  };

  const handleModuleSelect = (mod: any) => {
    if (onSelectModule) {
      onSelectModule(mod);
    } else {
      setActiveTab(mod);
    }
  };

  return (
    <EditorLayout3Col
      moduleTitle="Główna Siatka Produktów"
      moduleSubtitle="Moduł 7: Prezentacja, układ kafelków, zdjęcia, ceny, koszyk i responsywność produktów z marketplace"
      moduleIcon={<ShoppingBag className="w-4 h-4 text-blue-400" />}
      activeModule="products"
      onSelectModule={handleModuleSelect}
      leftColumnContent={
        <ProductsListColumn
          selectedProductId={selectedProductId}
          onSelectProduct={(id) => setSelectedProductId(id)}
        />
      }
      centerCanvasContent={
        <ProductsPreviewColumn
          selectedProductId={selectedProductId}
          onSelectProduct={(id) => setSelectedProductId(id)}
          deviceViewport={deviceViewport}
          onDeviceChange={setDeviceViewport}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      }
      rightColumnContent={<ProductsConfigColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={handleResetToDefaults}
      selectedElementName={selectedProductId ? `Produkt ID: ${selectedProductId}` : 'Główna Siatka Produktów'}
      onDeselectElement={() => setSelectedProductId(null)}
      isModified={JSON.stringify(state.productsGrid) !== JSON.stringify(defaultProductsGridConfig)}
    />
  );
};
