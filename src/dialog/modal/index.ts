import * as views from './wml/modal';

import { View, Component } from '@quenk/wml';

import { concat, getById } from '../../util';
import { HTMLElementAttrs, getClassName, getId } from '../../';
import { AbstractLayout } from '../../layout';
import { Overlay} from '../../content/overlay';

export {Overlay}

///classNames:begin
export const MODAL = 'ww-modal';
export const MODAL_OVERLAY = 'ww-modal-overlay';
export const MODAL_HEADER = 'ww-modal__header';
export const MODAL_BODY = 'ww-modal__body';
export const MODAL_FOOTER = 'ww-modal__footer';
///classNames:end

/**
 * ModalAttrs
 */
export interface ModalAttrs extends HTMLElementAttrs { 

  /**
   * noOverlay if true will not render an overlay for the modal.
   */
  noOverlay?: boolean 

  /**
   * noAutoClose if true will not close the modal when clicks occur outside 
   * of it.
   */
  noAutoClose?:boolean 

}

/**
 * Modal
 */
export class Modal extends Component<ModalAttrs> {

  view: View = this.attrs.noOverlay ? new views.Modal(this) : new views.ModalWithOverlay(this);

    values = {

        wml: {

            id: 'root'

        },

        id: getId(this.attrs),

        className: concat(MODAL, getClassName(this.attrs)),

        overlay: {

          className: MODAL_OVERLAY,
          onClick: ()=> {

            if(this.attrs.noAutoClose) return;

            this.close();


            }

          }

    }

    /**
     * close the modal.
     */
    close(): void {

      let mOverlay = getById<Overlay>(this.view, 'overlay');
      if(mOverlay.isJust()) {
      mOverlay.get().close();
      }

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
export class ModalHeader extends AbstractLayout<ModalHeaderAttrs> {

    view: View = new views.ModalHeader(this);

    values = {

        wml: {

            id: 'root'

        },

        id: getId(this.attrs),

        className: concat(MODAL_HEADER, getClassName(this.attrs)),

        content: { wml: { id: 'root' } }

    }

}

/**
 * ModalBodyAttrs
 */
export interface ModalBodyAttrs extends HTMLElementAttrs { }

/**
 * ModalBodyAttrs
 */
export class ModalBody extends AbstractLayout<ModalBodyAttrs> {

    view: View = new views.ModalBody(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(MODAL_BODY, getClassName(this.attrs)),

        content: { wml: { id: 'root' } }

    }

}

/**
 * ModalFooterAttrs
 */
export interface ModalFooterAttrs extends HTMLElementAttrs { }

/**
 * ModalFooter
 */
export class ModalFooter extends Component<ModalFooterAttrs> {

    view: View = new views.ModalFooter(this);

    values = {

        wml: {

            id: 'root'

        },

        id: getId(this.attrs),

        className: concat(MODAL_FOOTER, getClassName(this.attrs)),

        content: { wml: { id: 'root' } }

    }

}
