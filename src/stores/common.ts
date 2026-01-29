import { defineStore } from 'pinia'
import { ref } from 'vue'

type DeviceHint = 'iPhone' | 'iPad' | 'Android' | 'Desktop' | 'Unknown'

export const useCommonStore = defineStore('common', () => {
    const displayName = ref<string>('🐸 FrogDrop Player')
    const deviceHint = ref<DeviceHint>('Unknown')
    const code = ref<string>('')
    const files = ref<File[]>([])

    return {
        displayName,
        deviceHint,
        files,
        code,
    }
}, {
    persist: [
        {
            pick: ['displayName', 'deviceHint'],
            storage: localStorage,
        },
        {
            pick: ['files']
        }
    ]
})
