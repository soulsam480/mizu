<script setup lang="ts">
import { globalKey } from '@/lib/events';
import { getAvatar } from '@/lib/helpers';
import { Thread, useThreads } from '@/lib/threads';
import { useProfile } from '@/lib/user';
import { useEventBus } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
  thread: Thread;
}>();

const { emit } = useEventBus(globalKey);
const threadId = computed(() => props.thread && props.thread['_']['#']);

const { useerIs, userState } = useProfile();
const { getThread, getThreadVotes, voteThread, deleteThread } = useThreads();

const authuser = () =>
  emit({
    op: {
      meta: 'login',
      type: 'auth',
    },
  });

async function handleCardOp(type: 'comment' | 'up_vote' | 'share') {
  if (!useerIs.value) return authuser();

  if (type === 'up_vote') {
    await voteThread(threadId.value);
    getThreadVotes(threadId.value);
  }

  // console.log(await getThread(props.thread['_']['#']));
}
</script>
<template>
  <div class="card lg:card-side card-compact card-bordered shadow-sm">
    <div class="card-body">
      <div class="flex mb-2 items-center justify-between">
        <div class="flex space-x-3 items-center">
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

        <div class="dropdown dropdown-left">
          <div tabindex="0" class="btn btn-ghost btn-xs">
            <i-la-ellipsis-v style="font-size: 20px" />
          </div>
          <ul tabindex="0" class="p-1 compact shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li v-if="thread.who === userState.profile.username">
              <a @click.prevent="deleteThread(threadId)" class="p-1">Delete</a>
            </li>
          </ul>
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
