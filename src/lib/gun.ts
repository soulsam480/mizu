import Gun from 'gun/gun';
import 'gun/lib/then';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/nts';
import 'gun/sea';
import 'gun/lib/unset';

export const peers = [import.meta.env.VITE_GUN];

// export const peers = ["http://localhost:4200/gun"];

/** Established Gun instance for database operations */
export const gun = Gun({
  peers,
  localStorage: false,
});

/**
 * SEA library
 * @constant SEA
 */
export { SEA } from 'gun';

/**
 * **Get a soul for any given node**
 * A wrapper for `Gun.node.soul`
 * @function soul
 */
export const soul = Gun?.node?.soul;
