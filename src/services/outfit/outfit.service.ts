import { itemService } from '../item/item.service';
import { ItemService } from '../item/item.types';
import { storageService } from '../storage/storage.service';
import { StorageService, StorageValue } from '../storage/storage.types';
import { Outfit, OutfitService } from './outfit.types';

const OUTFITS_KEY = '@outfits';

export class OutfitServiceImpl implements OutfitService {
  constructor(
    private storageService: StorageService,
    private itemService: ItemService
  ) {}

  private async getStorageOutfits(): Promise<StorageValue<Outfit>> {
    return (await this.storageService.get(OUTFITS_KEY)) ?? {};
  }

  private async doSetOutfit(
    outfit: Outfit,
    storedOutfits: StorageValue<Outfit>
  ): Promise<void> {
    storedOutfits[outfit.id] = outfit;
    await this.storageService.set(OUTFITS_KEY, storedOutfits);
  }

  async setOutfit(outfit: Outfit): Promise<void> {
    const storedOutfits = await this.getStorageOutfits();
    await this.doSetOutfit(outfit, storedOutfits);
  }

  async getOutfit(outfitId: string): Promise<Outfit | null> {
    const outfits = await this.getStorageOutfits();

    return outfits[outfitId] || null;
  }

  async getOutfits(): Promise<Outfit[] | null> {
    const storedOutfits = await this.getStorageOutfits();
    return storedOutfits ? Object.values(storedOutfits) : null;
  }

  async deleteOutfit(outfitId: string): Promise<void> {
    const storedOutfits = await this.getStorageOutfits();
    delete storedOutfits[outfitId];

    await this.storageService.set(OUTFITS_KEY, storedOutfits);
    await this.itemService.removeOutfitFromItems(outfitId);
  }

  async staple(outfitId: string): Promise<void> {
    const storedOutfits = await this.getStorageOutfits();
    storedOutfits[outfitId].staple = !storedOutfits[outfitId].staple;

    await this.storageService.set(OUTFITS_KEY, storedOutfits);
  }

  async purge() {
    await this.storageService.delete(OUTFITS_KEY);
  }
}

export const outfitService = new OutfitServiceImpl(storageService, itemService);
