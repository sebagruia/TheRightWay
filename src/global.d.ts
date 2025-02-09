declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.png' {
  export default '' as string;
}
declare module '*.svg' {
  export default '' as string;
}
declare module '*.jpeg' {
  export default '' as string;
}
declare module '*.jpg' {
  export default '' as string;
}

// declare module 'virtual:pwa-register/react' {
//   export function registerSW(options?: { immediate?: boolean }): () => void;
// }
