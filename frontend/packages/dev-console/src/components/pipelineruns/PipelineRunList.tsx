import * as React from 'react';
import { List } from '@console/internal/components/factory';
import PipelineRunHeader from './PipelineRunHeader';
import PipelineRunRow from './PipelineRunRow';

export const PipelineRunList: React.FC = (props) => (
  <List {...props} Header={PipelineRunHeader} Row={PipelineRunRow} />
);

export default PipelineRunList;
