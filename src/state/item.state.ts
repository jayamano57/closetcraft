import { create } from 'zustand';
import { Item } from '../services/item/item.types';

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = { items: [] };

const itemsStore = create((): ItemsState => initialState);

export function useItemState(itemId: string) {
  return itemsStore((state) => state.items.find((item) => item.id === itemId));
}

export function useItemsState() {
  return itemsStore((state) => state.items);
}

export function getItem(itemId: string): Item {
  return itemsStore.getState().items.find((item) => item.id === itemId);
}

export function getItems(): Item[] {
  return itemsStore.getState().items;
}

export function setItem(item: Item): void {
  const items = getItems();
  const itemIndex = items.findIndex((t) => t.id === item.id);
  items[itemIndex] = item;
  setItems(items);
}

export function setItems(items: Item[]): void {
  itemsStore.setState({ items });
}

export function addItem(item: Item): void {
  const items = getItems();
  setItems(items ? [...items, item] : [item]);
}
