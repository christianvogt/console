import * as React from 'react';
import { Bullseye, Button, Split, SplitItem } from '@patternfly/react-core';
import AngleLeftIcon from '@patternfly/react-icons/dist/esm/icons/angle-left-icon';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import { CardDefinition } from '../../types';

import './CatalogImageDeck.scss';

type CatalogImageDeckProps = {
  images: CardDefinition['images'];
};

const CatalogImageDeck: React.FC<CatalogImageDeckProps> = ({ images }) => {
  const [index, setIndex] = React.useState(0);

  if (!images) return null;

  const min = 0;
  const max = images.length - 1;

  return (
    <Split className="catalog-image-deck">
      <SplitItem>
        <Bullseye>
          <Button
            isDisabled={index === min}
            variant="plain"
            onClick={(e) => {
              e.stopPropagation();
              setIndex(Math.max(min, index - 1));
            }}
          >
            <AngleLeftIcon />
          </Button>
        </Bullseye>
      </SplitItem>
      {images && images.length > 0 && (
        <SplitItem isFilled className="catalog-image-deck__image-container">
          <Bullseye>
            <img src={images[index]} alt="rotating preview" className="catalog-image-deck__image" />
          </Bullseye>
        </SplitItem>
      )}
      <SplitItem>
        <Bullseye>
          <Button
            isDisabled={index === max}
            variant="plain"
            onClick={(e) => {
              e.stopPropagation();
              setIndex(Math.min(max, index + 1));
            }}
          >
            <AngleRightIcon />
          </Button>
        </Bullseye>
      </SplitItem>
    </Split>
  );
};

export default CatalogImageDeck;
