import { CardDefinition } from '../../../types';
import { CardType } from '../types';
import { IFrameCardData } from './types';

const definition: CardDefinition<IFrameCardData> = {
  id: CardType.IFRAME,
  label: 'IFrame',
  description: 'Displays an iframe.',
  icon: () =>
    import(
      '@patternfly/react-icons/dist/esm/icons/outlined-window-maximize-icon' /* webpackChunkName: "pf-dashboard-card-iframe" */
    ),
  images: [],
  settingsComponent: () =>
    import('./IFrameCardSettings' /* webpackChunkName: "pf-dashboard-card-iframe" */),
  contentComponent: () =>
    import('./IFrameCardContent' /* webpackChunkName: "pf-dashboard-card-iframe" */),
};

export default definition;
