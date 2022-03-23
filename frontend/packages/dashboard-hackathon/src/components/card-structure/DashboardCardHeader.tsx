import * as React from 'react';
import { CardHeader } from '@patternfly/react-core';

type DashboardCardHeaderProps = React.ComponentProps<typeof CardHeader>;

const DashboardCardHeader: React.FC<DashboardCardHeaderProps> = (props) => {
  return <CardHeader {...props} />;
};

export default DashboardCardHeader;
