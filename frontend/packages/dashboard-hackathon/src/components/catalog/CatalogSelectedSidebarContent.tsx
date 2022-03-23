import * as React from 'react';
import { Stack, StackItem, Title } from '@patternfly/react-core';
import { CardDefinition } from '../../types';
import { DefinitionTitle } from '../common';
import CatalogImage from './CatalogImage';

type CatalogSelectedSidebarContentProps = {
  selectedDefinition?: CardDefinition;
};

const CatalogSelectedSidebarContent: React.FC<CatalogSelectedSidebarContentProps> = ({
  selectedDefinition,
}) => {
  if (!selectedDefinition) return null;

  const { description, images } = selectedDefinition;

  const validImages = images ? images.filter((src) => !!src) : [];

  return (
    <Stack hasGutter>
      <StackItem>
        <DefinitionTitle definition={selectedDefinition} size="3xl" />
      </StackItem>
      <StackItem>
        <p>{description}</p>
      </StackItem>
      {validImages.length > 0 && (
        <StackItem>
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel="h3">Preview Images</Title>
            </StackItem>
            {validImages.map((src) => (
              <StackItem key={src}>
                <CatalogImage src={src} />
              </StackItem>
            ))}
          </Stack>
        </StackItem>
      )}
    </Stack>
  );
};

export default CatalogSelectedSidebarContent;
