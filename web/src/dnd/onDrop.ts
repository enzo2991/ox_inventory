import { canStack, findAvailableSlot, getTargetInventory, isSlotWithItem } from '../helpers';
import { validateMove } from '../thunks/validateItems';
import { store } from '../store';
import { DragSource, DropTarget, InventoryType, SlotWithItem } from '../typings';
import { moveSlots, stackSlots, swapSlots } from '../store/inventory';
import { Items } from '../store/items';
import { fetchNui } from '../utils/fetchNui';

export const onDrop = (source: DragSource, target?: DropTarget) => {
  const { inventory: state } = store.getState();

  const { sourceInventory, targetInventory } = getTargetInventory(state, source.inventory, target?.inventory);

  const sourceSlot = sourceInventory.items[source.item.slot - 1] as SlotWithItem;

  const sourceData = Items[sourceSlot.name];

  if (sourceData === undefined) return console.error(`${sourceSlot.name} item data undefined!`);

  // If dragging from container slot
  if (sourceSlot.metadata?.container !== undefined) {
    // Prevent storing container in container
    if (targetInventory.type === InventoryType.CONTAINER)
      return console.log(`Cannot store container ${sourceSlot.name} inside another container`);

    // Prevent dragging of container slot when opened
    if (state.rightInventory.id === sourceSlot.metadata.container)
      return console.log(`Cannot move container ${sourceSlot.name} when opened`);
  }

  const targetSlot = target
    ? targetInventory.items[target.item.slot - 1]
    : findAvailableSlot(sourceSlot, sourceData, targetInventory.items);


  if (targetSlot === undefined) return console.error('Target slot undefined!');

  // If dropping on container slot when opened
  if (targetSlot.metadata?.container !== undefined && state.rightInventory.id === targetSlot.metadata.container)
    return console.log(`Cannot swap item ${sourceSlot.name} with container ${targetSlot.name} when opened`);

  if ((targetSlot?.slot === 31 && sourceSlot?.name != 'cloth_helmet' && targetInventory.type == 'player') || (sourceSlot?.slot == 31 && targetSlot?.name != 'cloth_helmet' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 32 && sourceSlot?.name != 'cloth_tshirt' && targetInventory.type == 'player') || (sourceSlot?.slot == 32 && targetSlot?.name != 'cloth_tshirt' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 33 && sourceSlot?.name != 'cloth_torso' && targetInventory.type == 'player') || (sourceSlot?.slot == 33 && targetSlot?.name != 'cloth_torso' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 34 && sourceSlot?.name != 'cloth_bproof' && targetInventory.type == 'player') || (sourceSlot?.slot == 34 && targetSlot?.name != 'cloth_bproof' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 35 && sourceSlot?.name != 'cloth_arms' && targetInventory.type == 'player') || (sourceSlot?.slot == 35 && targetSlot?.name != 'cloth_arms' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 36 && sourceSlot?.name != 'cloth_pants' && targetInventory.type == 'player') || (sourceSlot?.slot == 36 && targetSlot?.name != 'cloth_pants' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 37 && sourceSlot?.name != 'cloth_shoes' && targetInventory.type == 'player') || (sourceSlot?.slot == 37 && targetSlot?.name != 'cloth_shoes' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 38 && sourceSlot?.name != 'cloth_mask' && targetInventory.type == 'player') || (sourceSlot?.slot == 38 && targetSlot?.name != 'cloth_mask' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 39 && sourceSlot?.name != 'cloth_glasses' && targetInventory.type == 'player') || (sourceSlot?.slot == 39 && targetSlot?.name != 'cloth_glasses' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');


  if ((targetSlot?.slot === 40 && sourceSlot?.name != 'cloth_ears' && targetInventory.type == 'player') || (sourceSlot?.slot == 40 && targetSlot?.name != 'cloth_ears' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 41 && sourceSlot?.name != 'cloth_chain' && targetInventory.type == 'player') || (sourceSlot?.slot == 41 && targetSlot?.name != 'cloth_chain' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 42 && sourceSlot?.name != 'cloth_bracelets' && targetInventory.type == 'player') || (sourceSlot?.slot == 42 && targetSlot?.name != 'cloth_bracelets' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 43 && sourceSlot?.name != 'cloth_watches' && targetInventory.type == 'player') || (sourceSlot?.slot == 43 && targetSlot?.name != 'cloth_watches' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 44 && sourceSlot?.name != 'cloth_decals' && targetInventory.type == 'player') || (sourceSlot?.slot == 44 && targetSlot?.name != 'cloth_decals' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 45 && sourceSlot?.name != 'cloth_bags' && targetInventory.type == 'player') || (sourceSlot?.slot == 45 && targetSlot?.name != 'cloth_bags' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  if ((targetSlot?.slot === 46 && sourceSlot?.name != 'outfit_cloth' && targetInventory.type == 'player') || (sourceSlot?.slot == 46 && targetSlot?.name != 'outfit_cloth' && targetSlot?.name != undefined))
    return fetchNui('is_not_cloth_swap');

  const count =
    state.shiftPressed && sourceSlot.count > 1 && sourceInventory.type !== 'shop'
      ? Math.floor(sourceSlot.count / 2)
      : state.itemAmount === 0 || state.itemAmount > sourceSlot.count
      ? sourceSlot.count
      : state.itemAmount;

  const data = {
    fromSlot: sourceSlot,
    toSlot: targetSlot,
    fromType: sourceInventory.type,
    toType: targetInventory.type,
    count: count,
  };

  store.dispatch(
    validateMove({
      ...data,
      fromSlot: sourceSlot.slot,
      toSlot: targetSlot.slot,
    })
  );

  isSlotWithItem(targetSlot, true)
    ? sourceData.stack && canStack(sourceSlot, targetSlot)
      ? store.dispatch(
          stackSlots({
            ...data,
            toSlot: targetSlot,
          })
        )
      : store.dispatch(
          swapSlots({
            ...data,
            toSlot: targetSlot,
          })
        )
    : store.dispatch(moveSlots(data));
};
