<script setup lang="ts">
import { ref } from 'vue';

import { useRelay } from '@/lib/relay';
import { useAuth, useProfile } from '@/lib/user';
import { useSettings } from '@/stores/settings';

const data = useRelay();

const user = ref({
  username: '',
  password: '',
});

const { signUp, login } = useAuth();

async function loginUser(register = true) {
  const { password, username } = user.value;
  try {
    const data = register ? await signUp(username, password) : login(username, password);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const { userState, addProfileData } = useProfile();

const newProfile = ref({
  key: '',
  value: '',
});

function add() {
  const { key, value } = newProfile.value;

  addProfileData(key, value);

  newProfile.value = {
    key: '',
    value: '',
  };
}

const store = useSettings();
</script>
<template>
  <div>Relay data</div>
  <pre> {{ data }} </pre>

  <pre
    >{{ userState }}

  </pre>
</template>
<style lang="scss" scoped></style>
