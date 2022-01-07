import { gun, peers } from './gun';
import { computed, reactive, watch } from 'vue';

const relay = reactive({
  peer: peers[0],
  host: new URL(peers[0]).hostname,
  status: 'offline',
  started: 0,
  pulse: 0,
  lag: 0,
  diff: computed(() => relay.pulse - relay.started),
  delay: computed(() => Date.now() - relay.pulse),
  blink: false,
});

watch(
  () => relay.pulse,
  (next, prev) => {
    relay.blink = !relay.blink;
    relay.lag = next - prev - 500;
  },
);

export function useRelay() {
  if (relay.pulse == 0) {
    gun
      .get(relay.host)
      .map()
      .on((d, k) => {
        relay[k] = d;
      });
  }

  return relay;
}
