import * as wml from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const HORIZONTAL_LAYOUT = "ww-horizontal-layout";
/**
 * HorizontalLayoutOrientation
 */
export declare enum HorizontalLayoutOrientation {
    Left = "left",
    Right = "right"
}
/**
 * HorizontalLayoutAttrs
 */
export interface HorizontalLayoutAttrs extends HTMLElementAttrs {
    /**
     * orientation of the items in the layout.
     * Either left or right
     */
    orientation?: HorizontalLayoutOrientation;
}
/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
export declare class HorizontalLayout extends wml.Component<WidgetAttrs<HorizontalLayoutAttrs>> {
    view: wml.View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
