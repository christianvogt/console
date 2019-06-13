import * as React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { NamespaceBar } from '@console/internal/components/namespace';
import ApplicationSelector from './dropdown/ApplicationSelector';

const NamespaceAppPage: React.FC = ({ children }) => (
  <Stack style={{ maxHeight: '100%' }}>
    <StackItem isFilled={false}>
      <NamespaceBar>
        <ApplicationSelector />
      </NamespaceBar>
    </StackItem>
    <StackItem
      isFilled
      style={{
        position: 'relative',
        overflow: 'auto',
        backgroundColor: 'var(--pf-global--Color--light-200)',
      }}
    >
      {children}
    </StackItem>
  </Stack>
);

export default NamespaceAppPage;
