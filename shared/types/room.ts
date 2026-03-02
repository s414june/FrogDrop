interface RTCSessionDescriptionInit {
    type: "offer" | "answer" | "pranswer" | "rollback";
    sdp?: string;
}

interface userInfo {
    displayName: string;
    deviceHint: string;
}

interface Room {
    createdAt: number;
    status: "waiting" | "paired" | "connected";

    sender?: {
        id: string;
        offer?: RTCSessionDescriptionInit;
        candidates?: any[];
        userInfo?: userInfo;
    };

    receiver?: {
        id: string;
        answer?: RTCSessionDescriptionInit;
        candidates?: any[];
        userInfo?: userInfo;
    }[];
};

export type { Room };