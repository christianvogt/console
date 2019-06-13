import * as React from 'react';
import { ListPage } from '@console/internal/components/factory';
import PipelineList from './PipelineList';
import { pipelineFilterReducer } from '../../utils/pipeline-filter-reducer';

const filters = [
  {
    type: 'pipeline-status',
    selected: ['Running', 'Failed', 'Complete'],
    reducer: pipelineFilterReducer,
    items: [
      { id: 'Running', title: 'Running' },
      { id: 'Failed', title: 'Failed' },
      { id: 'Complete', title: 'Complete' },
    ],
  },
];

const PipelinesPage: React.FC<any> = (props) => (
  <ListPage
    {...props}
    canCreate={false}
    kind="Pipeline"
    ListComponent={PipelineList}
    rowFilters={filters}
  />
);

export default PipelinesPage;
