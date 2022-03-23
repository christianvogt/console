import { CardDefinition } from '../../types';
import { donutDefinition } from './donut';
import { iframeDefinition } from './iframe';
import { markdownDefinition } from './markdown';

const definitions: CardDefinition<any>[] = [donutDefinition, markdownDefinition, iframeDefinition];

export default definitions;
