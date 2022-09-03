import AsyncStorage from '@react-native-async-storage/async-storage';
import { IKeeperProvider } from '@/types/providers/keeper';

export function KeeperProvider(): IKeeperProvider {
  function find(key: string) {
    return AsyncStorage.getItem(key);
  }

  function remove(key: string) {
    return AsyncStorage.removeItem(key);
  }

  function save(key: string, token: string) {
    return AsyncStorage.setItem(key, token);
  }

  return {
    find: find,
    remove: remove,
    save: save,
  };
}

KeeperProvider.KEY_TOKEN = '@onvitri/token';
