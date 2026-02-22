import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectRedis } from "../_lib/redis.ts";

const redis = connectRedis();

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: "missing_code" });
        }

        const key = `room:${code}`;

        // 檢查是否已存在（避免撞號）
        const exists = await redis.exists(key);

        if (exists) {
            return res.status(409).json({ error: "room_exists" });
        }

        // 建立房間（TTL 120 秒）
        await redis.set(
            key,
            {
                status: "waiting",
                createdAt: Date.now(),
            },
            { ex: 120 }
        );

        return res.status(200).json({
            ok: true,
            code,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "server_error" });
    }
}