import * as wml from '@quenk/wml';
import { Activatable, Activate, Deactivate } from '../../state/active';
import { WidgetAttrs, StylableAttrs } from '../../../';
/**
 * ITEM
 */
export declare const ITEM = "ww-item";
/**
 * ItemAttrs
 */
export interface ItemAttrs extends StylableAttrs {
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
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
export declare class Item extends wml.Component<WidgetAttrs<ItemAttrs>> implements Activatable {
    view: wml.View;
    activate: Activate<Item>;
    deactivate: Deactivate<Item>;
    values: {
        root: {
            id: string;
            class: string;
        };
        content: {
            render: () => string | wml.Content[];
        };
    };
}
