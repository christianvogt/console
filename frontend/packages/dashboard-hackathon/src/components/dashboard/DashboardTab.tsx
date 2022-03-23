import * as React from 'react';
import { Tab } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

type Props = {
  id: string;
  basePath?: string;
} & Pick<React.ComponentProps<typeof Tab>, 'title' | 'eventKey'>;

const DashboardTab: React.FC<Props> = ({ id, basePath, children, title }) => {
  const history = useHistory();
  return (
    <Tab
      translate={{}}
      eventKey={id}
      title={title}
      href={basePath ? `${basePath}${id}` : undefined}
      {...(basePath
        ? {
            onClick: (e) => {
              e.preventDefault();
              history.push(`${basePath}${id}`);
            },
          }
        : {})}
    >
      {children}
    </Tab>
  );
};

export default DashboardTab;
