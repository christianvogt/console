import * as React from 'react';

export type Layout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type CardSettingsProps<
  D extends { [k: string]: unknown } = {},
  C extends { [k: string]: unknown } = {}
> = {
  data: D;
  context: C;
  onChange: (data: D) => void;
};

export type CardProps<
  D extends { [k: string]: unknown } = {},
  C extends { [k: string]: unknown } = {}
> = {
  data: D;
  context: C;
  dragging?: boolean;
  resizing?: boolean;
};

export type CardDefinition<D extends { [k: string]: unknown } = {}> = {
  label: string;
  id: string;
  settingsComponent?: () => Promise<{ default: React.ComponentType<CardSettingsProps<D>> }>;
  contentComponent?: () => Promise<{ default: React.ComponentType<CardProps<D>> }>;
  description: string;
  icon: string | (() => Promise<{ default: React.ComponentType }>);
  images?: string[];
  defaultData?: Partial<D>;
};

export type CardConfig<D extends { [k: string]: unknown } = {}> = {
  id: string;
  // the corresponding card ID of a CardDefinition
  type: string;
  frameless?: boolean;
  data: D;
};

export type DashboardTabConfig = {
  id: string;
  label: string;
  cards: CardConfig[];
  layout: Layout[];
  // defaults to 12
  cols?: number;
  readOnly?: boolean;
};

export type DashboardConfig = {
  tabs: DashboardTabConfig[];
  fullscreen?: {
    hideTabs?: boolean;
    cycle?: boolean;
    cycleDelay?: number;
  };
};
