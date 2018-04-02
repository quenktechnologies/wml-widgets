import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../..';
/**
 * NAV_HEADER
 */
export declare const NAV_HEADER = "ww-nav-header";
/**
 * NavHeaderAttrs
 */
export interface NavHeaderAttrs extends StylableAttrs {
    /**
     * text allows the text of the header to be specified.
     */
    text?: string;
}
/**
 * NavHeader can be used to display non-clickable heading text in a nav list.
 */
export declare class NavHeader extends wml.Component<WidgetAttrs<NavHeaderAttrs>> {
    view: wml.View;
    values: {
        item: {
            class: string;
        };
        span: {
            class: string;
        };
        text: string;
    };
}
