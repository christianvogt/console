import * as React from 'react';
import { Firehose } from '@console/internal/components/utils';
import { List } from '@console/internal/components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';
import PipelineAugmentRuns from './PipelineAugmentRuns';
import { getResources, PropPipelineData, Resource } from '../../utils/pipeline-augment';

export interface PipelineListProps {
  data?: PropPipelineData[];
}

const PipelineList: React.FC<PipelineListProps> = ({ data, ...props }) => {
  const { propsReferenceForRuns, resources }: Resource = getResources(data);
  return resources && resources.length > 0 ? (
    <Firehose resources={resources}>
      <PipelineAugmentRuns {...props} propsReferenceForRuns={propsReferenceForRuns} />
    </Firehose>
  ) : (
    <List {...props} Header={PipelineHeader} Row={PipelineRow} />
  );
};
export default PipelineList;
