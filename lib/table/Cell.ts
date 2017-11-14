import * as wml from '@quenk/wml';
/**
 * Cell wraps around a <td> to provide an easier to use api.
 */
export class Cell {

    constructor(public element: HTMLElement) { }

    /**
     * setContent chanages the content of the Cell's <td> element.
     */
    setContent(r: wml.Renderable): Cell {

        while (this.element.lastChild)
            this.element.removeChild(this.element.lastChild);

        this.element.appendChild(r.render());

        return this;

    }



}
