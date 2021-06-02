import { WidgetDefinition } from '../../../types';

const definition: WidgetDefinition = {
  id: 'markdown',
  label: 'Markdown',
  description: 'Displays a custom markdown message.',
  icon: '',
  images: [],
  loader: () => import('./MarkdownWidget'),
};

export default definition;
