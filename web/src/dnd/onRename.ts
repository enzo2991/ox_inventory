import { fetchNui } from '../utils/fetchNui';
import { Slot } from '../typings';

export const onRename = (item: Slot) => {
  fetchNui('renameItem', item.slot);
};
