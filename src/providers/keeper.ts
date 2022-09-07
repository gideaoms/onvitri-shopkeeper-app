import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureException } from '@sentry/react-native';
import { IKeeperProvider } from '@/types/providers/keeper';

export function KeeperProvider(): IKeeperProvider {
  async function find(key: string) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (err) {
      captureException(err);
      throw err;
    }
  }

  async function remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      captureException(err);
      throw err;
    }
  }

  async function save(key: string, token: string) {
    try {
      await AsyncStorage.setItem(key, token);
    } catch (err) {
      captureException(err);
      throw err;
    }
  }

  return {
    find: find,
    remove: remove,
    save: save,
  };
}

KeeperProvider.KEY_TOKEN = '@onvitri/token';

KeeperProvider.KEY_STORE = '@onvitri/store';
