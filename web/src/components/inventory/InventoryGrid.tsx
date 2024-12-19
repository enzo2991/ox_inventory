import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faBagShopping, faWeightHanging, faGun, faShirt, faBurger} from '@fortawesome/free-solid-svg-icons';

const InventoryGrid: React.FC<{inventory: Inventory}> = ({ inventory }) => {
  const PAGE_SIZE = inventory.slots;
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleFilterChange = (type: string | null) => {
    setFilterType(type);
  };

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
                <FontAwesomeIcon icon={faWeightHanging} />
              </div>
            </div>
          </div>
          <div className='inventory-grid-info-context'>
              <button className={`font-button ${filterType === null ? 'button-color' : ''}`} onClick={() => handleFilterChange(null)}><FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon></button>
              <button className={`font-button ${filterType === 'weapon' ? 'button-color' : ''}`} onClick={() => handleFilterChange('weapon')}><FontAwesomeIcon icon={faGun}></FontAwesomeIcon></button>
              <button className={`font-button ${filterType === 'food' ? 'button-color' : ''}`}onClick={() => handleFilterChange('food')}><FontAwesomeIcon icon={faBurger}></FontAwesomeIcon></button>
              <button className={`font-button ${filterType === 'clothes' ? 'button-color' : ''}`} onClick={() => handleFilterChange('clothes')}><FontAwesomeIcon icon={faShirt}></FontAwesomeIcon></button>
          </div>
          <div className="inventory-grid-container">
            <div className="slot" ref={containerRef}>
                {inventory.items.slice(inventory.type === 'player' ? 5 : 0, (page + 1) * PAGE_SIZE)
                .filter((item) => {
                  if (inventory.type === 'player') {
                    if (item.slot >= 30 && item.slot <= 46) {
                      return false;
                    }
                    return true;
                  }
                  return true;
                })
                .map((item, index) => (
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-${item.slot}`}
                    item={item}
                    filterType={filterType}
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
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                ))}
              </div>
            </div>
          )}
      </div>
      {inventory.type === 'player' && (
        <div className='inventory-grid-wrapper'>
          <div className="inventory-clothing-container">
              <div className='inventory-clothing-top'>
              <div className='slot-container'>
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-top-44`}
                    item={inventory.items[44]}
                    filterType={null}
                    inventoryType={inventory.type}
                    inventoryGroups={inventory.groups}
                    inventoryId={inventory.id}
                    />
                </div>
                <div className='slot-container'>
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-top-45`}
                    item={inventory.items[45]}
                    filterType={null}
                    inventoryType={inventory.type}
                    inventoryGroups={inventory.groups}
                    inventoryId={inventory.id}
                    />
                </div>
              </div>
              <div className='inventory-clothing-middle'>
                <div className='slot-container'>
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-30`}
                      item={inventory.items[30]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-31`}
                      item={inventory.items[31]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-32`}
                      item={inventory.items[32]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-33`}
                      item={inventory.items[33]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-34`}
                      item={inventory.items[34]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-35`}
                      item={inventory.items[35]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-top-36`}
                      item={inventory.items[36]}
                      filterType={null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                </div>
                <div className='slot-container'>
                    <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-37`}
                        item={inventory.items[37]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-38`}
                        item={inventory.items[38]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-39`}
                        item={inventory.items[39]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-40`}
                        item={inventory.items[40]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-41`}
                        item={inventory.items[41]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-42`}
                        item={inventory.items[42]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-top-43`}
                        item={inventory.items[43]}
                        filterType={null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                      />
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default InventoryGrid;
