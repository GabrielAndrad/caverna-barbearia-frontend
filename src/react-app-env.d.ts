/// <reference types="react-scripts" />

declare module '*.png;*.svg'
declare module '*.mp4' {
  const src: string;
  export default src;
}