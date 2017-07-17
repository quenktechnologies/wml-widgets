import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as views from './wml/modal';
/**
 * Modal
 */
export declare class Modal extends AbstractWidget {
    view: views.Modal;
    place(e: HTMLElement): void;
}
/**
 * Header
 */
export declare class Header extends AbstractWidget {
    view: views.Header;
}
/**
 * Body
 */
export declare class Body extends AbstractWidget {
    view: views.Body;
}
/**
 * Footer
 */
export declare class Footer extends AbstractWidget {
    view: views.Footer;
}
