import * as React from 'react';
import { CardHeaderMain } from '@patternfly/react-core';

type DashboardCardHeaderMainProps = React.ComponentProps<typeof CardHeaderMain>;

const DashboardCardHeaderMain: React.FC<DashboardCardHeaderMainProps> = (props) => {
  return <CardHeaderMain {...props} />;
};

export default DashboardCardHeaderMain;
