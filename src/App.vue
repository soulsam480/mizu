<script setup lang="ts">
import NavBar from './components/NavBar.vue';
// import { ref } from 'vue';
</script>
<template>
  <div>
    <nav-bar />
    <router-view class="max-w-4xl mx-auto px-2 py-3" />
  </div>
</template>
<style lang="scss" scoped></style>
