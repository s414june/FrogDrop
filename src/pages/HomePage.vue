<template>
    <div class="flex flex-col w-full">
        <section class="flex justify-center">
            <input ref="fileInputRef" :value="fileInput" id="FileInput" type="file" multiple class="hidden"
                @change="onFileChange"></input>
            <input type="button" value="Select for Send"
                class="text-xl text-center cursor-pointer border-blue-500 text-blue-500 border-1 m-2 rounded-full px-3 hover:bg-blue-100"
                @click="fileInputRef?.click()" />
        </section>
        <div class="flex w-full justify-center items-center">
            <hr class="text-blue-300 my-5 grow">
            <span class="text-blue-500 mx-2">Or</span>
            <hr class="text-blue-300 my-5 grow">
        </div>
        <section class="flex flex-col justify-center items-center">
            <input v-model="code" id="Code" type="text" placeholder="Enter code" maxlength="4" pattern="^[0-9]{4}$"
                class="text-center text-2xl border-1 border-blue-400 rounded-md p-2 m-2 text-blue-500 my-6" />
            <button
                class="text-xl cursor-pointer border-blue-500 text-blue-500 border-1 m-2 rounded-full px-3 hover:bg-blue-100">
                {{ receiveButtonText }}
            </button>
            <p :class="result.color">{{ result.message }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useCommonStore } from '../stores/common';

const commonStore = useCommonStore();
const fileInputRef = ref<HTMLInputElement>(null!);
const fileInput = ref<FileList | null>(null);
const code = ref('');
const receiveButtonText = ref('Start!');
const result = ref({
    success: false,
    message: '',
    color: 'green',
})

const onFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    commonStore.files = files ? Array.from(files) : [];
    router.push({ name: 'send' });
}
</script>