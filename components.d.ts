import { ComponentPublicInstance } from 'vue';

type Ant = typeof import('ant-design-vue');

type Component = {
  new (...args: any[]): ComponentPublicInstance;
};

type AntComponentNames = keyof {
  [K in keyof Ant as Ant[K] extends Component ? K : never]: any;
};
type AntComponents = Pick<Ant, AntComponentNames>;

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends AntComponents {}
}

export {};
