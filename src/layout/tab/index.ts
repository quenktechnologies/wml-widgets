import * as views from './wml/tab';
import { Fun, Content, Component } from '@quenk/wml';
import { fromNullable } from '@quenk/noni/lib/data/maybe';
import { concat } from '../../util';
import { WidgetAttrs, textNode, getId, getClassName } from '../../';
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
    text?: string,

    /**
     * tabFun can be specified to render custom content in the tab.
     */
    tabFun?: (t: TabLayout) => Fun,

    /**
     * contentFun is rendered when the tab is active.
     */
    contentFun: (t: TabLayout) => Fun

}

/**
 * TabSpecMap provides a mapping of tab names to their respective TabSpec.
 */
export interface TabSpecMap {

    [key: string]: TabSpec

}

/**
 * TabLayoutAttrs
 */
export interface TabLayoutAttrs extends LayoutAttrs {

    /**
     * active tab.
     */
    active?: string,

    /**
     * tabs TabSpecs to be displayed.
     */
    tabs: TabSpecMap

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
export class TabLayout extends Component<WidgetAttrs<TabLayoutAttrs>>
    implements Layout {

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

                if ((this.attrs.ww && this.attrs.ww.active)) {

                    let maybeActive =
                        fromNullable<TabSpec>(
                            this.values.tabs.data[this.attrs.ww.active]);

                    if (maybeActive.isJust())
                        return maybeActive
                            .get()
                            .contentFun(this)(this.view);

                }

                return this.children;

            }

        },

        tabs: {

            current: (this.attrs.ww && this.attrs.ww.active) ?
                this.attrs.ww.active : '',

            data: (this.attrs.ww && this.attrs.ww.tabs) ?
                this.attrs.ww.tabs : {},

            content: (t: TabSpec): Content[] => {

                if (t.tabFun)
                    return t.tabFun(this)(this.view);

                if (t.text)
                    return [textNode(t.text)];

                return [];

            },

            onClick: (e: TabClickedEvent) => {

                if (this.values.tabs.current !== e.name)
                    this.values.tabs.current = e.name;

                let tab = fromNullable<TabSpec>(this.values.tabs.data[e.name]).get();

                this.values.root.content = () =>
                    tab.contentFun(this)(this.view);

                this.view.invalidate();

            }

        }

    }

}
