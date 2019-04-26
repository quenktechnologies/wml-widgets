import * as views from './wml/modal';
import { View, Component } from '@quenk/wml';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, WidgetAttrs, getClassName, getId } from '../../';

///classNames:begin
export const MODAL = 'ww-modal';
export const MODAL_POSITION = 'ww-modal__position';
export const MODAL_CONTENT = 'ww-modal__content';
export const MODAL_HEADER = 'ww-modal__header';
export const MODAL_BODY = 'ww-modal__body';
export const MODAL_FOOTER = 'ww-modal__footer';
///classNames:end

/**
 * ModalAttrs
 */
export interface ModalAttrs extends HTMLElementAttrs { }

/**
 * Modal
 */
export class Modal extends Component<WidgetAttrs<ModalAttrs>> {

    view: View = new views.Modal(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(MODAL, getClassName(this.attrs)),

        content: {

            className: MODAL_CONTENT

        },

      position: {

        className: MODAL_POSITION

      }

    }

    /**
     * close the modal.
     */
    close(): void {

        let mO = getById<HTMLElement>(this.view, this.values.wml.id);

        if (mO.isJust()) {

            let n = mO.get();

            if (n.parentNode)
                n.parentNode.removeChild(n);

        }

    }

}

/**
 * ModalHeaderAttrs
 */
export interface ModalHeaderAttrs extends HTMLElementAttrs { }

/**
 * ModalHeader
 */
export class ModalHeader extends Component<WidgetAttrs<ModalHeaderAttrs>> {

    view: View = new views.ModalHeader(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(MODAL_HEADER, getClassName(this.attrs)),

    }

}

/**
 * ModalBodyAttrs
 */
export interface ModalBodyAttrs extends HTMLElementAttrs { }

/**
 * ModalBodyAttrs
 */
export class ModalBody extends Component<WidgetAttrs<ModalBodyAttrs>> {

    view: View = new views.ModalBody(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(MODAL_BODY, getClassName(this.attrs)),

    }

}

/**
 * ModalFooterAttrs
 */
export interface ModalFooterAttrs extends HTMLElementAttrs { }

/**
 * ModalFooter
 */
export class ModalFooter extends Component<WidgetAttrs<ModalFooterAttrs>> {

    view: View = new views.ModalFooter(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(MODAL_FOOTER, getClassName(this.attrs)),

    }

}
