import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectRedis } from "../_lib/redis.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const redis = connectRedis();
    try {
        if (req.method !== "GET") {
            res.setHeader("Allow", "GET");
            return res.status(405).json({ error: "method_not_allowed" });
        }

        const code = String(req.query.code ?? "").trim();

        // 基本檢查：必須是 4 位數字（可依你需求放寬）
        if (!/^\d{4}$/.test(code)) {
            return res.status(400).json({ error: "invalid_code" });
        }

        const key = `room:${code}`;
        const room = await redis.get(key);

        if (!room) {
            return res.status(404).json({ error: "room_not_found" });
        }

        return res.status(200).json({ ok: true, code, room });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "server_error" });
    }
}