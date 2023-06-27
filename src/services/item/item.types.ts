import { Tag } from '../tag/tag.types';
import { CameraCapturedPicture } from 'expo-camera';
import { Outfit } from '../outfit/outfit.types';

export enum ItemPosition {
  HEAD,
  TOP,
  BOTTOM,
  // FULL, // instead, we will have UI that lets you minimize the body part
  FEET,
}

export interface Item {
  id: string;
  name: string;
  image: CameraCapturedPicture;
  position: ItemPosition;
  wornCount: number;
  staple: boolean;
  type?: Tag[]; // Tags (shirt, pants, shoes, jacket)
  description?: string;
  outfits: Pick<Outfit, 'id' | 'name' | 'image'>[];
}

export interface ItemService {
  setItem(item: Item): void;
  getItem(itemId: string): Promise<Item | null>;
  getItems(): Promise<Item[] | null>;
  deleteItem(itemId: string): Promise<void>;
  staple(itemId: string): Promise<void>;
  addOutfitToItems(outfit: Outfit, items: Item[]): Promise<void>;
  removeOutfitFromItems(outfitId: string): Promise<void>;
  purge(): Promise<void>;
}
