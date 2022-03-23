import * as React from 'react';
import DashboardContext from '../../utils/DashboardContext';
import { useFullscreen } from '../../utils/fullscreen';
import EditableWrapper from '../card-editor/EditableWrapper';
import { DashboardCardFrame } from '../card-structure';
import DashboardCardLoader from './DashboardCardLoader';
import DashboardGrid from './DashboardGrid';
import DashboardRouter from './DashboardRouter';
import DashboardTab from './DashboardTab';
import DashboardTabs from './DashboardTabs';

import './Dashboard.scss';
import { DashboardTabConfig } from '../../types';

export type DashboardAPI = {
  fullscreenToggle(): void;
};

type Props = {
  // The base patch for each tab.
  // Must end with '/'.
  basePath?: string;

  // control selected tab
  // alternatively supply a baseURL and control the tabs via routes
  selectedTab?: string;
  onTabChange?: (dashboardId: string) => void;
  // uncontrolled default selected tab
  defaultSelectedTab?: string;

  // control fullscreen mode
  fullscreenEnabled?: boolean;
  onFullscreen?: (enable: boolean) => void;

  fullscreenSettings?: {
    hideTabs?: boolean;
    cycle?: boolean;
    cycleDelay?: number;
  };

  readonly?: boolean;

  hideTabs?: boolean;
};

const Dashboard: React.RefForwardingComponent<DashboardAPI, Props> = (
  { selectedTab, defaultSelectedTab, onTabChange, readonly, basePath, hideTabs },
  ref,
) => {
  const {
    dashboard: { tabs },
    cardContext,
    updateLayout,
  } = React.useContext(DashboardContext);
  const [dragId, setDragId] = React.useState<string | undefined>();
  const [resizeId, setResizeId] = React.useState<string | undefined>();

  const [isFullscreen, fullscreenRef, fullscreenToggle] = useFullscreen<HTMLDivElement>();

  React.useImperativeHandle(ref, () => ({
    fullscreenToggle,
  }));

  const firstTab = selectedTab ?? defaultSelectedTab ?? tabs[0]?.id ?? undefined;
  const [activeTab, setActiveTab] = React.useState<string | undefined>(firstTab);

  const onChange = React.useCallback(
    (id) => {
      if (basePath || selectedTab) {
        onTabChange && onTabChange(id);
      } else {
        setActiveTab(id);
      }
    },
    [selectedTab, basePath, onTabChange],
  );

  React.useEffect(() => {
    if (!basePath && selectedTab != null) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab, basePath]);

  const grid = (tab: DashboardTabConfig) => (
    <DashboardGrid
      readonly={readonly}
      isFullscreen={isFullscreen}
      cols={tab.cols}
      layout={tab.layout}
      onLayoutChange={(layout) => updateLayout(tab.id, layout)}
      onDragStart={(id) => setDragId(id)}
      onDragStop={() => setDragId(undefined)}
      onResizeStart={(id) => setResizeId(id)}
      onResizeStop={() => setResizeId(undefined)}
    >
      {tab.cards.map((card) => (
        <div key={card.id}>
          <DashboardCardLoader config={card}>
            {(Component) => (
              <EditableWrapper config={card}>
                <DashboardCardFrame config={card} readonly={readonly}>
                  <Component
                    data={card.data}
                    context={cardContext}
                    resizing={resizeId === card.id}
                    dragging={dragId === card.id}
                  />
                </DashboardCardFrame>
              </EditableWrapper>
            )}
          </DashboardCardLoader>
        </div>
      ))}
    </DashboardGrid>
  );
  const contents = (selected: string | undefined) =>
    tabs.length ? (
      <div className="pf-dashboard" ref={fullscreenRef}>
        {hideTabs ? (
          tabs[selectedTab] ? (
            grid(tabs[selectedTab])
          ) : null
        ) : (
          <DashboardTabs
            onChange={onChange}
            selected={selected}
            defaultSelected={basePath ? undefined : firstTab}
          >
            {tabs.map((tab) => (
              <DashboardTab
                key={tab.id}
                eventKey={tab.id}
                id={tab.id}
                title={tab.label}
                basePath={basePath}
              >
                {selected === tab.id ? grid(tab) : null}
              </DashboardTab>
            ))}
          </DashboardTabs>
        )}
      </div>
    ) : null;

  return basePath ? (
    <DashboardRouter basePath={basePath} defaultTab={firstTab}>
      {contents}
    </DashboardRouter>
  ) : (
    contents(activeTab)
  );
};

export default React.forwardRef(Dashboard);
