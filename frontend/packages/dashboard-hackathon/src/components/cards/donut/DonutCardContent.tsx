import * as React from 'react';
import { ChartDonut } from '@patternfly/react-charts';
import { CardProps } from '../../../types';
import { DonutCardData } from './types';

const DonutCardContent: React.FC<CardProps<DonutCardData>> = ({
  data: { ariaDesc, ariaTitle, data, title, subTitle, unit },
}) => (
  <ChartDonut
    ariaDesc={ariaDesc}
    ariaTitle={ariaTitle}
    constrainToVisibleArea
    data={data}
    labels={({ datum }) => `${datum.x}: ${datum.y}${unit ?? ''}`}
    subTitle={subTitle}
    title={title}
  />
);

export default DonutCardContent;
