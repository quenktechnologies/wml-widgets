import { Component, Attrs } from '@quenk/wml-runtime';
import * as views from './wml/modal';

export interface ModalAttrs extends Attrs {
    ww?: {
        onClick?: (e: Event) => void
    }
}

export interface HeaderAttrs extends Attrs {

    ww?: {

        onClose?: () => void
    }

}

export interface BodyAttrs extends Attrs { }
export interface FooterAttrs extends Attrs { }

/**
 * Modal
 */
export class Modal extends Component<ModalAttrs> {

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
export class Header extends Component<HeaderAttrs> {

    view = new views.Header(this);

}

/**
 * Body
 */
export class Body extends Component<BodyAttrs> {

    view = new views.Body(this);

}

/**
 * Footer
 */
export class Footer extends Component<FooterAttrs> {

    view = new views.Footer(this);

}
