import * as wml from '@quenk/wml';
/**
 * Cell wraps around a <td> to provide an easier to use api.
 */
export declare class Cell {
    element: HTMLElement;
    constructor(element: HTMLElement);
    /**
     * setContent chanages the content of the Cell's <td> element.
     */
    setContent(r: wml.Renderable): Cell;
}
