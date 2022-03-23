import * as React from 'react';
import { CardConfig, CardDefinition, DashboardConfig, DashboardTabConfig, Layout } from '../types';

export type DashboardContextProps<C extends { [k: string]: unknown } = {}> = {
  dashboard: DashboardConfig;
  definitions: CardDefinition[];
  addCard: (
    cardType: string,
    defaults?: Partial<Omit<CardConfig, 'type'>>,
    onSave?: (config: CardConfig, tabId: string) => void,
  ) => void;
  editCard: (config: CardConfig, onSave?: (config: CardConfig, tabId: string) => void) => void;
  updateLayout: (tabId: string, layout: Layout[]) => void;
  updateTabs: (newTabs: DashboardTabConfig[]) => void;
  cardContext?: C;
};

const DashboardContext = React.createContext<DashboardContextProps>({
  dashboard: { tabs: [] },
  definitions: [],
  addCard: () => {},
  editCard: () => {},
  updateLayout: () => {},
  updateTabs: () => {},
});

export default DashboardContext;
