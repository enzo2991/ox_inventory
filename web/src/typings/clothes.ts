import { Slot } from './slot';

export enum clothesType {
  CLOTHES = 'clothes',
  CONTAINER = 'container',
}

export type Clothes = {
  id: string;
  type: string;
  slots: number;
  items: Slot[];
  maxWeight?: number;
  label?: string;
  groups?: Record<string, number>;
};