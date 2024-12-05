import InventoryClothes from './InventoryClothes';
import { useAppSelector } from '../../store';
import { selectCenterInventory } from '../../store/inventory';

const CenterInventory: React.FC = () => {
    const centerInventory = useAppSelector(selectCenterInventory);
    
    return (<InventoryClothes inventory={centerInventory}/>);
}
export default CenterInventory;