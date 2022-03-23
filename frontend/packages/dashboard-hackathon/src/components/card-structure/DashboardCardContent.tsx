import * as React from 'react';

type DashboardCardProps = {
  children: React.ReactNode;
};

const DashboardCardContent: React.FC<DashboardCardProps> = ({ children }) => {
  return <>{children}</>;
};

export default DashboardCardContent;
