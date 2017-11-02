import { Attrs, Component } from '@quenk/wml';
import * as names from '@package/self/common/names';

export interface Values {

    id: {

        /**
         * target to add or remove modifier classes to.
         */
        target: string

    }

}

/**
 * Collapsable is an abstract api for creating widgets that show or hide
 * content when the user interacts with them.
 */
export class Collapsable<A extends Attrs> extends Component<A>  {

    values: Values

    /**
     * open this Widget.
     */
    open(): void {

        this.view.findById<HTMLElement>(this.values.id.target)
            .map(e => e.classList.add(names.OPEN));

    }

    /**
     * close this Widget.
     */
    close(): void {

        this.view.findById<HTMLElement>(this.values.id.target)
            .map(e => e.classList.remove(names.OPEN));

    }

    /**
     * toggle between open and close.
     */
    toggle(): void {

        this.view.findById<HTMLElement>(this.values.id.target)
            .map(e => e.classList.toggle(names.OPEN));

    }

}
