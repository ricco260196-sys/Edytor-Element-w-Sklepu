import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { SearchBarContentColumn } from './search/SearchBarContentColumn';
import { SearchBarInteractiveCanvas } from './search/SearchBarInteractiveCanvas';
import { SearchBarStyleColumn } from './search/SearchBarStyleColumn';
import { Search } from 'lucide-react';
import { DEFAULT_SEARCH_BAR } from '../../data/defaultAppearance';

interface SearchBarEditorProps {
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const SearchBarEditor: React.FC<SearchBarEditorProps> = ({ onSelectModule }) => {
  const { updateSearchBar, triggerToast } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  const handleResetToDefaults = () => {
    updateSearchBar(DEFAULT_SEARCH_BAR);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia Wyszukiwarki zostały zresetowane.');
  };

  return (
    <EditorLayout3Col
      moduleTitle="Inteligentna Wyszukiwarka (Search Bar)"
      moduleSubtitle="Moduł 4 z 4: Autouzupełnianie, filtry kategorii i silnik live search"
      moduleIcon={<Search className="w-4 h-4" />}
      activeModule="search"
      onSelectModule={onSelectModule}
      leftColumnContent={<SearchBarContentColumn />}
      centerCanvasContent={
        <SearchBarInteractiveCanvas
          deviceViewport={deviceViewport}
          zoomLevel={zoomLevel}
          viewMode={viewMode}
        />
      }
      rightColumnContent={<SearchBarStyleColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={handleResetToDefaults}
    />
  );
};
