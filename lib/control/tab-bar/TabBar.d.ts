import { Component, Attrs, View } from '@quenk/wml';
/**
 * TabBarAttrs
 */
export interface TabBarAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export declare class TabBar extends Component<TabBarAttrs> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
