import {Group, GroupAttrs} from '@package/self/content/Group';
import * as names from '@package/self/common/names';
import {  View } from '@quenk/wml';
import { Main } from './wml/drawer';
import { Aside } from '@package/self/layout/aside/Aside';

export interface DrawerAttrs extends GroupAttrs {

    ww?: {

        /*
         * drawer is a view that will be used to populate the drawer 
         * part of the layout.
         */
        drawer?: View

        /**
         * content can be used instead of speciying children.
         */
        content?: View

    }

};

/**
 * Drawer provides a 2 column application layout with the first typically used as navaigation
 * and the second main application content.
 *
 * ```wml
 *  
 *  <Drawer
 *   wml:id="layout"
 *   content={{this.getContent()}} />
 *
 * ```
 */
export class Drawer extends Group<DrawerAttrs>{

    view: View = new Main(this);

    /**
     * values is a hash of values used in the template.
     */
    values = {

        id: {
            root: 'content',
            drawer: 'drawer'
        },
        class: {
            root: names.DRAWER,
        },
        attrs: {

            DRAWER: 'ww:drawer',
            CONTENT: 'ww:content'

        },
      content: (this.attrs.ww && this.attrs.ww.content) ? this.attrs.ww.content: null

    }

    _getAside<R>(f: (a: Aside) => R): R | null {

        return this.view.findById<Aside>(this.values.id.drawer).cata(() => null, f);

    }

    _combine(classes: string[]) {

        return classes.join(' ');

    }

    /**
     * drawerVisible queries whether the Aside is visible or not.
     */
    drawerVisible(): boolean {

        return this._getAside(a => a.visible());

    }

    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer(): void {

        return this._getAside(a => a.hide());

    }

    /**
     * showDrawer shows the drawer
     */
    showDrawer(): void {

        return this._getAside(a => a.show());

    }

    /**
     * toggle the visibility of the Aside.
     */
    toggleDrawer(): void {

        return this._getAside(a => a.toggle());

    }

}
