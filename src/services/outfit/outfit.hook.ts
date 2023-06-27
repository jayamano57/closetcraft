import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Outfit } from './outfit.types';
import { outfitService } from './outfit.service';
import {
  setOutfit,
  setOutfits,
  useOutfitState,
  useOutfitsState,
} from '../../state/outfit.state';

export function useOutfit(outfitId: string): Outfit {
  const outfit = useOutfitState(outfitId);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      outfitService
        .getOutfit(outfitId)
        .then((outfit) => outfit && setOutfit(outfit));
    });

    return unsubscribe;
  }, []);

  return outfit;
}
export function useOutfits(): Outfit[] {
  const navigation = useNavigation();
  const outfits = useOutfitsState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      outfitService
        .getOutfits()
        .then((outfits) => outfits && setOutfits(outfits));
    });

    return unsubscribe;
  }, []);

  return outfits ?? [];
}
