import * as wml from '@quenk/wml';
import { TabClickedEvent } from '../../control/tab-bar';
import { TabViewAttrs, TabSpecMap } from '.';
/**
 * TabView provides a layout whose displayed content can be changed via tabs.
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
export declare class TabView extends wml.Component<TabViewAttrs> {
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
