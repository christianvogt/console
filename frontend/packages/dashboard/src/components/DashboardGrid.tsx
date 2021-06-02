import * as React from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayoutWithWidth = WidthProvider(GridLayout);

type Props = {
  cols?: number;
  padding?: number;
  gap?: number;
};

const DashboardGrid: React.FC<Props> = ({ cols, children, padding = 24, gap = 16 }) => (
  <GridLayoutWithWidth cols={cols ?? 12} containerPadding={[padding, padding]} margin={[gap, gap]}>
    {children}
  </GridLayoutWithWidth>
);

export default DashboardGrid;
