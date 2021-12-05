import asyncRedis = require("async-redis");

const client = asyncRedis.createClient({
  url: <string>process.env.REDIS_URI
});

// istanbul ignore next
client.on('connect', () => {
  console.log('Redis client connected!!!');
});

// istanbul ignore next
client.on('error', err => {
  console.log('Redis client connection failed!!!', err);
  process.exit(1);
});

const KEY_PREFIX = 'Data_V1_';

const makeKey = (key: string): string => `${KEY_PREFIX}${key}`;

export interface ICacheService {
  storeKey: string;
  defaultTtl: number;

  getObject(key: string): Promise<any>;

  setObject(key: string, data: any, ttl?: number): Promise<boolean>;

  removeKey(key: string): Promise<boolean>;
}

class CacheService implements ICacheService {

  storeKey: string;
  defaultTtl: number;

  constructor(store: string, ttl: number) {
    this.storeKey = makeKey(store);
    this.defaultTtl = ttl;
  }


  async getObject(key: string): Promise<any> {
    const data = await client.hget(this.storeKey, key);
    if (data) {
      const result = JSON.parse(`${data}`);
      if (result.expiry && result.expiry > Date.now()) {
        return result.data;
      }
    }

    return null;
  }


  async setObject(key: string, data: any, ttl?: number): Promise<boolean> {
    const expiry = Date.now() + (ttl ? ttl : this.defaultTtl);
    const storeData = { expiry, data };
    return client.hset(this.storeKey, key, JSON.stringify(storeData));
  }

  async removeKey(key: string): Promise<boolean> {
    return client.hdel(this.storeKey, key);
  }
}

export const cacheService = {
  getStore(key: string, ttl: number = 30000): ICacheService {
    return new CacheService(key, ttl);
  }
};
