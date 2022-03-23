import * as React from 'react';
import { EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { CardProps } from '../../../types';
import { IFrameCardData } from './types';

const MarkdownCardContent: React.FC<CardProps<IFrameCardData>> = ({ data: { title, url } }) =>
  url ? (
    <iframe style={{ flexGrow: 1, height: '100%', border: 'none' }} src={url} title={title} />
  ) : (
    <EmptyState>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel="h4" size="lg">
        Please supply a URL
      </Title>
    </EmptyState>
  );

export default MarkdownCardContent;
