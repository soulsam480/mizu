<script setup lang="ts">
import { useThreads } from '@/lib/threads';
import { ref } from 'vue';

const post = ref('');
const { createThread } = useThreads();
</script>
<template>
  <form class="form-control flex-col space-y-2 flex-grow" @submit.prevent="createThread(post)">
    <label class="label">
      <span class="label-text">Start a thread</span>
    </label>
    <textarea class="textarea h-24 textarea-bordered" placeholder="Thread" v-model="post"></textarea>

    <div class="flex justify-end">
      <button type="submit" class="btn btn-accent btn-sm" :disabled="!post">Create</button>
    </div>
  </form>
</template>
