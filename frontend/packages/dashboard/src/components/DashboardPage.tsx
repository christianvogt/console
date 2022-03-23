import * as React from 'react';
import { DashboardConfig, DashboardProvider, Catalog, CardDefinition } from '@patternfly/dashboard';
import definitions from '@patternfly/dashboard/src/components/cards/definitions';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Extension, ExtensionTypeGuard, useExtensions } from '@console/plugin-sdk';
import { useUserSettings } from '@console/shared';
import { isDashboardCard, DashboardCardDefinition } from '../extensions';
import DashboardWrapper from './DashboardWrapper';

const App: React.FC = () => {
  const typeGuard = React.useCallback<ExtensionTypeGuard<DashboardCardDefinition>>(
    (e: Extension): e is DashboardCardDefinition =>
      isDashboardCard(e) && e.properties.dashboard === 'cluster',
    [],
  );
  const cardDefExts = useExtensions<DashboardCardDefinition>(typeGuard);
  const history = useHistory();
  const [dashboardConfig, setDashboardConfig] = useUserSettings<DashboardConfig>(
    'user-settings-dashbaord',
    {
      tabs: [],
    },
  );

  const cardDefinitions = React.useMemo<CardDefinition[]>(
    () =>
      cardDefExts.map((d) => ({
        id: d.properties.id,
        description: d.properties.description,
        label: d.properties.label,
        defaultData: d.properties.defaultData,
        icon:
          typeof d.properties.icon === 'string'
            ? d.properties.icon
            : () => (d.properties.icon as Function)().then((v) => ({ default: v })),
        contentComponent: () => d.properties.contentComponent().then((v) => ({ default: v })),
        settingsComponent: d.properties.settingsComponent
          ? () => d.properties.settingsComponent().then((v) => ({ default: v }))
          : undefined,
      })),
    [cardDefExts],
  );

  const alldefs = React.useMemo(() => (cardDefinitions || []).concat(definitions), [
    cardDefinitions,
  ]);
  return (
    <DashboardProvider
      definitions={alldefs}
      dashboard={dashboardConfig}
      onDashboardChange={setDashboardConfig}
    >
      <Switch>
        <Route
          path="/test-dashboard/catalog"
          render={() => (
            <Catalog
              onCardAdded={(config, tabId) => history.push(`/test-dashboard/dashboard/${tabId}`)}
            />
          )}
        />
        <Route
          path="/*"
          render={() => <DashboardWrapper basePath="/test-dashboard/dashboard/" />}
        />
      </Switch>
    </DashboardProvider>
  );
};

export default App;
