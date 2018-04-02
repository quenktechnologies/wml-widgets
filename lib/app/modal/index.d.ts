import * as wml from '@quenk/wml';
import * as views from './wml/modal';
import { Group } from '../../content/Group';
export declare const MODAL = "ww-modal";
export declare const MODAL_DIALOG = "ww-modal__dialog";
export declare const MODAL_CONTENT = "ww-modal__content";
export declare const MODAL_HEADER = "ww-modal__header";
export declare const MODAL_BODY = "ww-modal__body";
export declare const MODAL_FOOTER = "ww-modal__footer";
export interface ModalAttrs extends wml.Attrs {
    ww?: {
        class?: string;
        onClick?: (e: Event) => void;
    };
}
export interface HeaderAttrs extends wml.Attrs {
    ww?: {
        onClose?: () => void;
    };
}
export interface BodyAttrs extends wml.Attrs {
}
export interface FooterAttrs extends wml.Attrs {
}
/**
 * Modal
 */
export declare class Modal extends Group<ModalAttrs> {
    view: views.Modal;
    values: {
        id: {
            root: string;
            content: string;
        };
        class: {
            root: string;
            content: string;
            dialog: string;
        };
    };
    /**
     * close the modal.
     */
    close(): void;
}
/**
 * Header
 */
export declare class Header extends wml.Component<HeaderAttrs> {
    view: views.Header;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
    };
}
/**
 * Body
 */
export declare class Body extends Group<BodyAttrs> {
    view: views.Body;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
    };
}
/**
 * Footer
 */
export declare class Footer extends Group<FooterAttrs> {
    view: views.Footer;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
    };
}
