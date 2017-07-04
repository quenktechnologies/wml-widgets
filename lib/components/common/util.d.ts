import { Renderable } from '@quenk/wml/lib/runtime';
/**
 * combine the members of an array into one string.
 */
export declare const combine: (str: string[], joiner?: string) => string;
/**
 * noop
 */
export declare const noop: () => void;
/**
 * read a value from the context attributes
 */
export declare const read: (..._: any[]) => any;
/**
 * replaceContent
 */
export declare const replaceContent: (r: Renderable, node: Node) => void;
