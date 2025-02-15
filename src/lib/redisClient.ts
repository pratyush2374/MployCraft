import { Redis } from 'ioredis';

class RedisClient {
    private static instance: Redis | null = null;

    public static getInstance(): Redis {
        if (typeof window !== 'undefined') {
            throw new Error('RedisClient is only available on the server side');
        }

        if (!RedisClient.instance) {
            RedisClient.instance = new Redis({
                username: process.env.REDIS_USERNAME,
                password: process.env.REDIS_PASSWORD,
                host: process.env.REDIS_HOST,
                port: 14258,
                retryStrategy(times) {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                connectTimeout: 10000,
                lazyConnect: true,
            });

            RedisClient.instance.on("connect", () => {
                console.log("Redis client connected");
            });

            RedisClient.instance.on("error", (err) => {
                console.error("Redis Client Error:", err);
            });

            RedisClient.instance.on("ready", () => {
                console.log("Redis client ready");
            });

            RedisClient.instance.on("end", () => {
                console.log("Redis client connection ended");
            });
        }

        return RedisClient.instance;
    }
}

// For Next.js, we declare the client outside of any React components
declare global {
    var redis: Redis | undefined;
}

const redisClient = global.redis || RedisClient.getInstance();

if (process.env.NODE_ENV !== 'production') {
    global.redis = redisClient;
}

export default redisClient;