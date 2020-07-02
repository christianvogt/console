import * as React from 'react';
import { useExtensions } from '@console/plugin-sdk';
import { Model } from '@console/topology';
import {
  CodeRef,
  isTopology3ModelProvider,
  Topology3ModelProvider,
  ModelProvider,
  isTopology3ModelTransform,
  ModelTransform,
} from '../../extensions/topology3';

export interface RenderProps {
  model?: Model;
  namespace: string;
  loaded: boolean;
  loadError: string;
}

type ProviderResult = { model: Model; loaded: boolean; error: string };

type CodeRefLoaderProps<T> = {
  codeRef: CodeRef<T>;
  children: (ref: T) => JSX.Element;
};

const CodeRefLoader: React.FC<CodeRefLoaderProps<any>> = ({ codeRef, children }) => {
  const [ref, setRef] = React.useState<{ provider: ModelProvider }>();
  React.useEffect(() => {
    let mounted = true;
    codeRef()
      .then((r) => {
        if (mounted) {
          setRef({ provider: r });
        }
      })
      .catch(() => {
        // TODO
      });
    return () => {
      mounted = false;
    };
  }, [codeRef]);

  return ref?.provider ? children(ref.provider) : null;
};

const Provider: React.FC<Topology3ModelProvider['properties'] & {
  namespace: string;
  notify: (result: ProviderResult) => void;
  provider: ModelProvider;
}> = ({ namespace, notify, provider }) => {
  const notifyRef = React.useRef(notify);
  notifyRef.current = notify;
  const [model, loaded, error] = provider(namespace);

  React.useEffect(() => notifyRef.current({ model, loaded, error }), [model, loaded, error]);

  // TODO error handling

  return null;
};

const Transform: React.FC<{
  model: Model;
  transform: ModelTransform;
  children: (model: Model) => JSX.Element;
}> = ({ transform, model, children }) => {
  const transformedModel = transform(model);
  return children(transformedModel);
};

const TopologyDataController: React.FC<{
  namespace: string;
  render: (props: RenderProps) => JSX.Element;
}> = ({ namespace, render }) => {
  const providers = useExtensions(isTopology3ModelProvider);
  const transforms = useExtensions(isTopology3ModelTransform);
  const [results, setResults] = React.useState<ProviderResult[]>([]);
  const [model, setModel] = React.useState<Model>(null);

  const loaded = results.reduce((i, r) => (r.loaded ? i + 1 : i), 0) === results.length;
  const loadError = results.find((r) => r.error)?.error;

  React.useEffect(() => {
    if (loaded) {
      // TODO incremental build
      // For now recreate the entire model
      setModel(
        results.reduce(
          (m, r) => ({
            graph: r.model?.graph ?? m.graph,
            nodes: [...(m.nodes ?? []), ...(r.model?.nodes ?? [])],
            edges: [...(m.edges ?? []), ...(r.model?.edges ?? [])],
          }),
          {} as Model,
        ),
      );
    }
  }, [loaded, results]);

  const children = transforms.reduce(
    (c, t) => (m: Model) => (
      <CodeRefLoader codeRef={t.properties.transform}>
        {(ref: ModelTransform) => (
          <Transform transform={ref} model={m}>
            {c}
          </Transform>
        )}
      </CodeRefLoader>
    ),
    (m: Model) =>
      render({
        model: m,
        namespace,
        loaded,
        loadError,
      }),
  );
  return (
    <>
      {providers
        .sort((a, b) => (a.properties.priority ?? 0) - (b.properties.priority ?? 0))
        .map((p, i) => (
          // TODO add key
          // eslint-disable-next-line react/no-array-index-key
          <CodeRefLoader key={i} codeRef={p.properties.provider}>
            {(ref: ModelProvider) => (
              <Provider
                namespace={namespace}
                {...p.properties}
                provider={ref}
                notify={(result) => {
                  const clone = [...results];
                  clone[i] = result;
                  setResults(clone);
                }}
              />
            )}
          </CodeRefLoader>
        ))}
      {children(model)}
    </>
  );
};

export default TopologyDataController;
