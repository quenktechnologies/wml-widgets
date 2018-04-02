import * as wml from '@quenk/wml';
import { TabView } from './TabView';
export { TabView };
/**
 * TabSpec is used to render a tab and it's associated View.
 */
export interface TabSpec {
    /**
     * text to display in the tab.
     */
    text?: string;
    /**
     * tabContent can be specified to render custom content in the tab.
     */
    tabContent?: (tv: TabView) => wml.Template;
    /**
     * view rendered when the tab is active.
     */
    view: wml.Renderable;
}
/**
 * TabSpecMap provides a mapping of tab names to their respective TabSpec.
 */
export interface TabSpecMap {
    [key: string]: TabSpec;
}
/**
 * TabViewAttrs
 */
export interface TabViewAttrs extends wml.Attrs {
    ww: {
        /**
         * active tab.
         */
        active: string;
        /**
         * tabs TabSpecs to be displayed.
         */
        tabs: TabSpecMap;
    };
}
