import { REDIS_HOST, REDIS_PORT, IS_REDIS_ENABLED, REDIS_TTL } from "@/config/redis";
import Redis from "ioredis";

export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

class MyRedis {
  TTL = REDIS_TTL;

  async setData(key: string, value: any) {
    if (IS_REDIS_ENABLED) {
      await redis.set(key, value);
      await redis.expire(key, REDIS_TTL);
    }
  }

  async getData(key: string) {
    if (IS_REDIS_ENABLED) {
      return redis.get(key);
    }
  }
}

export const myRedis = new MyRedis();
