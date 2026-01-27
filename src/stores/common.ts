import { defineStore } from 'pinia'

type DeviceHint = 'iPhone' | 'iPad' | 'Android' | 'Desktop' | 'Unknown'

export const useCommonStore = defineStore('common', {
    state: () => ({
        clientId: '' as string,
        displayName: '' as string,
        deviceHint: 'Unknown' as DeviceHint,
        files: [] as File[],
    }),
    getters: {
        resolvedName(state) {
            const name = state.displayName?.trim()
            return name ? name : state.clientId
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
