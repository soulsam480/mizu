<script setup lang="ts">
// import { ref } from 'vue';

import { useRelay } from '@/lib/relay';

const data = useRelay();
</script>
<template>
  <div>Relay data</div>
  <pre> {{ data }} </pre>
</template>
<style lang="scss" scoped></style>
