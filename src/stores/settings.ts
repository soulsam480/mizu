import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import { defineStore } from 'pinia';

export interface Settings {
  interval: NodeJS.Timer | null;
  [x: string]: any;
}

export const useSettings = defineStore('settings', {
  state: () => ({
    userSettings: useStorage<Settings>('settings', {
      interval: null,
    }),
  }),
  getters: {
    settings(state) {
      return computed(() => state.userSettings);
    },
    key(state) {
      return (key: string) => computed(() => state.userSettings[key]);
    },
  },
  actions: {
    set(key: string, val: any) {
      this.userSettings[key] = val;
    },
    remove(key: string) {
      if (!this.userSettings[key]) return;

      delete this.userSettings[key];
    },
  },
});
