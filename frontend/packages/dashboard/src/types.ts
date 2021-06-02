import { JSONSchema6 } from 'json-schema';

export type GridItem = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type WidgetDefinition = {
  id: string;
  label: string;
  description: string;
  icon: string;
  images: string[];
  schema?: JSONSchema6;
  // exposed properties to be used in dynamic label creation
  properties?: string[];

  loader: () => Promise<{ default: React.ComponentType<WidgetProps> }>;
};

export type WidgetConfig<S = {}> = {
  // the corresponding widget ID
  type: string;
  // TODO
  // the label of the widget may render dynamic content eg. `Pod count {{count}}`
  label: string;
  description?: string;
  color?: string | 'transparent';
  settings?: S;
  gridItem: GridItem;
};

export type WidgetProps<S = {}> = {
  config: WidgetConfig<S>;
  // TODO add dashboard context so that widgets can share info. eg time range
};

export type DashboardConfig = {
  label: string;
  widgets: WidgetConfig[];
  // defaults to 12
  cols?: number;
};

export type Config = {
  dashboards: DashboardConfig[];
  fullscreen?: {
    hideTabs?: boolean;
    cycle?: boolean;
    cycleDelay?: number;
  };
};
