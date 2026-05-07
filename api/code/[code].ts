import type { VercelRequest, VercelResponse } from "@vercel/node"
import { connectRedis } from "../_lib/redis.js"
import type { Room } from "../../shared/types/room.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const allowedMethods = ["GET"]
	try {
		const code = String(req.query?.code ?? "").trim()

		// 基本檢查：必須是 4 位數字（可依你需求放寬）
		if (!/^\d{4}$/.test(code)) {
			return res.status(400).json({ error: "invalid_code" })
		}

		if (!allowedMethods.includes(req.method ?? "")) {
			res.setHeader("Allow", allowedMethods.join(", "))
			return res.status(405).json({ error: "method_not_allowed" })
		}

		if (req.method === "GET") {
			const room = await getRoomInfo(code)
			if (!room) {
				return res.status(404).json({ error: "room_not_found" })
			}
			return res.status(200).json({ ok: true, code, room })
		}
		if (req.method === "POST") {
			const { room } = req.body
			if (!room) {
				return res.status(400).json({ error: "missing_room_data" })
			}
			await setRoomInfo(code, room)
			return res.status(200).json({ ok: true })
		}

		return res.status(400).json({ error: "bad_request" })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: "server_error" })
	}
}

//get room info by code
async function getRoomInfo(code: string) {
	const redis = connectRedis()
	const key = `room:${code}`
	const room = await redis.get(key)
	return room
}

//set room info by code
async function setRoomInfo(code: string, room: Room) {
	const redis = connectRedis()
	const key = `room:${code}`
	await redis.set(key, room, { ex: 120 })
}
