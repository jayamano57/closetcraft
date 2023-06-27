import { create } from 'zustand';
import { User } from '../services/user/user.types';

export type UserState = User;

const initialState: UserState = {
  id: null,
  name: null,
};

const userStore = create((): UserState => initialState);

export function useUserState() {
  return userStore((state) => state);
}

export function getUser(): UserState {
  return userStore.getState();
}

export function setUser(user: User): void {
  userStore.setState(user);
}
