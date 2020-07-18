import { Extension } from '@console/plugin-sdk/src/typings/base';
import { ComponentFactory, Model, GraphElement } from '@patternfly/react-topology';

export type CodeRef<T> = () => Promise<T>;

export type ModelProvider = (
  namespace: string,
) => [/* model: */ Model, /* loaded: */ boolean, /* loadError: */ any];

export type ModelTransform = (mode: Model) => Model;

export type RelationshipProvider = (source: GraphElement, target?: GraphElement) => boolean;
export type RelationshipCreator = (source: GraphElement, target: GraphElement) => Promise<boolean>;

namespace ExtensionProperties {
  export interface Topology3ComponentFactory {
    /** Priority for the factory */
    priority?: number;
    /** A for aComponentFactory */
    factory: CodeRef<ComponentFactory>;
  }

  export interface Topology3ModelProvider {
    /** Priority for the factory */
    priority?: number;
    provider: CodeRef<ModelProvider>;
  }

  export interface Topology3ModelTransform {
    /** Priority for the transform */
    priority?: number;
    transform: CodeRef<ModelTransform>;
  }

  export interface Topology3RelationshipProvider {
    name: string;
    fallback?: boolean;
    provides: CodeRef<RelationshipProvider>;
    create: CodeRef<RelationshipCreator>;
  }

  export interface Topology3DisplayOptions {
    type: 'show' | 'expand' | string;
    id: string;
    label: string;
    order?: number;
    defaultValue?: any;
    apply: CodeRef<
      (
        model: Model,
        value: any,
      ) => {
        count: number;
        affected: number;
      }
    >;
  }

  type Adapter = <T extends {}, A extends {} = any>(adaptee: A, type: string) => T | undefined;

  export interface Adapters {
    adapt: CodeRef<
      <T extends {}, A extends {} = any>(adaptee: A, type: string, adapt: Adapter) => T | undefined
    >;
  }
}

export interface Topology3ComponentFactory
  extends Extension<ExtensionProperties.Topology3ComponentFactory> {
  type: 'Topology3/ComponentFactory';
}

export interface Topology3ModelProvider
  extends Extension<ExtensionProperties.Topology3ModelProvider> {
  type: 'Topology3/ModelProvider';
}

export interface Topology3ModelTransform
  extends Extension<ExtensionProperties.Topology3ModelTransform> {
  type: 'Topology3/ModelTransform';
}

export interface Topology3RelationshipProvider
  extends Extension<ExtensionProperties.Topology3RelationshipProvider> {
  type: 'Topology3/RelationshipProvider';
}

export interface Topology3DisplayOptions
  extends Extension<ExtensionProperties.Topology3DisplayOptions> {
  type: 'Topology3/DisplayOptions';
}

export const isTopology3ComponentFactory = (e: Extension): e is Topology3ComponentFactory => {
  return e.type === 'Topology3/ComponentFactory';
};

export const isTopology3ModelProvider = (e: Extension): e is Topology3ModelProvider => {
  return e.type === 'Topology3/ModelProvider';
};

export const isTopology3ModelTransform = (e: Extension): e is Topology3ModelTransform => {
  return e.type === 'Topology3/ModelTransform';
};

export const isTopology3RelationshipProvider = (
  e: Extension,
): e is Topology3RelationshipProvider => {
  return e.type === 'Topology3/RelationshipProvider';
};

export const isTopology3DisplayOptions = (e: Extension): e is Topology3DisplayOptions => {
  return e.type === 'Topology3/DisplayOptions';
};
