import type { VercelResponse } from "@vercel/node";
import { connectRedis } from "./_lib/redis.js";

export default async function handler(res: VercelResponse) {
    const redis = connectRedis();
    const result = await redis.get("item");

    return res.status(200).json({ result });
}