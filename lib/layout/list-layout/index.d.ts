import { View } from '@quenk/wml';
import { LayoutAttrs, GenericLayout } from '../';
export declare const LIST_LAYOUT = "ww-list-layout";
export declare const LIST_LAYOUT_ITEM = "ww-list-layout__item";
/**
 * ListLayoutAttrs
 */
export interface ListLayoutAttrs extends LayoutAttrs {
}
/**
 * ListLayoutItemAttrs
 */
export interface ListLayoutItemAttrs extends LayoutAttrs {
}
/**
 * ListLayoutItem
 */
export declare class ListLayoutItem extends GenericLayout<ListLayoutItemAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export declare class ListLayout extends GenericLayout<ListLayoutAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
