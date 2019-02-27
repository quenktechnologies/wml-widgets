/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */
/** imports */
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { View, Renderable, WMLElement } from '@quenk/wml';
/**
 * getById retreives an WMLElement from a view by its id.
 *
 * If the WMLElement is not found a warning is logged to console.
 */
export declare const getById: <E extends WMLElement>(view: View, id: string) => Maybe<E>;
/**
 * warn via console that an element is missing.
 */
export declare const warnMissing: (view: View, id: string) => void;
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
export declare const replaceContent: (r: Renderable, node: Node) => void;
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
export declare const debounce: <A>(f: (a: A) => void, delay: number) => (a: A) => void;
