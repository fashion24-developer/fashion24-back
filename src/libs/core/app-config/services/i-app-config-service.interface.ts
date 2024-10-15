export interface IAppConfigService<Key extends string> {
  get: <T extends string | number>(key: Key) => T;

  getList: (...keys: Key[]) => (string | number)[];

  getAll: () => (string | number)[];

  getAllMap: () => Record<Key, string | number>;

  isLocal: () => boolean;

  isDevelopment: () => boolean;

  isProduction: () => boolean;
}
