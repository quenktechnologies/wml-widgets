import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
import { TabClickedEvent } from '../../control/tab-bar';
export declare const TAB_LAYOUT = "ww-tab-layout";
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
    tabContent?: (tv: TabLayout) => wml.Template;
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
 * TabLayoutAttrs
 */
export interface TabLayoutAttrs extends StylableAttrs {
    /**
     * active tab.
     */
    active: string;
    /**
     * tabs TabSpecs to be displayed.
     */
    tabs: TabSpecMap;
}
/**
 * TabLayout provides a layout whose displayed content can be changed via tabs.
 *
 * ----------------------------------------------------------------------------
 * |                                                                          |
 * | Tab1  |  Tab2  | Tab2                                                    |
 * |                                                                          |
 * ----------------------------------------------------------------------------
 * |                                                                          |
 * |                                                                          |
 * |                             <Content>                                    |
 * |                                                                          |
 * |                                                                          |
 * |                                                                          |
 * |                                                                          |
 * |__________________________________________________________________________|
 */
export declare class TabLayout extends wml.Component<WidgetAttrs<TabLayoutAttrs>> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
        tab: string;
        tabs: TabSpecMap;
        content: wml.Content;
        onClick: (e: TabClickedEvent) => void;
    };
}
