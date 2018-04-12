import * as views from './wml/tab-layout';
import { Maybe } from 'afpl/lib/monad/Maybe';
import { View, Template, Content, Component } from '@quenk/wml';
import { WidgetAttrs } from '../../';
import { TabClickedEvent } from '../../control/tab-bar';
import { LayoutAttrs, Layout } from '../';

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
     * tabTemplate can be specified to render custom content in the tab.
     */
    tabTemplate?: (t: TabLayout) => Template,

    /**
     * contentTemplate is rendered when the tab is active.
     */
    contentTemplate: (t: TabLayout) => Template

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
    active: string,

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
export class TabLayout
    extends Component<WidgetAttrs<TabLayoutAttrs>>
    implements Layout {

    view: View = new views.Main(this);

    setContent: (c: Content) => TabLayout = (c: Content) => {

        this.values.content = views.content(c);
        this.view.invalidate();
        return this;

    }

    removeContent: () => TabLayout = () => {

        this.values.content = views.empty;
        this.view.invalidate();
        return this;

    }

    values = {

        root: {

            class: TAB_LAYOUT

        },

        tab: this.attrs.ww.active || Object.keys(this.attrs.ww.tabs)[0],

        tabs: <TabSpecMap>this.attrs.ww.tabs,

        content: Maybe
            .fromAny(this.attrs.ww.tabs[this.attrs.ww.active])
            .orElse(() => Maybe.fromAny(this.attrs.ww.tabs[Object.keys(this.attrs.ww.tabs)[0]]))
            .map((ts: TabSpec) => ts.contentTemplate)
            .get(),

        onClick: (e: TabClickedEvent) => {

            Maybe
                .fromBoolean(this.values.tab !== e.name)
                .map(() => { this.values.tab = e.name })
                .chain(() =>
                    Maybe
                        .fromAny(this.attrs.ww.tabs[e.name])
                        .map((ts: TabSpec) => {
                            this.values.content = ts.contentTemplate;
                        })
                        .map(() => { this.view.invalidate(); })
                        .orJust(() => { console.error(`TabLayout: unknown tab '${e.name}'!`); }))

        }

    }

}
