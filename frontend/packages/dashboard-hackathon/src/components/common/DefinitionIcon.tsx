import * as React from 'react';
import { CardDefinition } from '../../types';

import './DefinitionIcon.scss';

type CatalogIconProps = {
  icon: CardDefinition['icon'];
};

const DefinitionIcon: React.FC<CatalogIconProps> = ({ icon }) => {
  return null;
  // const Result = React.useMemo(
  //   () => (icon == null ? null : typeof icon === 'string' ? icon : React.memo(React.lazy(icon))),
  //   [icon],
  // );

  // if (typeof Result === 'string') {
  //   return <img src={Result} alt="catalog icon" className="catalog-icon" />;
  // }

  // return <Result />;
};

export default DefinitionIcon;
