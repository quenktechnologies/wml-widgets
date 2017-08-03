import { Component, Attrs } from '@quenk/wml-runtime';
import * as views from './wml/modal';
export interface ModalAttrs extends Attrs {
    ww?: {
        onClick?: (e: Event) => void;
    };
}
export interface HeaderAttrs extends Attrs {
    ww?: {
        onClose?: () => void;
    };
}
export interface BodyAttrs extends Attrs {
}
export interface FooterAttrs extends Attrs {
}
/**
 * Modal
 */
export declare class Modal extends Component<ModalAttrs> {
    view: views.Modal<this>;
    /**
     * close the modal.
     */
    close(): void;
    place(e: HTMLElement): void;
}
/**
 * Header
 */
export declare class Header extends Component<HeaderAttrs> {
    view: views.Header<this>;
}
/**
 * Body
 */
export declare class Body extends Component<BodyAttrs> {
    view: views.Body<this>;
}
/**
 * Footer
 */
export declare class Footer extends Component<FooterAttrs> {
    view: views.Footer<this>;
}
