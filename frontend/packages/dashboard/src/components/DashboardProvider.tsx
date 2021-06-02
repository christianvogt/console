import * as React from 'react';
import GridLayout from 'react-grid-layout';
import { DashboardConfig, WidgetConfig, WidgetProps } from '../types';
import DashboardTabs from './DashboardTabs';
import Dashboard from './Dashboard';
import DashboardTab from './DashboardTab';
import DashboardRouter from './DashboardRouter';
import DashboardCardLoader from './DashboardCardLoader';
import DashboardGrid from './DashboardGrid';

type Props = {
  onDashboardChange?: (dashboard: DashboardConfig) => void;
  onWidgetChange?: (dashboard: DashboardConfig, widget: WidgetConfig) => void;

  dashboards: DashboardConfig[];

  // control selected tab
  // alternatively supply a baseURL and control the tabs via routes
  selectedTab?: string;
  onTabChange?: (dashboardId: string) => void;
  // uncontrolled default selected tab
  defaultSelectedTab?: string;

  // the base patch for each tab
  basePath?: string;

  // control selected tab via route
  useRouter?: boolean;

  // control fullscreen mode
  fullscreenEnabled?: boolean;
  onFullscreen?: (enable: boolean) => void;

  fullscreenSettings?: {
    hideTabs?: boolean;
    cycle?: boolean;
    cycleDelay?: number;
  };

  widgets: { [id: string]: () => Promise<{ default: React.ComponentType<WidgetProps> }> };
};

const DashboardProvider: React.FC<Props> = ({
  //   onDashboardChange,
  //   onWidgetChange,
  basePath,
  selectedTab,
  defaultSelectedTab,
  onTabChange,
  dashboards,
  widgets,
  useRouter,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(selectedTab || defaultSelectedTab);

  const onChange = React.useCallback(
    (id) => {
      if (useRouter || selectedTab) {
        onTabChange(id);
      } else {
        setActiveTab(id);
      }
    },
    [selectedTab, useRouter, onTabChange],
  );

  React.useEffect(() => {
    if (!useRouter && selectedTab != null) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab, useRouter]);

  const contents = (selected) => (
    <Dashboard widgets={widgets}>
      <DashboardTabs
        onChange={onChange}
        selected={selected}
        defaultSelected={useRouter ? defaultSelectedTab : undefined}
      >
        {dashboards.map((dashboard, i) => (
          <DashboardTab
            key={`${i}`}
            eventKey={`${i}`}
            id={`${i}`}
            title={dashboard.label}
            basePath={basePath}
          >
            {selected === `${i}` ? (
              <DashboardGrid cols={dashboard.cols}>
                {dashboard.widgets.map((w, j) => (
                  <div key={`${j}`} data-grid={w.gridItem} className="ocdb-grid-item">
                    <DashboardCardLoader config={w} />
                  </div>
                ))}
              </DashboardGrid>
            ) : null}
          </DashboardTab>
        ))}
      </DashboardTabs>
    </Dashboard>
  );

  return useRouter ? (
    <DashboardRouter basePath={basePath ?? ''}>{contents}</DashboardRouter>
  ) : (
    contents(activeTab)
  );
};

export default DashboardProvider;
