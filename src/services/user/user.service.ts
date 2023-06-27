import { storageService } from '../storage/storage.service';
import { StorageService } from '../storage/storage.types';
import { User, UserService } from './user.types';

const USER_KEY = '@user';

class UserServiceImpl implements UserService {
  constructor(private storageService: StorageService) {}

  async getUser(): Promise<User | null> {
    const user = await this.storageService.get<User>(USER_KEY);
    return user || null;
  }

  async createUser(user: User): Promise<void> {
    this.storageService.set(USER_KEY, user);
  }

  async deleteUser(): Promise<void> {
    this.storageService.delete(USER_KEY);
  }
}

export const userService = new UserServiceImpl(storageService);
