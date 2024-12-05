import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Clothes } from '../../typings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHatCowboy,
    faMask,
    faGlasses,
    faHeadphones,
    faTshirt,
    faClock,
    faHand,
    faVest,
    faShoePrints,
    faStickyNote,
    faBagShopping,
    faRing,
  } from '@fortawesome/free-solid-svg-icons';

const InventoryClothes: React.FC<{ inventory: Clothes }> = ({ inventory }) => {
    const clothingLeftItems = [
        { id: 'hat', icon: faHatCowboy },
        { id: 'torso', icon: faTshirt },
        { id: 'vest', icon: faVest },
        { id: 'bag', icon: faBagShopping },
        { id: 'pants', icon: faStickyNote },
        { id: 'shoes', icon: faShoePrints },

    ];
    const clothingRightItems = [
        { id: 'mask',icon: faMask },
        { id: 'glasses', icon: faGlasses },
        { id: 'ears', icon: faHeadphones },
        { id: 'bracelet', icon: faHand },
        { id: 'watch', icon: faClock },
        { id: 'accessory',icon: faRing },
    ];
    return(
    <>
    <div className="inventory-clothes-container">
        <div className="inventory-clothes-grid">
            {clothingLeftItems.map((item) => (
                <div key={item.id} className="clothing-item">
                    <FontAwesomeIcon icon={item.icon} />
                </div>
            ))}
        </div>
        <div className="inventory-clothes-grid">
            {clothingRightItems.map((item) => (
                <div key={item.id} className="clothing-item">
                    <FontAwesomeIcon icon={item.icon} />
                </div>
            ))}
        </div>
    </div>
    </>
    )
};
export default InventoryClothes;