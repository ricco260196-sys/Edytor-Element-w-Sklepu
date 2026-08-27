import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { WidgetsListColumn } from './widgets/WidgetsListColumn';
import { WidgetsPreviewColumn } from './widgets/WidgetsPreviewColumn';
import { WidgetsConfigColumn } from './widgets/WidgetsConfigColumn';
import { Layers } from 'lucide-react';

interface WidgetsEditorProps {
  onSelectModule: (module: any) => void;
}

export const WidgetsEditor: React.FC<WidgetsEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    selectedWidgetId,
    setSelectedWidgetId,
    resetWidget
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  const widgetsList = state.widgets?.widgets || [];
  const selectedWidget = widgetsList.find((w) => w.id === selectedWidgetId);

  return (
    <EditorLayout3Col
      moduleTitle="Edytor Widżetów Sklepu"
      moduleSubtitle="Stylizacja, kształty, tła, typografia i zachowanie widżetów"
      moduleIcon={<Layers className="w-5 h-5 text-blue-400" />}
      activeModule="widgets"
      onSelectModule={onSelectModule}
      leftColumnContent={
        <WidgetsListColumn onSelectWidget={(id) => setSelectedWidgetId(id)} />
      }
      centerCanvasContent={
        <WidgetsPreviewColumn
          deviceViewport={deviceViewport}
          onDeviceChange={setDeviceViewport}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
        />
      }
      rightColumnContent={<WidgetsConfigColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={() => {
        if (selectedWidgetId) {
          resetWidget(selectedWidgetId, 'all');
        }
      }}
      selectedElementName={selectedWidget ? selectedWidget.displayName : 'Brak zaznaczenia'}
      onDeselectElement={() => setSelectedWidgetId(null)}
      isModified={true}
    />
  );
};
