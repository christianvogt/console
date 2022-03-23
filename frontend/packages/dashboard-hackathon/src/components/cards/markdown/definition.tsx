import { dashboardMarkdownCards, quotaMarkdownCard } from '../../../test/base64-images';
import { CardDefinition } from '../../../types';
import { CardType } from '../types';
import { MarkdownCardData } from './types';

const definition: CardDefinition<MarkdownCardData> = {
  id: CardType.MARKDOWN,
  label: 'Markdown',
  description: 'Displays a custom markdown message.',
  icon: () =>
    import(
      '@patternfly/react-icons/dist/esm/icons/markdown-icon' /* webpackChunkName: "pf-dashboard-card-markdown" */
    ),
  images: [quotaMarkdownCard, dashboardMarkdownCards],
  settingsComponent: () =>
    import('./MarkdownCardSettings' /* webpackChunkName: "pf-dashboard-card-markdown" */),
  contentComponent: () =>
    import('./MarkdownCardContent' /* webpackChunkName: "pf-dashboard-card-markdown" */),
};

export default definition;
