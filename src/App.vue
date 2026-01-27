<template>
  <main class="h-screen flex flex-col bg-white">
    <header class="p-2 bg-blue-500">
      <p class="text-white">FrogDrop</p>
    </header>
    <section class="flex flex-col justify-center items-center grow p-2">
      <div class="flex flex-col justify-center items-center rounded-md p-2 w-full">
        <label for="Nickname" class="text-blue-500">Nickname</label>
        <input v-model="nickname" id="Nickname" type="text" placeholder="Enter Nickname"
          class="text-center border-1 border-blue-300 rounded-md p-2 m-2 text-blue-500"
          @focus="(e) => (e.currentTarget as HTMLInputElement)?.select()" />
      </div>
      <div class="grow justify-center items-center flex w-full border-2 border-dashed border-blue-300 rounded-md p-4">
        <router-view />
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useCommonStore } from './stores/common';

const commonStore = useCommonStore();
const nickname = commonStore.displayName;
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
