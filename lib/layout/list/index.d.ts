import { View } from '@quenk/wml';
import { Activate } from '../../content/state/active';
import { LayoutAttrs, AbstractLayout } from '../';
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
    /**
     * name of the item.
     */
    name?: string;
    /**
     * active highlight.
     */
    active: boolean;
    /**
     * onClick handler.
     */
    onClick?: (name: string) => void;
}
/**
 * ListLayoutItem
 */
export declare class ListLayoutItem extends AbstractLayout<ListLayoutItemAttrs> implements Activate {
    view: View;
    values: {
        content: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            name: string;
            onclick: () => void;
        };
    };
    isActive(): boolean;
    activate(): ListLayoutItem;
    deactivate(): ListLayoutItem;
    toggleActive(): ListLayoutItem;
}
/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export declare class ListLayout extends AbstractLayout<ListLayoutAttrs> {
    view: View;
    values: {
        content: {
            wml: {
                id: string;
            };
            id: string | undefined;
            className: string;
        };
    };
}
