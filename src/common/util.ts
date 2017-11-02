import { Renderable } from '@quenk/wml-runtime';

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
export const concat = (...str: string[]) =>
    str.filter(s => ((s != null) || s != '')).join(' ');

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

    node.appendChild(r.render());

}

/**
 * debounce a function so that it is only called once after 
 * a period of time.
 */
export const debounce = <A>(f: (a: A) => void, delay: number) => {

    let timer: number = null;

    return delay === 0 ? f : (a: A) => {

        if (!timer) {
            timer = setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => f(a), delay);
        }
    }

}
