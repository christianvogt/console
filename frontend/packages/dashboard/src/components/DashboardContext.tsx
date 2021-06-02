import * as React from 'react';
import { WidgetProps } from '../types';

type ContextProps = {
  widgets: { [id: string]: () => Promise<{ default: React.ComponentType<WidgetProps> }> };
};

const DashboardContext = React.createContext<ContextProps>({ widgets: {} });

export default DashboardContext;
