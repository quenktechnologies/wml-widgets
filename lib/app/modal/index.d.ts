import * as wml from '@quenk/wml';
import * as views from './wml/modal';
import { Group } from '@package/self/content/Group';
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
