import { reactive } from 'vue';
import { gun } from './gun';
import { store } from './localStorage';

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
  interval: NodeJS.Timer | null;
}

export const userState = reactive<UserState>({
  is: null,
  profile: {},
  interval: store('pulse').get(),
});

user.get('alias').on(init);

function init() {
  userState.is = (user as any).is;

  userState.interval && clearInterval(userState.interval);

  userState.interval = setInterval(() => {
    gun
      .user()
      .get('pulse')
      .put(Date.now() as any);
  }, 1000);

  store('pulse').set(userState.interval);

  user.get('pulse').on((d) => {
    console.log(d);
  });

  user
    .get('profile')
    .map()
    .on((data, key) => {
      userState.profile[key] = data;
    });
}

//@ts-ignore
gun.on('auth', init);

export function useAuth() {
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
