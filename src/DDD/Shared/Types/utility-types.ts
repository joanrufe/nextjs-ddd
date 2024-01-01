/**
 * Omit all methods from an object/class but keep properties
 */
export type OmitMethods<T> = {
  [P in keyof T as T[P] extends Function ? never : P]: T[P];
};
