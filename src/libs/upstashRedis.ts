import { IS_REDIS_ENABLED, REDIS_TTL } from "@/config/redis";
import {
  UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL
} from "@/config/upstashRedis";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN
});

class UpstashRedis {

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

export const myUpstashRedis = new UpstashRedis();
