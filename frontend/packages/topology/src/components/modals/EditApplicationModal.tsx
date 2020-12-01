import * as React from 'react';
import * as _ from 'lodash';
import { Trans, useTranslation } from 'react-i18next';
import { Title } from '@patternfly/react-core';
import { K8sKind, K8sResourceKind } from '@console/internal/module/k8s';
import { PromiseComponent } from '@console/internal/components/utils';
import {
  createModalLauncher,
  ModalTitle,
  ModalBody,
  ModalSubmitFooter,
} from '@console/internal/components/factory/modal';
import { Formik, FormikProps, FormikValues } from 'formik';
import { UNASSIGNED_KEY } from '../../const';
import ApplicationSelector from '../dropdowns/ApplicationSelector';
import { updateResourceApplication } from '../../utils/application-utils';

type EditApplicationFormProps = {
  resource: K8sResourceKind;
  initialApplication: string;
  cancel?: () => void;
};

type EditApplicationModalState = {
  inProgress: boolean;
  errorMessage: string;
};

type EditApplicationModalProps = EditApplicationFormProps & {
  resourceKind: K8sKind;
  close?: () => void;
};

const EditApplicationForm: React.FC<FormikProps<FormikValues> & EditApplicationFormProps> = ({
  resource,
  handleSubmit,
  isSubmitting,
  cancel,
  values,
  initialApplication,
  status,
}) => {
  const { t } = useTranslation();
  const dirty = _.get(values, 'application.selectedKey') !== initialApplication;
  return (
    <form onSubmit={handleSubmit} className="modal-content modal-content--no-inner-scroll">
      <ModalTitle>{t('topology~Edit Application grouping')}</ModalTitle>
      <ModalBody>
        <Title headingLevel="h2" size="md" className="co-m-form-row">
          <Trans ns="topology">
            Select an Application group to add the component{' '}
            <strong>{resource.metadata.name}</strong> to
          </Trans>
        </Title>
        <div className="pf-c-form">
          <ApplicationSelector namespace={resource.metadata.namespace} />
        </div>
      </ModalBody>
      <ModalSubmitFooter
        submitText={t('topology~Save')}
        submitDisabled={!dirty}
        cancel={cancel}
        inProgress={isSubmitting}
        errorMessage={status && status.submitError}
      />
    </form>
  );
};

class EditApplicationModal extends PromiseComponent<
  EditApplicationModalProps,
  EditApplicationModalState
> {
  private handleSubmit = (values, actions) => {
    const { resourceKind, resource } = this.props;
    const applicationKey = values.application.selectedKey;
    const application = applicationKey === UNASSIGNED_KEY ? undefined : values.application.name;

    this.handlePromise(updateResourceApplication(resourceKind, resource, application))
      .then(() => {
        actions.setSubmitting(false);
        this.props.close();
      })
      .catch((errorMessage) => {
        actions.setSubmitting(false);
        actions.setStatus({ submitError: errorMessage });
      });
  };

  render() {
    const { resource } = this.props;
    const application = _.get(resource, ['metadata', 'labels', 'app.kubernetes.io/part-of']);

    const initialValues = {
      application: {
        name: application,
        selectedKey: application || UNASSIGNED_KEY,
      },
    };
    return (
      <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
        {(formikProps) => (
          <EditApplicationForm {...formikProps} {...this.props} initialApplication={application} />
        )}
      </Formik>
    );
  }
}

export const editApplicationModal = createModalLauncher((props: EditApplicationModalProps) => (
  <EditApplicationModal {...props} />
));
