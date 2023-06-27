import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';
import { StorageService } from './storage.types';

class StorageServiceImpl implements StorageService {
  constructor(private storageProvider: AsyncStorageStatic) {}

  async get<T>(key: string): Promise<T | null> {
    const item = await this.storageProvider.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set(key: string, value: any): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.storageProvider.setItem(key, jsonValue);
  }

  async delete(key: string): Promise<void> {
    await this.storageProvider.removeItem(key);
  }
}

export const storageService = new StorageServiceImpl(AsyncStorage);
