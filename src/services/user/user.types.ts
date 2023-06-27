export interface User {
  id: string | null;
  name: string | null;
}

export interface UserService {
  getUser(): Promise<User | null>;
  createUser(user: User): Promise<void>;
  deleteUser(): Promise<void>;
}
