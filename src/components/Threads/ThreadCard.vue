<script setup lang="ts">
// import { ref } from 'vue';

import { Thread } from '@/lib/threads';

defineProps<{
  thread: Thread;
}>();
</script>
<template>
  <div class="card lg:card-side card-compact card-bordered shadow-sm">
    <div class="card-body">
      <p class="text-lg">{{ thread.who }}</p>
      <span class="text-2xs mb-2">{{ new Date(thread.when).toDateString() }}</span>
      <h2 class="text-sm">
        {{ thread.what }}
      </h2>
      <!-- <div class="card-actions">
        <button class="btn btn-primary">Get Started</button>
        <button class="btn btn-ghost">More info</button>
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
