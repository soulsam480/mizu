import { ref } from 'vue';
import { gun, SEA } from './gun';
import { useProfile } from './user';

interface Thread {
  who: string;
  what: string;
  when: number;
  replies?: Reply[];
}

interface Reply {
  who: string;
  what: string;
  when: number;
}

export const threads = ref<Thread[]>([]);

const match = {
  // lexical queries are kind of like a limited RegEx or Glob.
  '.': {
    // property selector
    '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
  },
  '-': 1, // filter in reverse
};

export function useThreads() {
  const { useerIs, userState } = useProfile();

  function createThread(data: string) {
    if (!useerIs.value) return;

    const thread: Thread = {
      what: data,
      when: Date.now(),
      who: userState.profile.username,
    };

    const id = new Date().toISOString();

    gun.get('threads').get(id).put(thread);
  }

  return {
    createThread,
    threads,
    fetchThreads() {
      gun
        .get('threads')
        //TODO: make better queries
        // .get(match)
        .map()
        .once((data) => {
          if (!data) return;
          threads.value.push(data);
        });
    },
  };
}
