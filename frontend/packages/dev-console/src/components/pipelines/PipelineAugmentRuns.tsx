import * as React from 'react';
import { List } from '@console/internal/components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';
import { augmentRunsToData, PropPipelineData, KeyedRuns } from '../../utils/pipeline-augment';

export type PipelineAugmentRunsProps = {
  data?: PropPipelineData[];
  propsReferenceForRuns?: string[];
};

// Firehose injects a lot of props and some of those are considered the KeyedRuns
const PipelineAugmentRuns: React.FC<PipelineAugmentRunsProps> = ({
  data,
  propsReferenceForRuns,
  ...props
}) => (
  <List
    {...props}
    data={augmentRunsToData(data, propsReferenceForRuns, props as KeyedRuns)}
    Header={PipelineHeader}
    Row={PipelineRow}
  />
);

export default PipelineAugmentRuns;
