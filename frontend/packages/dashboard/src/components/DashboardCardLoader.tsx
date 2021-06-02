import * as React from 'react';
import { WidgetConfig } from '../types';
import DashboardContext from './DashboardContext';

type Props = {
  config: WidgetConfig;
};

const DashboardCardLooader: React.FC<Props> = ({ config }) => {
  const { widgets } = React.useContext(DashboardContext);
  const loader = React.useMemo(() => widgets[config.type], [config.type, widgets]);
  const Component = React.useMemo(() => React.lazy(loader), [loader]);
  return Component ? <Component config={config} /> : null;
};

export default DashboardCardLooader;
