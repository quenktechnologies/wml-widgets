import { Renderable } from '@quenk/wml/lib/runtime';

/**
 * combine the members of an array into one string.
 */
export const combine = (str: string[], joiner: string = ' ') => str.join(joiner);

/**
 * noop 
 */
export const noop = () => { };

/**
 * read a value from the context attributes
 */
export const read = function(..._) { return this.attributes.read.apply(this.attributes, arguments); }

/**
 * replaceContent 
 */
export const replaceContent = (r: Renderable, node: Node) => {

    while (node.lastChild)
        node.removeChild(node.lastChild);

    node.appendChild(r.render());

}


