<script setup lang="ts">
import MDialog from './MDialog.vue';
import { ref } from 'vue';
import Auth from './Auth.vue';
import { useAuth, useProfile } from '@/lib/user';

const isDialog = ref(false);
const authMode = ref<'login' | 'signup'>('login');

function openDialog(type: typeof authMode.value) {
  authMode.value = type;
  isDialog.value = true;
}

const { logOut } = useAuth();

const { userState } = useProfile();
</script>
<template>
  <div class="navbar mb-2 shadow-lg bg-neutral min-h-6 text-neutral-content">
    <m-dialog v-model="isDialog">
      <auth :login="authMode === 'login'" @done="isDialog = false" />
    </m-dialog>

    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">Mizu</span>
    </div>
    <div class="flex-none space-x-2">
      <template v-if="!userState.is">
        <button class="btn btn-primary lowercase btn-xs" @click="openDialog('login')">Login</button>
        <button class="btn btn-primary lowercase btn-outline btn-xs" @click="openDialog('signup')">Signup</button>
      </template>

      <template v-else>
        <div class="text-white text-xs font-semibold" v-if="userState.profile.username">
          {{ userState.profile.username }}
        </div>
        <button class="btn btn-primary lowercase btn-xs" @click="logOut">Log out</button>
      </template>
    </div>
  </div>
</template>
