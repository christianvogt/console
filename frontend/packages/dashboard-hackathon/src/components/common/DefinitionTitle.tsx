import * as React from 'react';
import { Title } from '@patternfly/react-core';
import { CardDefinition } from '../../types';
import DefinitionIcon from './DefinitionIcon';

type DefinitionTitleProps = {
  definition: CardDefinition;
  size?: React.ComponentProps<typeof Title>['size'];
};

const DefinitionTitle: React.FC<DefinitionTitleProps> = ({ definition, size }) => {
  const { label, icon } = definition;
  return (
    <Title headingLevel="h3" size={size}>
      <DefinitionIcon icon={icon} /> {label}
    </Title>
  );
};

export default DefinitionTitle;
