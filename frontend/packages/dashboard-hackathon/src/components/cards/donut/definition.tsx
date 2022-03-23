import { donutPreview } from '../../../test/base64-images';
import { CardDefinition } from '../../../types';
import { CardType } from '../types';
import { DonutCardData } from './types';

const definition: CardDefinition<DonutCardData> = {
  id: CardType.DONUT,
  label: 'Donut Chart',
  description: 'Displays a donut chart.',
  icon: () =>
    import(
      '@patternfly/react-icons/dist/esm/icons/chart-pie-icon' /* webpackChunkName: "pf-dashboard-card-donut" */
    ),
  images: [donutPreview],
  settingsComponent: () =>
    import('./DonutCardSettings' /* webpackChunkName: "pf-dashboard-card-donut" */),
  contentComponent: () =>
    import('./DonutCardContent' /* webpackChunkName: "pf-dashboard-card-donut" */),
  defaultData: {
    data: [
      { x: 'Cats', y: 35 },
      { x: 'Dogs', y: 55 },
      { x: 'Birds', y: 10 },
    ],
  },
};

export default definition;
