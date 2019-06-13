import { getClusterName } from '../../../public/components/utils/cluster-name';

describe('cluster-name', () => {
  it('should get cluster name', () => {
    window.SERVER_FLAGS.kubeAPIServerURL = 'https://foo.bar.com';
    expect(getClusterName()).toBe('foo-bar-com');
  });
});
