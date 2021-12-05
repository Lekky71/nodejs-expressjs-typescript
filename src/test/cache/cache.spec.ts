describe('Caching service tests', () => {
  const mockAndSetData = async (overrides?: any) => {
    jest.doMock('async-redis', () => ({
      createClient: jest.fn().mockReturnValue({
        on: jest.fn(),
        hget: jest.fn(),
        hset: jest.fn(),
        hdel: jest.fn(),
        ...(overrides || {}),
      }),
    }));

    return (await import('../../services/cacheService')).cacheService;
  };

  afterEach(() => {
    jest.resetModules();
  });

  describe('Getting cached objects', () => {
    test('Key not in cache', async () => {
      const cacheService = await mockAndSetData();
      const cache = cacheService.getStore('somekey', 1);
      const data = await cache.getObject('somekey');
      expect(data).toEqual(null);
    });

    test('Key expired in cache', async () => {
      const cacheService = await mockAndSetData({
        hget: jest.fn().mockResolvedValue(`{ "expiry": "${Date.now() - 1000}" }`),
      });

      const cache = cacheService.getStore('somekey', 1);
      const data = await cache.getObject('somekey');
      expect(data).toEqual(null);
    });

    test('Key exists in cache', async () => {
      const cacheService = await mockAndSetData({
        hget: jest.fn().mockResolvedValue(`{ "expiry": "${Date.now() + 10000}", "data": "somevalue" }`),
      });

      const cache = cacheService.getStore('somekey', 1);
      const data = await cache.getObject('somekey');
      expect(data).toEqual('somevalue');
    });
  });

  describe('Setting cached objects', () => {
    test('Sets cache key and data', async () => {
      const hset = jest.fn().mockReturnValue(true);
      const cacheService = await mockAndSetData({
        hset,
      });
      const cacheKey = 'somekey';
      const cacheData = { test: 1 };
      const cacheTtl = 5000;
      const storeKey = 'Data_V1_somekey';
      const dateNow = 1597700790356;

      Date.now = jest.fn().mockReturnValue(dateNow);

      const cache = cacheService.getStore(cacheKey);
      const setObj = await cache.setObject(cacheKey, cacheData, cacheTtl);

      expect(cache.storeKey).toEqual(storeKey);
      expect(cache.defaultTtl).toEqual(30000);
      expect(hset).toHaveBeenCalledWith(storeKey, cacheKey, `{"expiry":${dateNow + cacheTtl},"data":{"test":1}}`);
      expect(setObj).toEqual(true);
    });

    test('Sets cache key and data (Use detault TTL)', async () => {
      const hset = jest.fn().mockReturnValue(true);
      const cacheService = await mockAndSetData({
        hset,
      });
      const cacheKey = 'somekey';
      const cacheData = { test: 1 };
      const defaultTtl = 10000;
      const storeKey = 'Data_V1_somekey';
      const dateNow = 1597700790356;
      const cache = cacheService.getStore(cacheKey, defaultTtl);
      const setObj = await cache.setObject(cacheKey, cacheData);

      expect(cache.defaultTtl).toEqual(defaultTtl);
      expect(hset).toHaveBeenCalledWith(storeKey, cacheKey, `{"expiry":${dateNow + defaultTtl},"data":{"test":1}}`);
      expect(setObj).toEqual(true);
    });
  });

  describe('Remove cache objects', () => {
    test('Removes cached data by key', async () => {
      const hdel = jest.fn().mockReturnValue(true);
      const cacheService = await mockAndSetData({
        hdel,
      });
      const cacheKey = 'somekey';
      const storeKey = 'Data_V1_somekey';
      const cache = cacheService.getStore(cacheKey, 1000);
      const removeObj = await cache.removeKey(cacheKey);

      expect(hdel).toHaveBeenCalledWith(storeKey, cacheKey);
      expect(removeObj).toEqual(true);
    });
  });
});
