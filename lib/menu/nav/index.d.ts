import * as wml from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export { Item } from '../item';
export { Link } from '../../content/link';
/**
 * NAV
 */
export declare const NAV = "ww-nav";
/**
 * NavAttrs
 */
export interface NavAttrs extends HTMLElementAttrs {
    /**
     * vertical indicates whether to display the nav
     * vertically or horizontally (default).
     */
    vertical?: boolean;
}
/**
 * Nav provides styling for displaying a list of anchor links.
 */
export declare class Nav extends wml.Component<WidgetAttrs<NavAttrs>> {
    view: wml.View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
