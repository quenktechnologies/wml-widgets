import * as wml from '@quenk/wml';
import * as views from './wml/tab-view';
import { Maybe } from 'afpl/lib/monad/Maybe';
import { TabClickedEvent } from '../../control/tab-bar';
import {TAB_VIEW, TabViewAttrs, TabSpec, TabSpecMap } from '.';

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
export class TabView extends wml.Component<TabViewAttrs> {

    view: wml.View = new views.Main(this);

    values = {

      root: {

        class: TAB_VIEW

      },

        tab: this.attrs.ww.active || Object.keys(this.attrs.ww.tabs)[0],

        tabs: <TabSpecMap>this.attrs.ww.tabs,

        content: Maybe
            .fromAny(this.attrs.ww.tabs[this.attrs.ww.active])
            .orElse(() => Maybe.fromAny(this.attrs.ww.tabs[Object.keys(this.attrs.ww.tabs)[0]]))
            .map((ts: TabSpec) => ts.view)
            .map((view: wml.View) => view.render())
            .get(),

        onClick: (e: TabClickedEvent) => {

            Maybe
                .fromBoolean(this.values.tab !== e.name)
                .map(() => { this.values.tab = e.name })
                .chain(() =>
                    Maybe
                        .fromAny(this.attrs.ww.tabs[e.name])
                        .map((ts: TabSpec) => { this.values.content = ts.view.render() })
                        .map(() => { this.view.invalidate(); })
                        .orJust(() => { console.error(`TabView: unknown tab '${e.name}'!`); }))

        }

    }

}
