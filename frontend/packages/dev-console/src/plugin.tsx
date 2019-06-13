import * as React from 'react';
import * as _ from 'lodash-es';
import {
  Plugin,
  ModelDefinition,
  ModelFeatureFlag,
  HrefNavItem,
  ResourceNSNavItem,
  ResourceClusterNavItem,
  ResourceListPage,
  ResourceDetailsPage,
  Perspective,
  RoutePage,
} from '@console/plugin-sdk';
import { NamespaceRedirect } from '@console/internal/components/utils/namespace-redirect';
import { CodeIcon } from '@patternfly/react-icons';
import { FLAGS } from '@console/internal/const';
import * as models from './models';

const { PipelineModel, PipelineRunModel } = models;

type ConsumedExtensions =
  | ModelDefinition
  | ModelFeatureFlag
  | HrefNavItem
  | ResourceClusterNavItem
  | ResourceNSNavItem
  | ResourceListPage
  | ResourceDetailsPage
  | Perspective
  | RoutePage;

const plugin: Plugin<ConsumedExtensions> = [
  {
    type: 'ModelDefinition',
    properties: {
      models: _.values(models),
    },
  },
  {
    type: 'NavItem/Href',
    properties: {
      perspective: 'dev',
      componentProps: {
        name: '+Add',
        href: '/add',
      },
    },
  },
  {
    type: 'NavItem/Href',
    properties: {
      perspective: 'dev',
      componentProps: {
        name: 'Topology',
        href: '/topology',
      },
    },
  },
  {
    type: 'NavItem/ResourceNS',
    properties: {
      perspective: 'dev',
      componentProps: {
        name: 'Builds',
        resource: 'buildconfigs',
      },
    },
  },
  {
    type: 'NavItem/ResourceCluster',
    properties: {
      perspective: 'dev',
      section: 'Advanced',
      componentProps: {
        name: 'Projects',
        resource: 'projects',
        required: FLAGS.OPENSHIFT,
      },
    },
  },
  {
    type: 'NavItem/Href',
    properties: {
      perspective: 'dev',
      section: 'Advanced',
      componentProps: {
        name: 'Status',
        href: '/overview',
        required: FLAGS.OPENSHIFT,
      },
    },
  },
  {
    type: 'NavItem/Href',
    properties: {
      perspective: 'dev',
      section: 'Advanced',
      componentProps: {
        name: 'Status',
        href: '/status',
        disallowed: FLAGS.OPENSHIFT,
      },
    },
  },
  {
    type: 'NavItem/ResourceNS',
    properties: {
      perspective: 'dev',
      section: 'Advanced',
      componentProps: {
        name: 'Events',
        resource: 'events',
      },
    },
  },
  {
    type: 'NavItem/Href',
    properties: {
      perspective: 'dev',
      section: 'Advanced',
      componentProps: {
        name: 'Search',
        href: '/search',
      },
    },
  },
  {
    type: 'Page/Resource/List',
    properties: {
      model: PipelineModel,
      loader: async () =>
        (await import(
          './components/pipelines/PipelinesPage' /* webpackChunkName: "pipeline-list" */
        )).default,
    },
  },
  {
    type: 'Page/Resource/Details',
    properties: {
      model: PipelineModel,
      loader: async () =>
        (await import(
          './components/pipelines/PipelineDetailsPage' /* webpackChunkName: "pipeline-details" */
        )).default,
    },
  },
  {
    type: 'Page/Resource/Details',
    properties: {
      model: PipelineRunModel,
      loader: async () =>
        (await import(
          './components/pipelineruns/PipelineRunDetailsPage' /* webpackChunkName: "pipelinerun-details" */
        )).default,
    },
  },
  {
    type: 'Perspective',
    properties: {
      id: 'dev',
      name: 'Developer',
      icon: <CodeIcon />,
      landingPageURL: '/topology',
    },
  },
  {
    type: 'Page/Route',
    properties: {
      exact: true,
      path: ['/add', '/import', '/topology'],
      render: (props) => <NamespaceRedirect {...props} />,
    },
  },
  {
    type: 'Page/Route',
    properties: {
      exact: true,
      path: ['/add/all-namespaces', '/add/ns/:ns'],
      loader: async () =>
        (await import('./components/AddPage' /* webpackChunkName: "dev-console-add" */)).default,
    },
  },
  {
    type: 'Page/Route',
    properties: {
      exact: true,
      path: ['/topology/all-namespaces', '/topology/ns/:ns'],
      loader: async () =>
        (await import(
          './components/topology/TopologyPage' /* webpackChunkName: "dev-console-topology" */
        )).default,
    },
  },
  {
    type: 'Page/Route',
    properties: {
      exact: true,
      path: ['/import/all-namespaces', '/import/ns/:ns'],
      loader: async () =>
        (await import(
          './components/import/ImportPage' /* webpackChunkName: "dev-console-import" */
        )).default,
    },
  },
];

export default plugin;
