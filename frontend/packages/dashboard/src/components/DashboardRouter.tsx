import * as React from 'react';
import { useLocation, matchPath } from 'react-router-dom';

type Props = {
  basePath: string;
  children: (selectedTab: string) => JSX.Element;
};

const DashboardRouter: React.FC<Props> = ({ basePath, children }) => {
  const { pathName } = useLocation();
  const {
    params: { id },
  } = matchPath(pathName, {
    path: `${basePath}/:id`,
    exact: true,
  });

  return children(id);
};

export default DashboardRouter;
