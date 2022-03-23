import { DashboardTabConfig, CardDefinition, DashboardConfig } from '../types';

import definitions from '../components/cards/definitions';
import { CardType } from '../components/cards/types';
import { markdownTest } from './markdown';

export const cardDefinitions: CardDefinition[] = [...definitions];

export const dashboardTabs: DashboardTabConfig[] = [
  {
    id: 'overviewTab',
    label: 'Overview',
    layout: [
      { i: 'redhat', x: 4, y: 0, w: 4, h: 3 },
      { i: 'quota', x: 8, y: 0, w: 4, h: 2 },
    ],
    cards: [
      {
        id: 'redhat',
        type: CardType.IFRAME,
        data: {
          title: 'Red Hat',
          url: 'https://www.redhat.com',
        },
      },

      {
        id: 'quota',
        type: CardType.MARKDOWN,
        data: {
          title: 'Markdown Test',
          description: 'tests a whole bunch of markdown',
          markdown: markdownTest,
        },
      },
    ],
  },
  {
    id: 'teamTab',
    label: 'Team',
    layout: [
      { i: 'team', x: 0, y: 0, w: 4, h: 1 },
      { i: 'process', x: 4, y: 0, w: 4, h: 2 },
      { i: 'changeLog', x: 8, y: 0, w: 4, h: 1 },
    ],
    cards: [
      {
        id: 'team',
        type: CardType.MARKDOWN,
        frameless: true,
        data: {
          title: 'Team Event',
          description: 'Get the latest team event information',
          markdown: '## Team event markdown',
        },
      },

      {
        id: 'process',
        type: CardType.MARKDOWN,
        data: {
          title: 'Process',
          description: 'Read about the business process.',
          markdown: '## Process documentation markdown',
        },
      },

      {
        id: 'changeLog',
        type: CardType.MARKDOWN,
        data: {
          title: 'Change Log',
          description: 'Read the change log for each release',
          markdown: '## Change Log markdown',
        },
      },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    layout: [
      { i: 'c1', x: 0, y: 0, w: 4, h: 2 },
      { i: 'c2', x: 4, y: 0, w: 4, h: 2 },
      { i: 'c3', x: 8, y: 0, w: 4, h: 2 },
    ],
    cards: [
      {
        id: 'c1',
        type: CardType.DONUT,
        frameless: true,
        data: {
          ariaDesc: 'Average number of pets',
          ariaTitle: 'Donut chart example',
          data: [
            { x: 'Cats', y: 25 },
            { x: 'Dogs', y: 15 },
            { x: 'Birds', y: 60 },
          ],
          unit: '%',
          subTitle: 'Pets',
          title: '100',
        },
      },
      {
        id: 'c2',
        type: CardType.DONUT,
        frameless: true,
        data: {
          ariaDesc: 'Average number of pets',
          ariaTitle: 'Donut chart example',
          data: [
            { x: 'Cats', y: 35 },
            { x: 'Dogs', y: 55 },
            { x: 'Birds', y: 10 },
          ],
          unit: '%',
          subTitle: 'Pets',
          title: '100',
        },
      },
      {
        id: 'c3',
        type: CardType.DONUT,
        frameless: true,
        data: {
          ariaDesc: 'Average number of pets',
          ariaTitle: 'Donut chart example',
          data: [
            { x: 'Cats', y: 40 },
            { x: 'Dogs', y: 20 },
            { x: 'Birds', y: 40 },
          ],
          unit: '%',
          subTitle: 'Pets',
          title: '100',
        },
      },
    ],
  },
];

export const dashboard: DashboardConfig = {
  tabs: dashboardTabs,
};
