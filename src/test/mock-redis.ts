jest.doMock('async-redis', () => ({
  createClient: jest.fn().mockReturnValue({
    on: jest.fn(),
    hget: jest.fn(),
    hset: jest.fn(),
    hdel: jest.fn(),
  }),
}));
