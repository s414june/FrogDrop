import { Redis } from "@upstash/redis";

export function connectRedis(params?: { url?: string; token?: string }) {
    const url = params?.url ?? process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = params?.token ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
        throw new Error("missing_env");
    }

    return new Redis({ url, token });
}