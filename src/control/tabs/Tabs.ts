import * as names from '@package/self/common/names';
import * as view from './wml/tabs';
import { Component, Attrs, View } from '@quenk/wml';

export interface TabsAttrs extends Attrs{}
/**
 * Tabs acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export class Tabs extends Component<TabsAttrs> {

  view : View= new view.Tabs(this);

    values = {

        class: { root: names.TABS }

    }

}
