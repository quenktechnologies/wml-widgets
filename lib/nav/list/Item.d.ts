import * as wml from '@quenk/wml';
import { ItemClickedEvent } from './ItemClickedEvent';
export interface Attrs extends wml.Attrs {
    ww?: {
        name?: string;
        active?: boolean;
        text?: string;
        onClick?: (e: ItemClickedEvent) => void;
    };
}
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
export declare class Item extends wml.Component<Attrs> {
    view: wml.View;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
        text: string;
    };
    /**
     * activate this nav list Item.
     */
    activate(): void;
    /**
     * inactivate this nav list item.
     */
    inactivate(): void;
}
