import Gun from 'gun/gun';
import { ref } from 'vue';
import { gun } from './gun';
import { useProfile, user } from './user';
// import { IGunChainReference } from 'gun/types/chain';
// import { v4 as uuid } from 'uuid';

export interface Thread {
  who: string;
  what: string;
  when: number;
  replies?: Reply[];
  votes: number;
}

export interface Reply {
  _?: GunMeta;
  who: string;
  what: string;
  when: number;
}

export interface GunMeta {
  '#': string;
  '>': {
    [x: string]: any;
  };
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
      votes: 0,
    };

    const id = new Date().toISOString();

    gun.get('threads').get(id).put(thread);
  }

  async function isVoted(id: string) {
    const userPub = useerIs.value?.pub;
    console.log(userPub);

    return new Promise<boolean>((resolve, _) => {
      gun
        .get(id)
        .get('votes')
        .map((v) => (v && v.pub === userPub ? v : undefined))
        .once((vote) => {
          if (vote) resolve(true);

          resolve(false);
        });
    });
  }

  function getThreadVotes(id: string) {
    gun
      .get(id)
      .get('votes')
      .map()
      .once((data) => {
        console.log(data);
      });
  }

  return {
    createThread,
    threads,
    isVoted,
    getThreadVotes,
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
    getThread(id: string) {
      return new Promise<Thread>((resolve, reject) => {
        gun.get(id).once((data) => {
          if (!data) reject();
          resolve(data as Thread);
        });
      });
    },
    async voteThread(id: string) {
      const thread = gun.get(id);

      try {
        const voted = await isVoted(id);

        console.log(voted);

        if (!voted) {
          thread.get('votes').set(user);
        } else {
          (thread.get('votes').unset as any)(user);
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
}
