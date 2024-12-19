import { ItemData } from '../typings/item';

export const Items: {
  [key: string]: ItemData | undefined;
} = {
  water: {
    name: 'water',
    close: false,
    label: 'VODA',
    stack: true,
    usable: true,
    count: 0,
    category: 'food'
  },
  burger: {
    name: 'burger',
    close: false,
    label: 'Burger',
    stack: false,
    usable: false,
    count: 0,
    category: 'food'
  },
};
