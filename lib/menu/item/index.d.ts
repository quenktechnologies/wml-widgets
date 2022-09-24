import * as wml from '@quenk/wml';
import { Activate } from '../../content/state/active';
import { HTMLElementAttrs } from '../../';
export declare const ITEM = "ww-menu-item";
export declare const DIVIDER = "ww-menu-divider";
/**
 * ItemAttrs
 */
export interface ItemAttrs extends HTMLElementAttrs {
    /**
     * name of the Item
     */
    name?: string;
    /**
     * active state of the Item
     */
    active?: boolean;
    /**
     * text can be specified to display textual content in the link.
     */
    text?: string;
    /**
     * onClick is applied when the Item is clicked.
     */
    onClick?: (e: ItemClickedEvent) => void;
}
/**
 * ItemClickedEvent is fired when the user clicks on an item in
 * a nav list.
 */
export declare class ItemClickedEvent {
    name: string;
    constructor(name: string);
}
/**
 * Divider is used to add a horizontal line in place of an item to siginify a
 * new section.
 */
export declare class Divider extends wml.Component<HTMLElementAttrs> {
    view: wml.View;
    values: {
        className: string;
    };
}
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
export declare class Item extends wml.Component<ItemAttrs> implements Activate {
    view: wml.View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            content: {
                render: () => wml.Content[];
            };
        };
    };
    activate(): Item;
    deactivate(): Item;
}
