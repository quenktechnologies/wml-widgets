import * as views from './wml/breadcrumbs';
import { Component, Attrs } from '@quenk/wml';
export interface ItemAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * Item for breadcrumb lists.
 */
export declare class Item extends Component<ItemAttrs> {
    view: views.Item;
    values: {
        class: {
            root: string;
        };
    };
}
