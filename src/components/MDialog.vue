<script setup lang="ts">
defineProps<{
  modelValue?: boolean;
  title?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();
</script>
<template>
  <div>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" @close="$emit('update:modelValue', false)">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-md p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-base-100 shadow-xl rounded-md"
              >
                <DialogTitle v-if="title" as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ title }}
                </DialogTitle>
                <slot />
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
