import { Outfit } from '../outfit/outfit.types';
import { storageService } from '../storage/storage.service';
import { StorageService, StorageValue } from '../storage/storage.types';
import { Item, ItemService } from './item.types';

const ITEMS_KEY = '@items';

export class ItemServiceImpl implements ItemService {
  constructor(private storageService: StorageService) {}

  private async getStorageItems(): Promise<StorageValue<Item>> {
    return (await this.storageService.get(ITEMS_KEY)) ?? {};
  }

  private async doSetItem(
    item: Item,
    storedItems: StorageValue<Item>
  ): Promise<void> {
    storedItems[item.id] = item;

    await this.storageService.set(ITEMS_KEY, storedItems);
  }

  async setItem(item: Item): Promise<void> {
    const storedItems = await this.getStorageItems();

    await this.doSetItem(item, storedItems);
  }

  async addOutfitToItems(outfit: Outfit, items: Item[]): Promise<void> {
    const storedItems = (await this.getStorageItems()) ?? {};

    items.forEach(async (item) => {
      const itemOutfits = [...item.outfits];
      const outfitExists = itemOutfits.some((fit) => fit.id === outfit.id);

      if (outfitExists) return;

      itemOutfits.push({
        id: outfit.id,
        name: outfit.name,
        image: outfit.image,
      });

      item.outfits = itemOutfits;

      storedItems[item.id] = item;
    });

    await this.storageService.set(ITEMS_KEY, storedItems);
  }

  async removeOutfitFromItems(outfitId: string): Promise<void> {
    const storedItems = await this.getStorageItems();
    Object.values(storedItems).forEach((item) => {
      item.outfits = item.outfits.filter(
        (itemOutfit) => itemOutfit.id !== outfitId
      );
    });

    await this.storageService.set(ITEMS_KEY, storedItems);
  }

  async getItem(itemId: string): Promise<Item> {
    const storedItems = await this.getStorageItems();

    return storedItems[itemId] || null;
  }

  async getItems(): Promise<Item[] | null> {
    const storedItems = await this.getStorageItems();

    const itemsObj = storedItems
      ? (Object.values(storedItems) as Item[])
      : null;

    return itemsObj;
  }

  async deleteItem(itemId: string): Promise<void> {
    const storedItems = await this.getStorageItems();
    delete storedItems[itemId];

    await this.storageService.set(ITEMS_KEY, storedItems);
  }

  async staple(itemId: string): Promise<void> {
    const storedItems = await this.getStorageItems();
    storedItems[itemId].staple = !storedItems[itemId].staple;

    await this.storageService.set(ITEMS_KEY, storedItems);
  }

  async purge() {
    await this.storageService.delete(ITEMS_KEY);
  }
}

export const itemService = new ItemServiceImpl(storageService);
