import * as React from 'react';

import './PipelineVisualizationStepList.scss';

export interface PipelineVisualizationStepListProps {
  steps: { name: string }[];
}
export const PipelineVisualizationStepList: React.FC<PipelineVisualizationStepListProps> = ({
  steps,
}) => (
  <ul className="odc-pipeline-vis-steps-list">
    {steps.map((step) => {
      return <li key={step.name}>{step.name}</li>;
    })}
  </ul>
);
