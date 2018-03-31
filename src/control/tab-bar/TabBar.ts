import * as names from '../../common/names';
import * as view from './wml/tab-bar';
import { concat } from '../../common/util';
import { Component, Attrs, View } from '@quenk/wml';

export interface TabBarAttrs extends Attrs {

    ww?: {

        class?: string

    }

}

/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export class TabBar extends Component<TabBarAttrs> {

    view: View = new view.Main(this);

    values = {

        root: {
          
          class: concat(names.TABS, 'nav nav-tabs', this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
