import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
export { Item } from './item';
export { Link } from './link';
/**
 * NAV
 */
export declare const NAV = "ww-nav";
/**
 * NavAttrs
 */
export interface NavAttrs extends StylableAttrs {
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
            class: string;
        };
    };
}
