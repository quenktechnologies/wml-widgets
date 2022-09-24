import { Component, View } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
export declare const BREADCRUMB_MENU = "ww-breadcrumb-menu";
export { Item } from '../item';
export { Link } from '../../content/link';
/**
 * Breadcrumb
 */
export interface BreadcrumbAttrs extends HTMLElementAttrs {
}
/**
 * BreadcrumbMenu
 */
export declare class BreadcrumbMenu extends Component<BreadcrumbAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
