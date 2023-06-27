import { CameraCapturedPicture } from 'expo-camera';
import { Item } from '../item/item.types';
import { Tag } from '../tag/tag.types';

export interface Outfit {
  id: string;
  name: string;
  items: Item[];
  image: CameraCapturedPicture;
  wornCount: number;
  staple: boolean;
  occasion?: Tag[]; // Tags (casual, gym, hiking)
  description?: string;
}

export interface OutfitService {
  setOutfit(outfit: Outfit): void;
  getOutfit(outfitId: string): Promise<Outfit | null>;
  getOutfits(): Promise<Outfit[] | null>;
  deleteOutfit(outfitId: string): Promise<void>;
  staple(outfitId: string): Promise<void>;
  purge(): Promise<void>;
}
