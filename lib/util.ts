/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */

/** imports */
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { View, Renderable, WMLElement, } from '@quenk/wml';

/**
 * getById retreives an WMLElement from a view by its id.
 *
 * If the WMLElement is not found a warning is logged to console.
 */
export const getById = <E extends WMLElement>(view: View, id: string)
    : Maybe<E> => {

    let m: Maybe<E> = view.findById(id);

    if (m.isNothing()) {

        warnMissing(view, id);

    }

    return m;

}

/**
 * warn via console that an element is missing.
 */
export const warnMissing = (view: View, id: string) => {

    console.warn('The view ', view, ` does not have an id "${id}"!`);

}

/**
 * combine the members of an array into one string.
 */
export const combine = (str: string[], joiner: string = ' ') =>
    str.filter(s => ((s != null) || s != '')).join(joiner);

/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
export const concat = (...str: (string | undefined)[]): string =>
    str.filter(s => ((s == null) || (s == '')) ? false : true)
        .map(s => (<string>s).trim()).join(' ');

/**
 * noop 
 */
export const noop = () => { };

/**
 * replaceContent 
 */
export const replaceContent = (r: Renderable, node: Node) => {

    while (node.lastChild)
        node.removeChild(node.lastChild);

    node.appendChild(<Node>r.render());

}

/**
 * debounce a function so that it is only called once after 
 * a period of time.
 */
export const debounce = <A>(f: (a: A) => void, delay: number) => {

    let timer: number = -1;

    return delay === 0 ? f : (a: A) => {

        if (timer === -1) {
            timer = window.setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = window.setTimeout(() => f(a), delay);
        }
    }

}
