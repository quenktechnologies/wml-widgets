import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const MODAL = "ww-modal";
export declare const MODAL_POSITION = "ww-modal__position";
export declare const MODAL_CONTENT = "ww-modal__content";
export declare const MODAL_HEADER = "ww-modal__header";
export declare const MODAL_BODY = "ww-modal__body";
export declare const MODAL_FOOTER = "ww-modal__footer";
/**
 * ModalAttrs
 */
export interface ModalAttrs extends HTMLElementAttrs {
}
/**
 * Modal
 */
export declare class Modal extends Component<WidgetAttrs<ModalAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        content: {
            className: string;
        };
        position: {
            className: string;
        };
    };
    /**
     * close the modal.
     */
    close(): void;
}
/**
 * ModalHeaderAttrs
 */
export interface ModalHeaderAttrs extends HTMLElementAttrs {
}
/**
 * ModalHeader
 */
export declare class ModalHeader extends Component<WidgetAttrs<ModalHeaderAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
    };
}
/**
 * ModalBodyAttrs
 */
export interface ModalBodyAttrs extends HTMLElementAttrs {
}
/**
 * ModalBodyAttrs
 */
export declare class ModalBody extends Component<WidgetAttrs<ModalBodyAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
    };
}
/**
 * ModalFooterAttrs
 */
export interface ModalFooterAttrs extends HTMLElementAttrs {
}
/**
 * ModalFooter
 */
export declare class ModalFooter extends Component<WidgetAttrs<ModalFooterAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
    };
}
