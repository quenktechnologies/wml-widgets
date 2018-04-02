import * as wml from '@quenk/wml';
import * as views from './wml/modal';
import { concat } from '../../util';
import { Group } from '../../content/Group';

///classNames:begin
export const MODAL = 'ww-modal';
export const MODAL_DIALOG = 'ww-modal__dialog';
export const MODAL_CONTENT = 'ww-modal__content';
export const MODAL_HEADER = 'ww-modal__header';
export const MODAL_BODY = 'ww-modal__body';
export const MODAL_FOOTER = 'ww-modal__footer';
///classNames:end

export interface ModalAttrs extends wml.Attrs {
    ww?: {
        class?: string,
        onClick?: (e: Event) => void
    }
}

export interface HeaderAttrs extends wml.Attrs {

    ww?: {

        onClose?: () => void
    }

}

export interface BodyAttrs extends wml.Attrs { }

export interface FooterAttrs extends wml.Attrs { }

/**
 * Modal
 */
export class Modal extends Group<ModalAttrs> {

    view = new views.Modal(this);

    values = {

        id: {

            root: 'root',
            content: 'content'

        },
        class: {

            root: concat(MODAL, this.attrs.ww ? this.attrs.ww.class : ''),
            content: MODAL_CONTENT,
            dialog: MODAL_DIALOG

        }

    };

    /**
     * close the modal.
     */
    close(): void {

        this
            .view
            .findById('modal')
            .map((n: Node) => n.parentNode.removeChild(n));

    }

}

/**
 * Header
 */
export class Header extends wml.Component<HeaderAttrs> {

    view = new views.Header(this);

    values = {

        id: {

            root: 'root'

        },

        class: {

            root: MODAL_HEADER

        }

    };

}

/**
 * Body
 */
export class Body extends Group<BodyAttrs> {

    view = new views.Body(this);

    values = {

        id: {

            root: 'root'

        },
        class: {

            root: MODAL_BODY

        }

    };

}

/**
 * Footer
 */
export class Footer extends Group<FooterAttrs> {

    view = new views.Footer(this);

    values = {

        id: {

            root: 'root'

        },

        class: {

            root: MODAL_FOOTER

        }

    };

}
