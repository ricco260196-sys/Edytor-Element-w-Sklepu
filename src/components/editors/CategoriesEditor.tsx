import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { CategoriesListColumn } from './categories/CategoriesListColumn';
import { CategoriesPreviewColumn } from './categories/CategoriesPreviewColumn';
import { CategoriesConfigColumn } from './categories/CategoriesConfigColumn';
import { LayoutGrid } from 'lucide-react';
import { defaultCategoriesConfig } from '../../data/defaultCategories';

interface CategoriesEditorProps {
  onSelectModule?: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const CategoriesEditor: React.FC<CategoriesEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    updateCategories,
    setActiveTab,
    triggerToast
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleResetToDefaults = () => {
    updateCategories(defaultCategoriesConfig);
    setSelectedCategoryId(null);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia wyglądu widżetu kategorii zostały zresetowane.');
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
      moduleTitle="Kategorie – Lista Kategorii"
      moduleSubtitle="Moduł 6: Prezentacja, siatka, kafelki i karuzela kategorii pobieranych z systemu"
      moduleIcon={<LayoutGrid className="w-4 h-4" />}
      activeModule="categories"
      onSelectModule={handleModuleSelect}
      leftColumnContent={
        <CategoriesListColumn
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
        />
      }
      centerCanvasContent={
        <CategoriesPreviewColumn
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
          deviceViewport={deviceViewport}
          onDeviceChange={setDeviceViewport}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      }
      rightColumnContent={<CategoriesConfigColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={handleResetToDefaults}
      selectedElementName={selectedCategoryId ? `Kategoria: ${selectedCategoryId}` : 'Widżet Kategorii'}
      onDeselectElement={() => setSelectedCategoryId(null)}
      isModified={JSON.stringify(state.categories) !== JSON.stringify(defaultCategoriesConfig)}
    />
  );
};
