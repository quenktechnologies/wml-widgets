import * as views from './wml/tab';

import { View, Content, Component } from '@quenk/wml';
import { text } from '@quenk/wml/lib/dom';
import { fromNullable } from '@quenk/noni/lib/data/maybe';
import { concat } from '../../util';
import { getId, getClassName } from '../../';
import { TabClickedEvent } from '../../control/tab-bar';
import { LAYOUT, LayoutAttrs, Layout } from '../';

///classNames:begin
export const TAB_LAYOUT = 'ww-tab-layout';
///classNames:end

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
    tabFun?: (t: TabLayout) => View;

    /**
     * contentFun is rendered when the tab is active.
     */
    contentFun: (t: TabLayout) => View;
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
export class TabLayout extends Component<TabLayoutAttrs> implements Layout {
    view: views.Main = new views.Main(this);

    setContent(c: Content[]): TabLayout {
        this.values.root.content = () => c;
        this.view.invalidate();
        return this;
    }

    removeContent(): TabLayout {
        this.values.root.content = () => [];
        this.view.invalidate();
        return this;
    }

    values = {
        root: {
            id: getId(this.attrs),

            className: concat(TAB_LAYOUT, LAYOUT, getClassName(this.attrs)),

            content: (): Content[] => {
                if (this.attrs && this.attrs.active) {
                    let maybeActive = fromNullable<TabSpec>(
                        this.values.tabs.data[this.attrs.active]
                    );

                    if (maybeActive.isJust())
                        return [maybeActive.get().contentFun(this).render()];
                }

                return this.children;
            }
        },

        tabs: {
            current: this.attrs && this.attrs.active ? this.attrs.active : '',

            data: this.attrs && this.attrs.tabs ? this.attrs.tabs : {},

            content: (t: TabSpec): Content[] => {
                if (t.tabFun) return [t.tabFun(this).render()];

                if (t.text) return [text(t.text)];

                return [];
            },

            onClick: (e: TabClickedEvent) => {
                if (this.values.tabs.current !== e.name)
                    this.values.tabs.current = e.name;

                let tab = fromNullable<TabSpec>(
                    this.values.tabs.data[e.name]
                ).get();

                this.values.root.content = () => [
                    tab.contentFun(this).render()
                ];

                this.view.invalidate();
            }
        }
    };
}
