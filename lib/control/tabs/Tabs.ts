import * as names from '../../common/names';
import * as view from './wml/tabs';
import { concat } from '../../common/util';
import { Component, Attrs, View } from '@quenk/wml';

export interface TabsAttrs extends Attrs {

    ww?: {

        class?: string

    }

}

/**
 * Tabs acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export class Tabs extends Component<TabsAttrs> {

    view: View = new view.Tabs(this);

    values = {

        root: {
          
          class: concat(names.TABS, 'nav nav-tabs', this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
