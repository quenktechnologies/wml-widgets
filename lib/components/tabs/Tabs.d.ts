import { Component, Attrs } from '@quenk/wml-runtime';
import { TabView, TabsView } from './wml/tabs';
export interface TabAttrs extends Attrs {
    ww?: {
        active?: boolean;
        text?: string;
    };
}
export interface TabsAttrs extends Attrs {
}
/**
 * Tab
 */
export declare class Tab extends Component<TabAttrs> {
    view: TabView<this>;
    /**
     * click this Tab
     */
    click(): void;
    clicked(e: Event): void;
}
/**
 * Tabs
 */
export declare class Tabs extends Component<TabsAttrs> {
    view: TabsView<this>;
}
