import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Locale } from '../../store/locale';
import {faUser, faBagShopping, faBurger, faGun, faShirt, faCoins, faAddressCard, faScaleBalanced} from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{inventory: Inventory}> = ({ inventory}) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div>
          <div className="inventory-grid-header-wrapper">
            <div className='inventory-grid-info'>
              <p className='name'>{inventory.label && (
                <FontAwesomeIcon icon={faUser} />
              )} {inventory.label}</p>
              <div className='weight'>
                <div className='bar'>
                  {inventory.maxWeight && (
                    <p>
                      {weight / 1000} / {inventory.maxWeight / 1000} kg
                    </p>
                  )}
                  <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
                </div>
                <FontAwesomeIcon icon={faBagShopping} />
              </div>
            </div>
          </div>
        </div>
        <div className="inventory-grid-container">
          <div className='case'>
            <div className='takecase'><FontAwesomeIcon icon={faScaleBalanced}/><p>{Locale.ui_all || 'All'}</p></div>
            <div className='takecase'><FontAwesomeIcon icon={faCoins}/><p>{Locale.ui_money || 'Money'}</p></div>
            <div className='takecase'><FontAwesomeIcon icon={faBurger}/><p>{Locale.ui_food || 'Food'}</p></div>
            <div className='takecase'><FontAwesomeIcon icon={faGun}/><p>{Locale.ui_weapon || 'Weapon'}</p></div>
            <div className='takecase'><FontAwesomeIcon icon={faShirt}/><p>{Locale.ui_clothes || 'Clothes'}</p></div>
            <div className='takecase'><FontAwesomeIcon icon={faAddressCard}/><p>{Locale.ui_card || 'Card'}</p></div>
          </div>
          <div className="slot" ref={containerRef}>
              {inventory.items.slice(inventory.type === 'player' ? 5 : 0, (page + 1) * PAGE_SIZE).map((item, index) => (
                <InventorySlot
                  key={`${inventory.type}-${inventory.id}-${item.slot}`}
                  item={item}
                  ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              ))}
          </div>
        </div>
        {inventory.type === 'player' && (
          <div className="inventory-bar-wrapper">
            <div className='inventory-bar-container'>
              {inventory.items.slice(0, 5).map((item) => (
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-${item.slot}`}
                      item={item}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryGrid;
