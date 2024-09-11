import { MyCustomGlobal } from "./classes";

declare global {
  interface Dictionary<T = any> {
    [key: string]: T;
  }
}
