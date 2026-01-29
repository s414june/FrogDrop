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
                <p class="text-2xl font-bold my-2">{{ commonStore.displayName }}({{ commonStore.deviceHint }})</p>
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

const getDeviceHint = (): string => {
    const uaData = (navigator as any).userAgentData
    if (!uaData) return fallbackFromUA()

    const platform = uaData.platform.toLowerCase()

    if (platform.includes('iphone')) return uaData.platform
    if (platform.includes('ipad')) return uaData.platform
    if (platform.includes('android')) return uaData.platform
    if (platform.includes('mac') || platform.includes('win') || platform.includes('linux')) {
        return uaData.platform
    }

    return 'Unknown'
}

const fallbackFromUA = (): string => {
    const ua = navigator.userAgent.toLowerCase()
    return ua
}

const back = () => {
    router.push({ name: 'home' });
}

onMounted(() => {
    commonStore.deviceHint = getDeviceHint();
});
</script>

<style scoped lang="scss"></style>