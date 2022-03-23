import * as React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

type Props = {
  basePath: string;
  children: (selectedTab: string | undefined) => JSX.Element;
  defaultTab: string;
};

const DashboardRouter: React.FC<Props> = ({ basePath, children, defaultTab }) => {
  const { pathname } = useLocation();
  const match = matchPath<{ id: string }>(pathname, { path: `${basePath}:id` });
  const id = match?.params?.id ?? defaultTab;
  return children(id);
};

export default DashboardRouter;
