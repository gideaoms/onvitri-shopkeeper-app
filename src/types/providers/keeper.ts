export type IKeeperProvider = {
  save(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  find(key: string): Promise<string | null>;
};
