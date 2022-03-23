import * as React from 'react';
import { CardBody } from '@patternfly/react-core';

type DashboardCardBodyProps = React.ComponentProps<typeof CardBody>;

const DashboardCardBody: React.FC<DashboardCardBodyProps> = (props) => {
  return <CardBody {...props} />;
};

export default DashboardCardBody;
