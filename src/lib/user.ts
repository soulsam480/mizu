import { useSettings } from '@/stores/settings';
import { reactive } from 'vue';
import { gun } from './gun';

// Gun User
export const user = gun.user().recall({ sessionStorage: true });

interface GunIs {
  pub: string;
  eoub: string;
  alias: string;
}

export interface UserState {
  is: null | GunIs;
  profile: Record<string, any>;
  initiated: boolean;
}

export const userState = reactive<UserState>({
  is: null,
  profile: {},
  initiated: false,
});

user.get('alias').on(init);

function init() {
  if (userState.initiated) return;

  const settingsStore = useSettings();

  userState.is = (user as any).is;

  settingsStore.key('interval').value && clearInterval(settingsStore.key('interval').value);

  const interval = setInterval(() => {
    user.get('pulse').put(Date.now() as any);
  }, 1000);

  settingsStore.set('interval', interval);

  user.get('pulse').on((d) => {
    console.log(d);
  });

  user
    .get('profile')
    .map()
    .on((data, key) => {
      userState.profile[key] = data;
    });

  settingsStore.$subscribe((_, state) => {
    for (const [key, value] of Object.entries(state.userSettings)) {
      user.get('settings').get(key).put(value);
    }
  });

  userState.initiated = true;
}

//@ts-ignore
gun.on('auth', init);

export function useAuth() {
  const settingsStore = useSettings();

  function login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      user.auth(username, password, (dat) => {
        if ('err' in dat) return reject(dat.err);

        resolve(dat);
      });
    });
  }

  function signUp(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      user.create(username, password, (response) => {
        if ('err' in response) return reject(response.err);

        login(username, password).then(resolve);
      });
    });
  }

  function logOut() {
    user.leave();

    settingsStore.key('interval').value && clearInterval(settingsStore.key('interval').value);
    userState.is = null;
    userState.profile = {};
    userState.initiated = false;
  }

  return { login, signUp, logOut };
}

export function useProfile() {
  function addProfileData(key: string, value: string) {
    user
      .get('profile')
      .get(key)
      .put(value as any);
  }

  return { userState, addProfileData };
}
