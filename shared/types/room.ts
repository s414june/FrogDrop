interface RTCSessionDescriptionInit {
	type: "offer" | "answer" | "pranswer" | "rollback"
	sdp?: string
}

interface UserInfo {
	displayName: string
	deviceHint: string
}

interface Room {
	createdAt: number
	expiresAt?: number
	status: "waiting" | "paired" | "connected"
    
	sender?: {
		id: string
		offer?: RTCSessionDescriptionInit
		candidates?: RTCIceCandidateInit[]
		userInfo?: UserInfo
	}

	receivers?: {
		id: string
		answer?: RTCSessionDescriptionInit
		candidates?: RTCIceCandidateInit[]
		userInfo?: UserInfo
		status: "waiting" | "paired" | "connected"
	}[]
}

export type { Room }
