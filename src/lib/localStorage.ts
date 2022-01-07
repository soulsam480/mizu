export function store(key: string) {
  return {
    get: () => (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) as any)) || null,
    set: (val: any) => localStorage.setItem(key, JSON.stringify(val)),
  };
}
