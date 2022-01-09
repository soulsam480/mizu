import { ComponentPublicInstance, RenderFunction } from 'vue';

type Headless = typeof import('@headlessui/vue');

type Component = {
  new (...args: any[]): ComponentPublicInstance;
};

type HeadlessComponentNames = keyof {
  [K in keyof Headless as Headless[K] extends Component ? K : never]: any;
};

type HeadlessComponents = Pick<Headless, HeadlessComponentNames>;

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends HeadlessComponents {}
}

export {};
