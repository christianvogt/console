import * as React from 'react';
import { CardDefinition, CardProps, CardSettingsProps } from '../types';
import DashboardContext from './DashboardContext';

export const useCardDefinition = (id: string): CardDefinition => {
  const { definitions } = React.useContext(DashboardContext);
  return definitions.find((d) => d.id === id);
  // if (!def) {
  //   throw new Error(`No card definition found for '${id}'.`);
  // }
  // return def;
};

const factory = <T extends any>(
  get: (def: CardDefinition) => () => Promise<{ default: React.ComponentType<T> }>,
) => {
  const useCardComponentLoader = (id: string) => {
    const def = useCardDefinition(id);

    const loader = def ? get(def) : null;
    return React.useMemo(() => (loader ? React.memo(React.lazy(loader)) : null), [loader]);
  };
  return useCardComponentLoader;
};

export const useCardContentComponent = factory<CardProps>(
  (def: CardDefinition) => def.contentComponent,
);

export const useCardSettingsComponent = factory<CardSettingsProps>(
  (def: CardDefinition) => def.settingsComponent,
);
