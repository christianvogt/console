import { K8sKind } from '@console/internal/module/k8s';

export const PipelineModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1alpha1',
  label: 'Pipeline',
  path: 'pipelines',
  plural: 'pipelines',
  abbr: 'PL',
  namespaced: true,
  kind: 'Pipeline',
  id: 'pipeline',
  labelPlural: 'Pipelines',
};

export const PipelineRunModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1alpha1',
  label: 'Pipelinerun',
  path: 'pipelineruns',
  plural: 'pipelineruns',
  abbr: 'PLR',
  namespaced: true,
  kind: 'PipelineRun',
  id: 'pipelineRun',
  labelPlural: 'PipelineRuns',
};

export const TaskModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1alpha1',
  label: 'Task',
  path: 'tasks',
  plural: 'tasks',
  abbr: 'T',
  namespaced: true,
  kind: 'Task',
  id: 'task',
  labelPlural: 'Tasks',
};

export const TaskrunModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1alpha1',
  label: 'Taskrun',
  path: 'taskruns',
  plural: 'taskruns',
  abbr: 'TR',
  namespaced: true,
  kind: 'TaskRun',
  id: 'taskRun',
  labelPlural: 'TaskRuns',
};
