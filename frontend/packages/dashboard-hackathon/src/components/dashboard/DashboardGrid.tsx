import * as React from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Layout } from '../../types';

const GridLayoutWithWidth = WidthProvider(GridLayout);

type Props = {
  layout?: Layout[];
  cols?: number;
  padding?: number;
  gap?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  readonly?: boolean;
  onDragStart?: (id: string) => void;
  onDragStop?: (id: string) => void;
  onResizeStart?: (id: string) => void;
  onResizeStop?: (id: string) => void;
  isFullscreen?: boolean;
};

const DashboardGrid: React.FC<Props> = ({
  cols,
  children,
  layout,
  onLayoutChange,
  readonly,
  isFullscreen,
  padding = 24,
  gap = 16,
  onDragStart,
  onDragStop,
  onResizeStart,
  onResizeStop,
}) => {
  const editable = !readonly && !isFullscreen;

  // FIXME when exiting out of fullscreen mode, even though editable === true,
  // the Grid doesn't re-render correctly to become editable again
  return (
    <GridLayoutWithWidth
      measureBeforeMount
      layout={layout}
      onDragStart={
        onDragStart
          ? (_, item) => {
              onDragStart(item.i);
            }
          : undefined
      }
      onDragStop={
        onDragStop
          ? (_, item) => {
              onDragStop(item.i);
            }
          : undefined
      }
      onResizeStart={
        onResizeStart
          ? (_, item) => {
              onResizeStart(item.i);
            }
          : undefined
      }
      onResizeStop={
        onResizeStop
          ? (_, item) => {
              onResizeStop(item.i);
            }
          : undefined
      }
      onLayoutChange={
        onLayoutChange
          ? (l) =>
              onLayoutChange(
                l.reduce((acc, { i, x, y, w, h }) => {
                  acc.push({ i, x, y, w, h });
                  return acc;
                }, [] as Layout[]),
              )
          : undefined
      }
      cols={cols ?? 12}
      containerPadding={[padding, padding]}
      margin={[gap, gap]}
      isDraggable={editable}
      isResizable={editable}
    >
      {children}
    </GridLayoutWithWidth>
  );
};

export default DashboardGrid;
