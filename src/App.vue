<template>
  <main class="h-screen flex flex-col bg-white">
    <header class="p-2 bg-blue-500">
      <p class="text-white">FrogDrop</p>
    </header>
    <section class="flex flex-col justify-center items-center grow p-2">
      <div class="flex flex-col justify-center items-center rounded-md p-2 w-full">
        <label for="Nickname" class="text-blue-500">Nickname</label>
        <input v-model="commonStore.displayName" id="Nickname" type="text" placeholder="Enter Nickname" max="30"
          class="text-center border-1 border-blue-300 rounded-md p-2 m-2 text-blue-500" :readonly="receiving"
          @focus="(e) => (e.currentTarget as HTMLInputElement)?.select()" />
      </div>
      <div class="grow justify-center items-center flex w-full border-2 border-dashed border-blue-300 rounded-md p-4">
        <router-view />
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useCommonStore } from './stores/common';
import { useRoute } from 'vue-router';

const commonStore = useCommonStore();
const route = useRoute();

const receiving = computed(() => {
  return route.name === 'receive';
});

watch(
  () => commonStore.displayName,
  (newValue) => {
    if (newValue.length === 0) {
      commonStore.displayName = '🐸 FrogDrop Player';
    }
  }
);
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
