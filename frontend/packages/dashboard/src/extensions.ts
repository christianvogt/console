import * as React from 'react';
import { CardProps, CardSettingsProps, DashboardConfig } from '@patternfly/dashboard/src/types';
import { CodeRef, Extension, ExtensionDeclaration } from '@console/dynamic-plugin-sdk/src/types';

// extensions:
// card definition

export type DashboardCardDefinition<D extends { [k: string]: unknown } = {}> = ExtensionDeclaration<
  'dashboard/card',
  {
    dashboard: string;
    label: string;
    id: string;
    settingsComponent?: CodeRef<React.ComponentType<CardSettingsProps<D>>>;
    contentComponent: CodeRef<React.ComponentType<CardProps<D>>>;
    description: string;
    icon: string | CodeRef<React.ReactElement>;
    images?: string[];
    defaultData?: Partial<D>;
  }
>;

export type Dashboard = ExtensionDeclaration<'dashboard/instance', DashboardConfig>;

export type SupportedExtensions = DashboardCardDefinition | Dashboard;

// Type guards

export const isDashboardCard = (e: Extension): e is DashboardCardDefinition => {
  return e.type === 'dashboard/card';
};

export const isDashboard = (e: Extension): e is Dashboard => {
  return e.type === 'dashboard/instance';
};
