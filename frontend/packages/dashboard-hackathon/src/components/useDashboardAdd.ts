import { DashboardContextProps } from '../utils/DashboardContext';
import { CardConfig } from '../types';

export const getRandomChars = (len = 6): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '')
    .substr(1, len);
};

const useDashboardAdd = (
  editCard: DashboardContextProps['editCard'],
): DashboardContextProps['addCard'] => {
  return (cardType, cardDefaults, onCardAdded) => {
    let newConfig: CardConfig = {
      data: {},
      id: `cardType-${getRandomChars()}`,
      ...cardDefaults,
      type: cardType,
    };
    editCard(newConfig, onCardAdded);
  };
};

export default useDashboardAdd;
