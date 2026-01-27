<template>
    <div class="flex flex-col w-full h-full">
        <section class="flex justify-center">
            <input type="button" value="Back"
                class="text-xl text-center cursor-pointer border-blue-500 text-blue-500 border-1 m-2 rounded-full px-3 hover:bg-blue-100"
                @click="back()" />
        </section>
        <div class="flex flex-col justify-center items-center text-blue-500">
            <article class="text-center my-2">
                <p>Sender Code</p>
                <!-- mock code temporarily -->
                <p class="text-3xl font-bold my-2">1111</p>
            </article>
            <section class="flex no-wrap overflow-x-auto w-full justify-start items-center">
                <template v-if="filesExtendPreview && filesExtendPreview.length > 0">
                    <div v-for="value in filesExtendPreview" :key="value.file.name"
                        class="bg-gray-200 rounded-md text-gray-800 p-2 m-2 w-3/4 text-center flex flex-col h-full justify-center items-center">
                        <div class="checkerboard">
                            <img :src="value.preview" :alt="value.file.name" v-if="value.preview"
                                class="max-h-48 mx-auto rounded-md grow" />
                        </div>
                        <p class="font-bold">{{ value.file.name }}</p>
                        <p class="text-sm">{{ (value.file.size / 1024).toFixed(2) }} KB</p>
                    </div>
                </template>
            </section>
            <section>
                <!-- v-for (Receiver) -->
                Receiver
            </section>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../router';
import { useCommonStore } from '../stores/common';

const commonStore = useCommonStore();

const filesExtendPreview = ref<({ file: File; preview?: string })[]>();

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
</style>