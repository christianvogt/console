import * as React from 'react';
import { CardTitle } from '@patternfly/react-core';

type DashboardCardTitleProps = React.ComponentProps<typeof CardTitle>;

const DashboardCardTitle: React.FC<DashboardCardTitleProps> = (props) => {
  return <CardTitle {...props} />;
};

export default DashboardCardTitle;
