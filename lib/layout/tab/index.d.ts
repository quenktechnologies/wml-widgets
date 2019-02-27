import * as views from './wml/tab';
import { Fun, Content, Component } from '@quenk/wml';
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
     * tabFun can be specified to render custom content in the tab.
     */
    tabFun?: (t: TabLayout) => Fun;
    /**
     * contentFun is rendered when the tab is active.
     */
    contentFun: (t: TabLayout) => Fun;
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
    active?: string;
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
    view: views.Main;
    setContent(c: Content[]): TabLayout;
    removeContent(): TabLayout;
    values: {
        root: {
            id: string;
            className: string;
            content: () => Content[];
        };
        tabs: {
            current: string;
            data: TabSpecMap;
            content: (t: TabSpec) => Content[];
            onClick: (e: TabClickedEvent) => void;
        };
    };
}
