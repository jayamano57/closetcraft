import { useEffect } from 'react';
import { User } from './user.types';
import { userService } from './user.service';
import { setUser, useUserState } from '../../state/user.state';

export function useUser(): User {
  const user = useUserState();

  useEffect(() => {
    if (user.id) return;
    userService.getUser().then((user) => user && setUser(user));
  }, []);

  return user;
}
