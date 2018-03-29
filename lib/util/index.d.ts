import * as wml from '@quenk/wml';
/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */
/**
 * combine the members of an array into one string.
 */
export declare const combine: (str: string[], joiner?: string) => string;
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
export declare const concat: (...str: string[]) => string;
/**
 * noop
 */
export declare const noop: () => void;
/**
 * replaceContent
 */
export declare const replaceContent: (r: wml.Renderable, node: Node) => void;
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
export declare const debounce: <A>(f: (a: A) => void, delay: number) => (a: A) => void;
