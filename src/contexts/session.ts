import zustand from 'zustand';
import immer from 'immer';
import { User } from '@/types/user';

export const useSession = zustand<{
  isLoading: boolean;
  user: User | null;
  setIsLoading(isLoading: boolean): void;
  setUser(user: User | null): void;
}>((set) => ({
  isLoading: true,
  user: null,
  setIsLoading: (isLoading) =>
    set((context) =>
      immer(context, (draft) => {
        draft.isLoading = isLoading;
      }),
    ),
  setUser: (user) =>
    set((context) =>
      immer(context, (draft) => {
        draft.user = user;
      }),
    ),
}));
