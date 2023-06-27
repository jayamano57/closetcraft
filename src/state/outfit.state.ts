import { create } from 'zustand';
import { Outfit } from '../services/outfit/outfit.types';

export interface OutfitState {
  outfits: Outfit[];
}

const initialState: OutfitState = { outfits: [] };

const outfitsStore = create((): OutfitState => initialState);

export function useOutfitState(outfitId: string) {
  return outfitsStore((state) =>
    state.outfits.find((outfit) => outfit.id === outfitId)
  );
}

export function useOutfitsState(): Outfit[] {
  return outfitsStore((state) => state.outfits);
}

export function getOutfits(): Outfit[] {
  return outfitsStore.getState().outfits;
}

export function setOutfit(outfit: Outfit): void {
  const outfits = getOutfits();
  const outfitIndex = outfits.findIndex((t) => t?.id === outfit.id);
  outfits[outfitIndex] = outfit;
  setOutfits(outfits);
}

export function setOutfits(outfits: Outfit[]): void {
  outfitsStore.setState({ outfits });
}

export function addOutfit(outfit: Outfit): void {
  const outfits = getOutfits();
  setOutfits(outfits ? [...outfits, outfit] : [outfit]);
}
