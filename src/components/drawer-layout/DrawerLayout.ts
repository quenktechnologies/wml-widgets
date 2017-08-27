import * as common from 'wml-widgets-common';
import { Attrs, Macro } from '@quenk/wml-runtime';
import { Main } from './wml/drawer-layout';
import {Drawer} from '../drawer/Drawer';
 
export interface DrawerLayoutAttrs extends Attrs {

    ww?: {

        drawer?: Macro<void>
        content?: Macro<void>

    }

};

/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export class DrawerLayout extends common.Container<DrawerLayoutAttrs>{

    view = new Main(this);

    _getDrawer(): Drawer {

        return <Drawer>this.view.findById('drawer');

    }

    _combine(classes: string[]) {

        return classes.join(' ');

    }

    /**
     * drawerVisible queries whether the Drawer is visible or not.
     */
    drawerVisible():boolean {

        return this._getDrawer().visible();

    }

    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer() : void {

      return this._getDrawer().hide();

    }

    /**
     * showDrawer shows the drawer
     */
    showDrawer() {

      return this._getDrawer().show();

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggleDrawer() : void{

      return this._getDrawer().toggle();

    }

}
