<script setup lang="ts">
// import { ref } from 'vue';

import { globalKey } from '@/lib/events';
import { getAvatar } from '@/lib/helpers';
import { Thread } from '@/lib/threads';
import { useProfile } from '@/lib/user';
import { useEventBus } from '@vueuse/core';

defineProps<{
  thread: Thread;
}>();

const { emit } = useEventBus(globalKey);

const { useerIs } = useProfile();

const authuser = () =>
  emit({
    op: {
      meta: 'login',
      type: 'auth',
    },
  });

function handleCardOp(type: 'comment' | 'up_vote' | 'share') {
  if (!useerIs.value) return authuser();
}
</script>
<template>
  <div class="card lg:card-side card-compact card-bordered shadow-sm">
    <div class="card-body">
      <div class="flex space-x-3 mb-2 items-center">
        <div class="avatar">
          <div class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-9 h-9">
            <img :src="getAvatar(thread.who)" />
          </div>
        </div>
        <div>
          <p class="text-sm">{{ thread.who }}</p>
          <span class="text-2xs mb-2">{{ new Date(thread.when).toDateString() }}</span>
        </div>
      </div>

      <h2 class="text-lg">
        {{ thread.what }}
      </h2>
      <div class="card-actions !mt-2">
        <button class="btn btn-xs btn-primary normal-case flex space-x-1" @click="handleCardOp('up_vote')">
          <i-la-thumbs-up />
          <span>up vote</span>
        </button>

        <button class="btn btn-xs btn-secondary normal-case flex space-x-1" @click="handleCardOp('comment')">
          <i-la-comment />
          <span>comment</span>
        </button>

        <button class="btn btn-xs btn-accent normal-case flex space-x-1" @click="handleCardOp('share')">
          <i-la-share />
          <span>share</span>
        </button>
      </div>
    </div>
  </div>
</template>
