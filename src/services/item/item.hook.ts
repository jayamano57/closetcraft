import { useEffect } from 'react';
import { Item } from './item.types';
import {
  setItem,
  setItems,
  useItemState,
  useItemsState,
} from '../../state/item.state';
import { itemService } from './item.service';
import { useNavigation } from '@react-navigation/native';

export function useItem(itemId: string): Item {
  const item = useItemState(itemId);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      itemService.getItem(itemId).then((item) => item && setItem(item));
    });

    return unsubscribe;
  }, []);

  return item;
}
export function useItems(): Item[] {
  const navigation = useNavigation();
  const items = useItemsState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      itemService.getItems().then((items) => items && setItems(items));
    });

    return unsubscribe;
  }, []);

  return items ?? [];
}
