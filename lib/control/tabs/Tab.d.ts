import { TabClickedEvent } from './TabClickedEvent';
import { Component, Attrs, View } from '@quenk/wml';
/**
 * TabAttrs
 */
export interface TabAttrs extends Attrs {
    ww: {
        name?: string;
        class?: string;
        active?: boolean;
        text?: string;
        onClick?: (e: TabClickedEvent) => void;
    };
}
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export declare class Tab extends Component<TabAttrs> {
    view: View;
    values: {
        id: {
            root: string;
            a: string;
        };
        class: {
            li: string;
        };
    };
    clicked: (e: Event) => void;
    /**
     * click this Tab
     */
    click(): void;
}
