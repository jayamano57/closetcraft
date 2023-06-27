import { useEffect } from 'react';
import { tagService } from '../services/tag/tag.service';
import { itemService } from '../services/item/item.service';
import { outfitService } from '../services/outfit/outfit.service';
import { userService } from '../services/user/user.service';

export function useStorageDelete() {
  const doStorageDelete = async () => {
    await tagService.purge();
    await itemService.purge();
    await outfitService.purge();
    await userService.deleteUser();
  };
  useEffect(() => {
    doStorageDelete();
  }, []);
}
