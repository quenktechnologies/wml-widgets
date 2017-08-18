import { Component, WMLElement, Renderable, Content, Attrs, Macro } from '@quenk/wml-runtime';
import * as Styles from 'wml-widgets-common/Styles';
import { Main } from './wml/drawer-layout';
import { replaceContent } from 'wml-widgets-common/util';

export interface DrawerLayoutAttrs extends Attrs {

    ww?: {

        navigation?: Macro<void>
        content?: Macro<void>

    }

};

/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export class DrawerLayout extends Component<DrawerLayoutAttrs>{

    view = new Main(this);

    _getDrawerDOM(): WMLElement {

        return this.view.findById('drawer');

    }

    _combine(classes: string[]) {

        return classes.join(' ');

    }

    /**
     * drawerVisible queries whether the Drawer is visible or not.
     * @returns {Boolean}
     */
    drawerVisible() {

        return !(<Element>this._getDrawerDOM()).classList.contains(Styles.HIDDEN);

    }

    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer() {

        if (this.drawerVisible())
            (<Element>this._getDrawerDOM()).classList.add(Styles.HIDDEN);

    }

    /**
     * showDrawer shows the drawer
     */
    showDrawer() {

        if (!this.drawerVisible())
            (<Element>this._getDrawerDOM()).classList.remove(Styles.HIDDEN);

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggleDrawer() {

        (<Element>this._getDrawerDOM()).classList.toggle(Styles.HIDDEN);

    }

    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): DrawerLayout {

        replaceContent(r, <Node>this.view.findById('content'));
        return this;

    }

}

export default DrawerLayout
