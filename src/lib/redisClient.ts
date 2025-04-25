import Redis from 'ioredis';

declare global {
  // allow global `redis` on NodeJS namespace
  // eslint-disable-next-line no-var
  var _redisClient: Redis | undefined;
}

const {
  REDIS_HOST = 'default',
  REDIS_PORT = '11070',
  REDIS_USERNAME,
  REDIS_PASSWORD
} = process.env;

// parse port into a number
const port = Number.parseInt(REDIS_PORT, 10);

function createRedisClient() {
  const client = new Redis({
    host: REDIS_HOST,
    port,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    retryStrategy(times) {
      return Math.min(times * 50, 2_000);
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    connectTimeout: 10_000
    // note: removed lazyConnect so it connects immediately
  });

  client.on('connect', () => {
    console.log('[Redis] connecting…');
  });
  client.on('ready', () => {
    console.log('[Redis] ready');
  });
  client.on('error', err => {
    console.error('[Redis] error', err);
  });
  client.on('end', () => {
    console.log('[Redis] connection ended');
  });

  return client;
}

// reuse existing client if present (hot‐reload safe)
const redisClient = global._redisClient ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  global._redisClient = redisClient;
}

export default redisClient;
