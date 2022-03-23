import * as React from 'react';
import { Bullseye, Button, Modal, ModalVariant } from '@patternfly/react-core';

import './CatalogImage.scss';

type CatalogImageProps = {
  src: string;
};

const CatalogImage: React.FC<CatalogImageProps> = ({ src }) => {
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);

  return (
    <>
      <Button variant="link" onClick={() => setPreviewOpen(true)}>
        <img src={src} alt="catalog example" className="catalog-image" />
      </Button>
      <Modal
        variant={ModalVariant.medium}
        title="Preview"
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
      >
        <Bullseye>
          <img src={src} alt="catalog example preview" />
        </Bullseye>
      </Modal>
    </>
  );
};

export default CatalogImage;
