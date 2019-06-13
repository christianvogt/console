import * as React from 'react';
import { Helmet } from 'react-helmet';
import ODCEmptyState from './EmptyState';
import NamespaceAppPage from './NamespaceAppPage';

const AddPage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>+Add</title>
    </Helmet>
    <NamespaceAppPage>
      <ODCEmptyState title="+Add" />
    </NamespaceAppPage>
  </React.Fragment>
);

export default AddPage;
