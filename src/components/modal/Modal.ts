import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as views from './wml/modal';

/**
 * Modal
 */
export class Modal extends AbstractWidget {

    view = new views.Modal(this);

    /**
     * close the modal.
     */
    close(): void {

        let m = <Node>this.view.findById('modal');

        m.parentNode.removeChild(m);

    }

    place(e: HTMLElement) {

        while (e.firstChild != null)
            e.removeChild(e.firstChild);

        e.appendChild(this.render());

    }

}

/**
 * Header
 */
export class Header extends AbstractWidget {

    view = new views.Header(this);

}

/**
 * Body
 */
export class Body extends AbstractWidget {

    view = new views.Body(this);

}

/**
 * Footer
 */
export class Footer extends AbstractWidget {

    view = new views.Footer(this);

}
