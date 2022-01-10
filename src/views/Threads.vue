<script setup lang="ts">
import CreateThread from '@/components/Threads/CreateThread.vue';
import { useThreads } from '@/lib/threads';
import { useProfile } from '@/lib/user';
import { onMounted } from 'vue';
import ThreadCard from '@/components/Threads/ThreadCard.vue';
// import { ref } from 'vue';

const { userState } = useProfile();

const { fetchThreads, threads } = useThreads();
onMounted(fetchThreads);
</script>
<template>
  <div>
    <create-thread v-if="userState.is" />

    <div class="flex-col space-y-2 my-4">
      <thread-card v-for="thread in threads" :key="thread.when" :thread="thread" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
