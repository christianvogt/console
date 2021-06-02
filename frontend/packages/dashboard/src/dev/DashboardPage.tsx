import * as React from 'react';
import { Config } from '../types';
import DashboardProvider from '../components/DashboardProvider';
// import { Card, CardHeader, CardBody } from '@patternfly/react-core';

const widgets: React.ComponentProps<typeof DashboardProvider>['widgets'] = {
  markdown: () => import('../components/widgets/markdown/MarkdownWidget'),
};

const config: Config = {
  dashboards: [
    {
      label: 'My First Dashboard',
      cols: 12,
      widgets: [
        {
          type: 'markdown',
          label: 'Intro',
          description: 'This is the description',
          gridItem: {
            x: 0,
            y: 0,
            w: 4,
            h: 2,
          },
          settings: {
            markdown: '### This is a test',
          },
        },

        {
          type: 'markdown',
          label: 'Intro2',
          description: 'This is the description2',
          gridItem: {
            x: 4,
            y: 0,
            w: 3,
            h: 3,
          },
          settings: {
            markdown: '### This is a test2',
          },
        },
      ],
    },
  ],
};

const DashboardPage: React.FC = () => {
  return (
    <DashboardProvider widgets={widgets} dashboards={config.dashboards} defaultSelectedTab="0" />
  );
};

export default DashboardPage;
