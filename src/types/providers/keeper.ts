export type IKeeperProvider = {
  save(key: string, value: unknown): Promise<void>;
  remove(key: string): Promise<void>;
  find(key: string): Promise<string | null>;
};
