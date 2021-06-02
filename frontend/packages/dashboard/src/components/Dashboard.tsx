import * as React from 'react';
import { WidgetProps } from '../types';
import DashboardContext from './DashboardContext';

import './Dashboard.scss';

type Props = {
  widgets: { [id: string]: () => Promise<{ default: React.ComponentType<WidgetProps> }> };
};

const Dashboard: React.FC<Props> = ({ widgets, children }) => (
  <div className="ocdb-dashboard">
    <DashboardContext.Provider value={{ widgets }}>{children}</DashboardContext.Provider>
  </div>
);

export default Dashboard;
