import { Model } from '@patternfly/react-topology';
import { ModelProvider } from '../../../extensions/topology3';

const model: Model = {
  nodes: [
    {
      id: 'test-1',
      type: 'test',
      label: 'Test 1',
      width: 100,
      height: 100,
    },
    {
      id: 'test-2',
      type: 'test',
      label: 'Test 2',
      width: 100,
      height: 100,
    },
  ],
};

export const useTestProvider: ModelProvider = () => {
  return [model, true, undefined];
};
