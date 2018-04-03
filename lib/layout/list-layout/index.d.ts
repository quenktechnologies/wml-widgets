import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
export declare const LIST_LAYOUT = "ww-list-layout";
export declare const LIST_LAYOUT_ITEM = "ww-list-layout__item";
/**
 * ListLayoutAttrs
 */
export interface ListLayoutAttrs extends StylableAttrs {
}
/**
 * ListLayoutItemAttrs
 */
export interface ListLayoutItemAttrs extends StylableAttrs {
}
/**
 * ListLayoutItem
 */
export declare class ListLayoutItem extends wml.Component<WidgetAttrs<ListLayoutItemAttrs>> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export declare class ListLayout extends wml.Component<WidgetAttrs<ListLayoutAttrs>> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
