<script setup lang="ts">
import CreateThread from '@/components/Threads/CreateThread.vue';
import { useThreads } from '@/lib/threads';
import { useProfile } from '@/lib/user';
import { onMounted } from 'vue';
// import { ref } from 'vue';

const { userState } = useProfile();

const { fetchThreads, threads } = useThreads();
onMounted(fetchThreads);
</script>
<template>
  <div>
    <create-thread v-if="userState.is" />
    <pre>
      {{ threads }}
    </pre>
  </div>
</template>
<style lang="scss" scoped></style>
