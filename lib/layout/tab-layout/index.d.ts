import { View, Template, Content, Component } from '@quenk/wml';
import { WidgetAttrs } from '../../';
import { TabClickedEvent } from '../../control/tab-bar';
import { LayoutAttrs, Layout } from '../';
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
     * tabTemplate can be specified to render custom content in the tab.
     */
    tabTemplate?: (t: TabLayout) => Template;
    /**
     * contentTemplate is rendered when the tab is active.
     */
    contentTemplate: (t: TabLayout) => Template;
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
export interface TabLayoutAttrs extends LayoutAttrs {
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
export declare class TabLayout extends Component<WidgetAttrs<TabLayoutAttrs>> implements Layout {
    view: View;
    setContent: (c: Content) => TabLayout;
    removeContent: () => TabLayout;
    values: {
        root: {
            class: string;
        };
        tab: string;
        tabs: TabSpecMap;
        content: (t: TabLayout) => Template;
        onClick: (e: TabClickedEvent) => void;
    };
}
