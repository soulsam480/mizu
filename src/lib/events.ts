import { EventBusKey } from '@vueuse/core';

interface OpMeta {
  type: 'auth';
  meta: 'login' | 'signup';
}

export const globalKey: EventBusKey<{ op: OpMeta }> = Symbol();
