import * as React from 'react';
import { CardFooter } from '@patternfly/react-core';

type DashboardCardFooterProps = React.ComponentProps<typeof CardFooter>;

const DashboardCardFooter: React.FC<DashboardCardFooterProps> = (props) => {
  return <CardFooter {...props} />;
};

export default DashboardCardFooter;
