import * as React from 'react';
import { Tab } from '@patternfly/react-core';

type Props = {
  id: string;
  basePath?: string;
} & Pick<React.ComponentProps<typeof Tab>, 'title' | 'eventKey'>;

const DashboardTab: React.FC<Props> = ({ id, basePath, children, title }) => (
  <Tab eventKey={id} title={title} href={basePath ? `${basePath}/${id}` : undefined}>
    {children}
  </Tab>
);

export default DashboardTab;
