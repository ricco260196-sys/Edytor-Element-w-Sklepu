import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { TopBarContentColumn } from './topbar/TopBarContentColumn';
import { TopBarInteractiveCanvas } from './topbar/TopBarInteractiveCanvas';
import { TopBarStyleColumn } from './topbar/TopBarStyleColumn';
import { Layout } from 'lucide-react';
import { DEFAULT_TOP_BAR } from '../../data/defaultAppearance';

interface TopBarEditorProps {
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const TopBarEditor: React.FC<TopBarEditorProps> = ({ onSelectModule }) => {
  const { updateTopBar, triggerToast } = useStoreAppearance();

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  const handleResetToDefaults = () => {
    updateTopBar(DEFAULT_TOP_BAR);
    setSelectedElementId(null);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia paska górnego zostały zresetowane.');
  };

  return (
    <EditorLayout3Col
      moduleTitle="Pasek Górny (Top Bar)"
      moduleSubtitle="Moduł 1 z 4: Strefy, powiadomienia, kontakt i skróty akcji"
      moduleIcon={<Layout className="w-4 h-4" />}
      activeModule="topbar"
      onSelectModule={onSelectModule}
      leftColumnContent={
        <TopBarContentColumn
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
        />
      }
      centerCanvasContent={
        <TopBarInteractiveCanvas
          deviceViewport={deviceViewport}
          zoomLevel={zoomLevel}
          viewMode={viewMode}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
        />
      }
      rightColumnContent={<TopBarStyleColumn />}
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
