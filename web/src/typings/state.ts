import { Inventory } from './inventory';
import { Clothes } from './clothes';
import { Slot } from './slot';

export type State = {
  leftInventory: Inventory;
  centerInventory: Clothes;
  rightInventory: Inventory;
  itemAmount: number;
  shiftPressed: boolean;
  isBusy: boolean;
  additionalMetadata: Array<{ metadata: string; value: string }>;
  history?: {
    leftInventory: Inventory;
    centerInventory: Clothes;
    rightInventory: Inventory;
  };
};
