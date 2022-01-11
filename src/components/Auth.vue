<script setup lang="ts">
import { useAuth, useProfile } from '@/lib/user';
import { computed, ref } from 'vue';

defineProps<{
  login: boolean;
}>();

const emits = defineEmits<{
  (e: 'done'): void;
  (e: 'changeOp'): void;
}>();

const user = ref({
  username: '',
  password: '',
});

const errorData = ref<string | null>(null);

const { signUp, login: authLogin } = useAuth();
const { addProfileData } = useProfile();

async function loginUser(register = true) {
  const { username, password } = user.value;

  errorData.value = null;

  try {
    register ? await signUp(username, password) : await authLogin(username, password);

    emits('done');

    if (register) {
      addProfileData('username', username);
    }
  } catch (error) {
    console.log(error);
    errorData.value = error as string;
  }
}
const isFormValid = computed(() => {
  const { password, username } = user.value;

  if (!username || !password) return false;
  if (password.trim().length < 15) return false;

  return true;
});
</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="text-xl">{{ login ? 'Login' : 'Sign up' }}</div>

    <div class="alert alert-error p-2" v-if="!login">
      <div class="flex flex-col space-y-1">
        <div class="flex space-x-2 items-center">
          <i-la-info />
          Note
        </div>
        <div class="text-xs">It's a decentralised platform, so all your data is secure by default.</div>
        <div class="text-xs">Mizu is an uncensored platform and may have NSFW content.</div>
      </div>
    </div>

    <div class="alert alert-error p-2 text-xs" v-if="!!errorData">
      {{ errorData }}
    </div>

    <form class="form-control" @submit.prevent="loginUser(!login)">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-sm input-bordered input-primary"
        v-model="user.username"
      />
      <label class="label" v-if="!login">
        <span class="label-text-alt">Your username will act as your alias in the platform</span>
      </label>

      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        class="input input-sm input-bordered input-primary"
        v-model="user.password"
      />
      <label class="label" v-if="!login">
        <span class="label-text-alt">Password needs to be more than 15 character</span>
      </label>

      <div class="flex justify-between items-center mt-3">
        <div>
          <button type="button" class="btn btn-xs normal-case text-xs font-normal btn-ghost" @click="$emit('changeOp')">
            {{ login ? "Don't have an account ? Sign up" : 'Already have an account ? Login' }}
          </button>
        </div>

        <button type="submit" class="btn btn-accent btn-sm" :disabled="!isFormValid" v-if="login">Login</button>
        <button type="submit" class="btn btn-accent btn-sm" :disabled="!isFormValid" v-else>Sign up</button>
      </div>
    </form>
  </div>
</template>
