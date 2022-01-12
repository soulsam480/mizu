// import Gun from 'gun/gun';
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

// const match = {
//   // lexical queries are kind of like a limited RegEx or Glob.
//   '.': {
//     // property selector
//     '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
//   },
//   '-': 1, // filter in reverse
// };

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

  async function isVoted(id: string) {
    const userPub = useerIs.value?.pub;

    return new Promise<boolean>((resolve, _) => {
      gun
        .get(id)
        .get(`votes/${userPub}`)
        .once((vote) => {
          console.log('vote', vote);

          if (vote) resolve(true);

          resolve(false);
        });
    });
  }

  function getThreadVotes(id: string, subscribe = false) {
    const threadVotes = gun.get(id).get('votes');

    if (subscribe) {
      threadVotes.on((data) => {
        console.log(data);
      });
    } else {
      threadVotes.once((data) => {
        console.log(data);
      });
    }
  }

  function fetchThreads() {
    //TODO: make better queries
    // .get(match)
    gun
      .get('threads')
      .map()
      .once((data) => {
        if (!data) return;

        threads.value.push(data);
      });
  }

  function getThread(id: string) {
    return new Promise<Thread>((resolve, reject) => {
      gun.get(id).once((data) => {
        if (!data) reject();
        resolve(data as Thread);
      });
    });
  }
  return {
    createThread,
    threads,
    isVoted,
    getThreadVotes,
    fetchThreads,
    getThread,
    async voteThread(id: string) {
      const thread = gun.get(id);
      const userPub = useerIs.value?.pub;

      const voted = await isVoted(id);

      if (!voted) {
        thread.get(`votes/${userPub}`).put(user);
      } else {
        thread.get(`votes/${userPub}`).put(null as any);
      }
    },
    async deleteThread(id: string) {
      console.log(id);

      try {
        const data = await getThread(id);
        console.log(data);

        gun.get(id).put(null);

        fetchThreads();
      } catch (error) {}
    },
  };
}
