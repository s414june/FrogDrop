import { defineStore } from 'pinia'

type DeviceHint = 'iPhone' | 'iPad' | 'Android' | 'Desktop' | 'Unknown'

export const useCommonStore = defineStore('common', {
    state: () => ({
        clientId: '' as string,
        displayName: '' as string,
        fallbackName: '' as string,   // 👈 動物名
        deviceHint: 'Unknown' as DeviceHint,
    }),
    getters: {
        resolvedName(state) {
            const name = state.displayName?.trim()
            return name ? name : state.fallbackName
        },
    },
    actions: {
        init() {
            // generate clientId / fallbackName / deviceHint if missing
        },
        setDisplayName(name: string) {
            this.displayName = name
        },
    },
    persist: {
        pick: ['displayName'],
    },
})
