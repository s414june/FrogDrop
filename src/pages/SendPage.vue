<template>
    <div class="flex flex-col w-full h-full">
        <section class="flex justify-start absolute">
            <input type="button" value="Back"
                class="text-center cursor-pointer border-gray-400 text-gray-400 border-1 rounded-full px-3 hover:bg-gray-100"
                @click="back()" />
        </section>
        <div class="flex flex-col justify-center items-center text-blue-500">
            <article class="text-center">
                <p>Sender Code</p>
                <!-- mock code temporarily -->
                <p class="text-3xl font-bold my-2">1111</p>
            </article>
            <section class="overflow-x-auto w-full">
                <div class="flex no-wrap w-full justify-center items-center w-[1px]">
                    <template v-if="filesExtendPreview && filesExtendPreview.length > 0">
                        <div v-for="value in filesExtendPreview" :key="value.file.name"
                            class="grow bg-gray-200 rounded-md text-gray-800 p-2 mx-1 first:ms-0 last:me-0 text-center flex flex-col h-full justify-center items-center width-card relative">
                            <div class="grow flex justify-center items-center">
                                <div class="checkerboard">
                                    <img :src="value.preview" :alt="value.file.name" v-if="value.preview"
                                        class="max-h-48 mx-auto rounded-md grow" />
                                </div>
                            </div>
                            <div class="h-[50px] overflow-x-auto text-nowrap w-full">
                                <p class="font-bold">{{ value.file.name }}</p>
                                <p class="text-sm">{{ (value.file.size / 1024).toFixed(2) }} KB</p>
                            </div>
                        </div>
                    </template>
                </div>
            </section>
            <section class="mt-7 text-center">
                <!-- v-for (Receiver) -->
                <p>Receiver</p>
                <table class="mx-auto text-start">
                    <tr v-for="value, index in receivers" :key="index">
                        <td class="text-2xl font-bold p-2">#{{ index + 1 }}</td>
                        <td class="text-2xl font-bold p-2">{{ value.name }}</td>
                        <td class="p-2">
                            <button
                                class="cursor-pointer border-blue-500 text-blue-500 border-1 rounded-full px-3 hover:bg-blue-100">
                                {{ sendButtonTextData[value.sendStatus] }}
                            </button>
                        </td>
                    </tr>
                </table>
            </section>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../router';
import { useCommonStore } from '../stores/common';

interface IReceiver {
    name: string;
    id: string;
    sendStatus: 'default' | 'sending' | 'sent';
}

const commonStore = useCommonStore();

const filesExtendPreview = ref<({ file: File; preview?: string })[]>();
const screenWidth = ref(0);
const sendButtonTextData = ref({
    default: 'Send!',
    sending: 'Sending...',
    sent: 'Sent!',
});

const receivers = ref<IReceiver[]>([
    { name: '🐸 FrogUser', id: 'frog123', sendStatus: 'default' },
    { name: '🐱 CatUser', id: 'cat456', sendStatus: 'default' },
    // more receivers...
]);

const back = () => {
    router.push({ name: 'home' });
}

const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

onMounted(async () => {
    screenWidth.value = window.innerWidth;
    if (commonStore.files.length === 0) {
        router.push({ name: 'home' });
        return;
    }
    filesExtendPreview.value = await Promise.all(commonStore.files.map(async (file) => {
        let preview: string | undefined;
        if (file.type.startsWith('image/')) {
            preview = await createImagePreview(file);
        }
        return { file, preview };
    }));
});

</script>

<style scoped lang="scss">
.checkerboard {
    position: relative;
    overflow: hidden;
    width: fit-content;
    height: fit-content;

    img {
        position: relative;
        z-index: 1;
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            conic-gradient(rgba(0, 0, 0, .08) 0 25%,
                transparent 0 50%,
                rgba(0, 0, 0, .08) 0 75%,
                transparent 0);
        background-size: 16px 16px;
        pointer-events: none;
    }
}

.width-card {
    height: -webkit-fill-available;
    min-width: calc((100dvw - var(--spacing)*15)/2 - 1rem);
    max-width: calc((100dvw - var(--spacing)*15)/2 - 1rem);

    @media (min-width: 640px) {
        min-width: calc((100dvw - var(--spacing)*15)/4 - 1rem);
        max-width: calc((100dvw - var(--spacing)*15)/4 - 1rem);
    }
}
</style>