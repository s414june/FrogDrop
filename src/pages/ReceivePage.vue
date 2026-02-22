<template>
    <div class="flex flex-col w-full h-full">
        <section class="flex justify-start absolute">
            <input type="button" value="Back"
                class="text-center cursor-pointer border-gray-400 text-gray-400 border-1 rounded-full px-3 hover:bg-gray-100"
                @click="back()" />
        </section>
        <div class="flex flex-col justify-center items-center text-blue-500">
            <article class="text-center">
                <p>You are</p>
                <!-- mock code temporarily -->
                <p class="text-5xl font-bold my-10">#1</p>
                <p class="text-2xl font-bold">{{ commonStore.displayName }}</p>
                <p>({{ commonStore.deviceHint }})</p>
            </article>
            <section class="mt-7 text-center">
                <p :class="[result.color]">{{ result.message }}</p>
            </section>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../router';
import { useCommonStore } from '../stores/common';

const commonStore = useCommonStore();
const result = ref({
    success: false,
    message: 'Waiting for sender...',
    color: 'text-gray-400',
})

async function waitForRoom(code: string, timeoutMs = 10_000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const res = await fetch(`/api/code/${code}`);
        if (res.ok) return await res.json();
        if (res.status === 500) {
            throw new Error("Server error while checking code. Please try again.");
        }
        await new Promise(r => setTimeout(r, 800));
    }
    throw new Error("timeout_waiting_for_room");
}

const getBrowserHint = (): string => {
    const ua = navigator.userAgent
    if (ua.includes('Edg')) return 'Edge'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Firefox')) return 'Firefox'
    return ''
}


const getDeviceHint = (): string => {
    const browserHint = getBrowserHint()

    const uaData = (navigator as any).userAgentData
    if (!uaData) return fallbackFromUA()
    return uaData.platform + (browserHint ? ` · ${browserHint}` : '')
}

const fallbackFromUA = (): string => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('iphone')) return 'iPhone'
    if (ua.includes('ipad')) return 'iPad'
    if (ua.includes('android')) return 'Android'
    if (ua.includes('macintosh')) return 'MacOS'
    if (ua.includes('windows')) return 'Windows'
    if (ua.includes('linux')) return 'Linux'
    return 'Unknown'
}

const back = () => {
    router.push({ name: 'home' });
}

onMounted(async () => {
    commonStore.deviceHint = getDeviceHint();
    try {
        const res = await waitForRoom(commonStore.code);
        if (res.ok) {
            alert("Connected! Ready to receive files.");
        }
    } catch (error) {
        if (error instanceof Error && error.message === "timeout_waiting_for_room") {
            result.value = {
                success: false,
                message: "No sender found. Please try again.",
                color: 'text-red-500',
            }
        } else {
            console.error("Unexpected error:", error);
        }
    };
});
</script>

<style scoped lang="scss"></style>