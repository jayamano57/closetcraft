export interface StorageValue<T> {
  [key: string]: T;
}

export interface StorageService {
  get<T>(key: string): Promise<T | null>;
  set: (key: string, value: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
}
