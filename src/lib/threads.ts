import { ref } from 'vue';
import { gun, SEA } from './gun';

interface Thread {
  who: string;
  what: string;
  when: string;
  replies: Thread[];
}

export const threads = ref<Thread[]>([]);

export function useThreads() {
  gun.get('threads').on((data, key) => {
    if (!data) return;
    console.log(data);
  });

  // function createThread(data: string) {
  //     const enc = await SEA.
  // }
}
